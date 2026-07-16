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

`lib/site-config.ts` is the single source of truth for the phone number, email, WhatsApp link, Instagram handle, and header nav anchors (`SITE`, `NAV_LINKS`). Components must import from there rather than hardcoding contact details, so updating a phone number or link only requires one edit.

## Component conventions

- One file per landing-page section in `components/` (`Header`, `Hero`, `Services`, `Gallery`, `About`, `Contact`), assembled in `app/page.tsx`. Each section is a `<section id="...">` whose `id` matches its `NAV_LINKS` anchor (`#services`, `#gallery`, `#about`, `#contact`) and has `scroll-mt-20` so the sticky header (`h-20`) doesn't cover it when scrolled to.
- Default to Server Components. Only mark a file `"use client"` when it needs real interactivity — currently `Gallery` (carousel scroll buttons) and `Contact` (controlled form state). Don't add `"use client"` to purely presentational sections.
- This is a single-page site: navigation is anchor scrolling (`<a href="#section">` + `scroll-smooth` on `<html>`), not routing. Don't turn sections into separate routes.

## Content status (things to revisit)

- **Gallery images**: no real project photos yet. `components/Gallery.tsx` renders styled placeholders (icon + caption) mapped 1:1 to a service, so real photos have an obvious slot later. Swap the placeholder `<div>` for real `<Image>` tiles when photos exist — keep the same caption list as a guide.
- **Instagram**: no page exists yet. `SITE.instagramHandle` is a placeholder (`@fabidecor`) and `SITE.instagramHref` is `"#"`. Update both once the real account exists.
- **Contact form**: not wired to a backend. On submit it builds a `mailto:` link (see `buildMailtoHref` in `components/Contact.tsx`) pre-filled with the form values and hands off to the visitor's mail client — a functional stopgap, not the final solution. Replace with a real API route or form service (e.g. Resend, Formspree) and keep the same field set (name, email, phone, message).

## Verifying UI changes

No project run-skill exists yet for this repo. To visually verify: `npm run dev`, wait for `curl -sf http://localhost:3000`, then drive it with Playwright (`chromium-cli` is not available in this environment — `npm install --no-save playwright` in a scratch dir and `npx playwright install chromium` works, but needs its browser binaries downloaded fresh each session since nothing persists them). Screenshot at both a desktop (1440px) and mobile (390px) viewport, and check `console --errors`-equivalent (page/console error listeners) before declaring success.
<!-- END:nextjs-agent-rules -->
