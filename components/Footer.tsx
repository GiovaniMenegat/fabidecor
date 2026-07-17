import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site-config";

/**
 * Real-text NAP (name, area served, phone) for SEO — not an image, and not
 * folded into Contact's design-heavy card. See AGENTS.md "SEO".
 */
export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-8 border-t border-white/10 bg-primary-dark px-6 py-12 md:px-16">
      <div className="flex w-full max-w-6xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="FabiDecor logo"
              width={98}
              height={67}
              className="h-7 w-auto"
            />
            <span className="font-heading text-lg font-extrabold tracking-tight text-white">
              FabiDecor
            </span>
          </div>
          <p className="text-center text-sm text-white/70 sm:text-left">
            Residential &amp; commercial painting and property care, serving{" "}
            {SITE.areaServed}.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1.5 text-sm sm:items-end">
          <a href={SITE.phoneHref} className="font-medium text-white/80 transition-colors hover:text-white">
            {SITE.phoneDisplay}
          </a>
          <a href={SITE.emailHref} className="font-medium text-white/80 transition-colors hover:text-white">
            {SITE.email}
          </a>
        </div>
      </div>

      <p className="text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
