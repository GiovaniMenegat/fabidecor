import { SITE, SITE_URL } from "@/lib/site-config";

/**
 * JSON-LD for Google (and AI) to understand this as a local trades
 * business. See AGENTS.md "SEO" for which fields are deliberately omitted
 * and why (openingHours, priceRange, sameAs — don't fabricate these).
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description:
      "Residential and commercial painting, maintenance, and property care serving Auckland, New Zealand.",
    url: SITE_URL,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    image: `${SITE_URL}/images/logo.png`,
    logo: `${SITE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    areaServed: {
      "@type": "City",
      name: SITE.areaServed,
    },
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
