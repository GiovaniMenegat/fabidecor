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
<!-- END:nextjs-agent-rules -->
