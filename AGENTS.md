<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project Context

FabiDecor is a landing page for an independent professional painter operating in Auckland, New Zealand. The primary trade is painting, with several related property-maintenance services offered alongside it. The site's job is to present these services clearly and make it easy for a homeowner or property manager to get in touch / request a quote.

## Services offered

- **Painting** (general/interior/exterior painting) — the core service
- **Maintenance** — general property maintenance
- **House washing**
- **Driveway cleaning**
- **Moving out / end-of-tenancy painting** — touch-up/repaint work done when tenants move out, to help get bond back
- **Windows cleaning**

When building out sections (hero, services grid, pricing, gallery, contact form, etc.), use this list as the source of truth for what the business offers. Painting should be presented as the flagship/primary service, with the others as complementary offerings.

## Locale & audience

- Target market: Auckland, New Zealand — use NZ English spelling (e.g. "colour", "organise") and NZD currency if prices are shown.
- Audience is primarily residential: homeowners and renters/landlords needing end-of-tenancy painting.

## Stack

Next.js (App Router, see version warning above), React, TypeScript, Tailwind CSS v4, ESLint.

## Design System

Source of truth: a Paper design (`https://app.paper.design/file/01KXMPYMMSAWV8WKQPYAX71108/1-0`), colors sampled from the client's actual logo/business card. All tokens are defined once, in `app/globals.css`, via Tailwind v4's CSS-first `@theme` block — do not add a `tailwind.config.js` for these, and do not hardcode hex values in components; use the utility classes the tokens generate instead.

**Colors** (`--color-*` → `bg-*` / `text-*` / `border-*` utilities):

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#1B3B6F` | Headings, header text, outlined buttons, icon strokes |
| `primary-dark` | `#142C54` | Contact section background |
| `secondary` | `#C0128A` | Primary CTAs, eyebrow pills, links |
| `accent-red/orange/yellow/green/teal/purple` | see `globals.css` | Rainbow accents from the logo brush stroke — used sparingly (icon chips, dividers), and one at a time as a full **section background** (Services = green, About = purple) so each section reads as a distinct color moment. Don't reuse a color another section already owns as its background. Also used as solid (not tinted) icon-chip backgrounds in Contact's info list (email = orange, phone = teal), so the row of four contact icons reads as one rainbow set together with WhatsApp's green and Instagram's brand pink. |
| `instagram` | `#FF0069` | Official Instagram brand color — used only as the background chip behind the `SiInstagram` icon in Contact. Not part of the site palette; don't reuse it elsewhere. Pattern to follow if more brand-logo chips are added: one `--color-<brand>` token per brand, named after the brand, holding its official hex. |
| `bg` | `#FFFFFF` | Default page/section background |
| `surface` | `#F7F8FA` | Alternate light section background, placeholder card fill |
| `text` / `text-muted` | `#1F2430` / `#6B7280` | Body text / secondary text |
| `border` | `#E2E4E9` | Input borders, dividers |

**Type**: `font-heading` = Poppins (weights 600/700/800, set in `app/layout.tsx` via `next/font/google`), `font-body` = Inter (default body font, applied on `<body>`). Headings use `font-heading font-extrabold`; everything else inherits Inter.

**Radius**: `rounded-sm` (8px), `rounded-md` (12px), `rounded-lg` (20px) are redefined via tokens to match the design; `rounded-full` is Tailwind's default and is used for pills/buttons/avatars.

