/**
 * Single source of truth for contact details and nav anchors.
 * Update phone/email/social links here — every component reads from
 * this file rather than hardcoding them. See AGENTS.md "Site config".
 */

// No domain registered yet (confirmed with the client 2026-07-18) — every
// SEO surface (canonical, sitemap, robots, OG, JSON-LD) reads this one
// constant, so swapping in the real domain later is a one-line change.
// Override via NEXT_PUBLIC_SITE_URL without touching code once one exists.
// No trailing slash.
// Logical OR (not ??) deliberately — an unset env var lands here as "" in
// .env.local, and "" must fall through to the placeholder too, not just
// null/undefined.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fabidecor.co.nz").replace(/\/$/, "");

export const SITE = {
  name: "FabiDecor",
  founder: "Fabiano Ladeia",
  phoneDisplay: "027 626 8314",
  phoneHref: "tel:+64276268314",
  email: "fabiladeia@hotmail.com",
  emailHref: "mailto:fabiladeia@hotmail.com",
  // wa.me expects the number in international format with no leading 0.
  whatsappHref: "https://wa.me/64276268314",
  // No Instagram page yet — placeholder handle, update once it exists.
  instagramHandle: "@fabidecor",
  instagramHref: "#",
  // Mobile, service-area trade business — no public storefront address,
  // so structured data uses locality/region only (see AGENTS.md "SEO").
  addressLocality: "Auckland",
  addressRegion: "Auckland",
  addressCountry: "NZ",
  areaServed: "Auckland, New Zealand",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
