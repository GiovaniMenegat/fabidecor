/**
 * Single source of truth for contact details and nav anchors.
 * Update phone/email/social links here — every component reads from
 * this file rather than hardcoding them. See AGENTS.md "Site config".
 */
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
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