**Icons**: two libraries, split by purpose — import icons directly at each call site in both cases, don't hand-roll SVGs and don't wrap either in a local re-export file.
- [Lucide React](https://lucide.dev/guide/react/getting-started) (`lucide-react`) for generic UI icons (mail, phone, chevrons, service icons, etc). Color via the standard `text-*` className (defaults to `currentColor`); size via `h-* w-*`.
- [Simple Icons](https://simpleicons.org/) via `@icons-pack/react-simple-icons` for real brand/product logos (e.g. `SiWhatsapp`, `SiInstagram`) — use these instead of a generic Lucide stand-in whenever the thing being represented is an actual brand. Same `className`/`text-*` color pattern; leave `color` unset (defaults to `currentColor`) rather than passing `color="default"`, so brand icons still follow the surrounding chip's color instead of forcing each brand's own hex.

**Section background rhythm**: white (Hero) → green (Services) → white (Gallery) → purple (About) → navy `primary-dark` (Contact). If adding a new section, keep alternating rather than repeating a neighbor's background.

**Buttons**: standardize on `h-12` (48px) for form inputs and CTA buttons, `h-11` (44px) for the compact header WhatsApp button and gallery nav arrows — don't introduce other arbitrary heights; pick the closest of these two.

**Tailwind class rule**: prefer canonical scale classes (`h-12`, `w-100`, `aspect-480/520`) over arbitrary-value brackets (`h-[48px]`) whenever the IDE's Tailwind diagnostics offer a canonical equivalent — Tailwind v4's spacing scale (`calc(var(--spacing) * N)`) supports arbitrary integers natively, so this is almost always possible.

**Favicon / app icon**: `app/icon.png` and `app/apple-icon.png` (both 512×512, generated from `public/images/logo.png` — the icon centered on a square canvas, transparent background for `icon.png`, opaque white for `apple-icon.png` since iOS masks transparent touch icons oddly). This is Next.js's file-convention icon system (auto-detected, no manual `<link>` or metadata needed) — don't add a `favicon.ico`; regenerate both PNGs from the source logo instead if the brand mark changes.

## Site config

`lib/site-config.ts` is the single source of truth for the phone number, email, WhatsApp link, Instagram handle, header nav anchors (`SITE`, `NAV_LINKS`), and the production `SITE_URL` used throughout SEO metadata. Components must import from there rather than hardcoding contact details, so updating a phone number or link only requires one edit.

## SEO

SEO work was driven by a client-provided checklist (2026-07-18) covering meta tags, content structure, structured data, images, and mobile. Status and conventions below; treat this as the source of truth for what's done vs. deliberately deferred.

- **Site URL**: no domain is registered yet (confirmed with the client). `SITE_URL` in `lib/site-config.ts` falls back to `"https://fabidecor.co.nz"` and can be overridden via `NEXT_PUBLIC_SITE_URL` in `.env.local` with zero code changes. It's read with `||`, not `??` — an unset env var is `""` in `.env.local`, not `undefined`, so `??` would silently pass through the empty string and crash `new URL()` in `metadataBase`. Every SEO surface (canonical, sitemap, robots, OG, JSON-LD) reads this one constant — **update `SITE_URL` (or set the env var) the moment a real domain exists**, nothing else needs to change.
- **Metadata** (`app/layout.tsx`): title follows the "Service + Location" pattern (`Residential & Commercial Painter in Auckland | FabiDecor`, 56 chars); description is 150–160 chars with a CTA (currently 154). Both are defined once as `TITLE`/`DESCRIPTION` consts and reused across `metadata.title`, `openGraph`, and `twitter` so they can't drift out of sync. `alternates.canonical: "/"` + `metadataBase` produces the canonical tag. `robots` explicitly sets `index: true, follow: true`.
- **OG/Twitter share image**: `app/opengraph-image.png` + `app/twitter-image.png` (1200×630, same image, generated from the brand logo + navy gradient — regenerate by re-running the same composition if the logo changes) plus matching `.alt.txt` files. These use Next.js's **file-based** metadata convention (same pattern as `app/icon.png`) — Next.js auto-generates the `og:image`/`twitter:image` tags from them. Don't also set `openGraph.images` / `twitter.images` in `metadata` — that would conflict with the file convention.
- **robots.txt / sitemap.xml**: `app/robots.ts` and `app/sitemap.ts` (Next.js file conventions, not static files). Sitemap has a single entry (`SITE_URL`) since this is a one-page site — see "Component conventions" below on why it isn't split into routes. If it ever becomes multi-page, add one sitemap entry per real route; don't add entries for in-page anchors (`#services` etc.), they aren't separate crawlable resources.
- **JSON-LD** (`components/StructuredData.tsx`, rendered in `app/layout.tsx`): `HomeAndConstructionBusiness` type (more specific than generic `LocalBusiness`, better fit for a painter) with `name`, `description`, `url`, `telephone`, `email`, `image`/`logo`, `address` (locality/region/country only — see below), `areaServed`, `founder`. **Deliberately omitted**: `priceRange`, `openingHours`, and `sameAs` (Instagram) — these would have to be invented (no real business hours, pricing tier, or live Instagram URL exist yet), and fabricated business facts in structured data is worse than omitting the optional field. Add them once the client provides real values; don't guess plausible-sounding ones.
- **No street address**: FabiDecor is a mobile, service-area trade business with no public storefront, so `SITE.addressLocality/addressRegion/addressCountry` covers Auckland/NZ only, no street address — this is normal for this business type and matches how Google Business Profiles handle service-area businesses.
- **H1 keyword**: `Hero.tsx`'s `<h1>` was rewritten from the original tagline-only version to lead with the primary keyword phrase ("Professional House Painter in Auckland") while keeping the brand tagline ("A Fresh Coat, Done Right") attached, rather than adding a second, separate keyword-bearing element — there must be exactly one `<h1>` per page.
- **Mobile Call Now bar** (`components/MobileCallBar.tsx`): fixed bottom bar, `md:hidden`, with Call + WhatsApp buttons — most local-service search traffic is mobile and a persistent tap-to-call is a standard conversion lever for trades sites. Rendered in `app/layout.tsx`, paired with `pb-16 md:pb-0` on `<body>` so it never overlaps the footer. Uses `pb-[env(safe-area-inset-bottom)]` (a legitimate arbitrary-value exception to the "prefer canonical Tailwind classes" rule — there's no static-px equivalent for a safe-area inset) so it clears the home indicator on notched phones.
- **Image formats**: `next.config.ts` sets `images.formats: ["image/avif", "image/webp"]`. WebP was already `next/image`'s default; AVIF is the opt-in addition for extra compression on supporting browsers. Lazy-loading and responsive srcsets are `next/image` defaults and need no extra config — only above-the-fold images (`Header` logo, `Hero` logo) get `priority`; don't add `priority` to anything below the fold.
- **Split into per-service pages?** The checklist raised evaluating this for more search surface area. Not done — it's a much bigger scope change (routing, per-service content and metadata, more sitemap entries) than the rest of this list and deserves its own scoping conversation rather than a silent unilateral call.

### Manual follow-ups (need the live site or client input — can't be done from code)

- Submit `sitemap.xml` in Google Search Console once deployed.
- Validate JSON-LD in the [Rich Results Test](https://search.google.com/test/rich-results) once there's a live URL.
- Run PageSpeed Insights / check Core Web Vitals (LCP, CLS, INP) against the live URL — Lighthouse against `localhost` is a reasonable local proxy but not a substitute.
- Test on a real phone, not just DevTools/Playwright emulation, once deployed.
- Confirm the real domain, then update `SITE_URL`.
- If/when available: real business hours, price range, and a live Instagram URL — add to `StructuredData.tsx` (`openingHours`, `priceRange`, `sameAs`) and `SITE.instagramHref`.

## Component conventions

- One file per landing-page section in `components/` (`Header`, `Hero`, `Services`, `Gallery`, `About`, `Contact`, `Footer`), assembled in `app/page.tsx`; `StructuredData` and `MobileCallBar` are cross-cutting and live in `app/layout.tsx` instead. Each section is a `<section id="...">` whose `id` matches its `NAV_LINKS` anchor (`#services`, `#gallery`, `#about`, `#contact`) and has `scroll-mt-20` so the sticky header (`h-20`) doesn't cover it when scrolled to.
- Default to Server Components. Only mark a file `"use client"` when it needs real interactivity — currently `Header` (mobile menu open/close state), `Gallery` (carousel scroll buttons), and `Contact` (controlled form state). Don't add `"use client"` to purely presentational sections.
- **Mobile nav**: `Header` renders the full anchor nav + phone number only at `md:` and up. Below that it shows a hamburger (Lucide `Menu`/`X`) that toggles a dropdown panel with the same `NAV_LINKS` plus the phone number; each link closes the menu on click (`onClick={() => setMenuOpen(false)}`). The WhatsApp button stays visible at every width — icon-only below `sm:`, icon+label from `sm:` up — since it's the primary mobile CTA and shouldn't be hidden behind the hamburger. If more header actions are added, follow the same pattern rather than cramming them into the always-visible bar.
- **Gallery card sizing**: card dimensions are responsive (`w-72 h-54` below `sm:`, `w-100 h-75` at `sm:` and up) so the first card fully fits within a phone viewport with a deliberate peek of the next one, rather than using the desktop's fixed 400px card width everywhere. `scrollByCard` in `Gallery.tsx` reads `offsetWidth` off the actual DOM node, so it doesn't need updating when these breakpoints change.
- This is a single-page site: navigation is anchor scrolling (`<a href="#section">` + `scroll-smooth` on `<html>`), not routing. Don't turn sections into separate routes.

## Content status (things to revisit)

- **Gallery images**: no real project photos yet. `components/Gallery.tsx` renders styled placeholders (icon + caption) mapped 1:1 to a service, so real photos have an obvious slot later. Swap the placeholder `<div>` for real `<Image>` tiles when photos exist — keep the same caption list as a guide.
- **Instagram**: no page exists yet. `SITE.instagramHandle` is a placeholder (`@fabidecor`) and `SITE.instagramHref` is `"#"`. Update both once the real account exists.
- **Contact form**: wired to [Web3Forms](https://web3forms.com) — submitted directly from the client in `components/Contact.tsx` (no backend/API route; there was one backed by Resend earlier, removed because it was more setup than this site needs). `handleSubmit` builds a `FormData` (not JSON — see below) with `access_key`, `subject`, `from_name`, and the four form fields, POSTs it to `https://api.web3forms.com/submit`, and renders a submitting/success/error state (see `Status` type in that file). Web3Forms emails land at `SITE.email` (`fabiladeia@hotmail.com`) since that's the address tied to the access key at signup.
  - **Setup required**: get a free access key at https://web3forms.com (just an email, no account) and put it in `.env.local` (placeholder file already exists, gitignored like all `.env*`) as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. It's `NEXT_PUBLIC_` deliberately — the key is meant to be public/client-exposed (Web3Forms rate-limits and domain-scopes it on their end, it's not a secret). Without it set, the form shows "Email sending isn't configured yet" rather than attempting the request.
  - **Must use `FormData`, not a JSON body**: a raw `JSON.stringify` body with `Content-Type: application/json` triggers a CORS preflight that Web3Forms doesn't reliably answer, so the request gets blocked client-side before ever reaching them. `FormData` is a CORS "simple request" (no preflight) and is what actually works — don't change this back to JSON.
  - **Network/CORS failures get rewritten**: a blocked/failed `fetch()` throws a raw `"Failed to fetch"` TypeError, which isn't something a visitor can act on — `handleSubmit` catches that specifically and replaces it with "Couldn't reach the server. Please try WhatsApp or phone instead." Keep that rewrite if touching this code; don't let the raw browser error reach the UI.

## Verifying UI changes

No project run-skill exists yet for this repo. To visually verify: `npm run dev`, wait for `curl -sf http://localhost:3000`, then drive it with Playwright (`chromium-cli` is not available in this environment — `npm install --no-save playwright` in a scratch dir and `npx playwright install chromium` works, but needs its browser binaries downloaded fresh each session since nothing persists them). Screenshot at both a desktop (1440px) and mobile (390px) viewport, and check `console --errors`-equivalent (page/console error listeners) before declaring success.
<!-- END:nextjs-agent-rules -->
