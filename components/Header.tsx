import Image from "next/image";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { NAV_LINKS, SITE } from "@/lib/site-config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-border bg-bg px-6 md:px-16">
      <a href="#" className="flex shrink-0 items-center gap-2.5">
        <Image
          src="/images/logo.png"
          alt="FabiDecor logo"
          width={98}
          height={67}
          className="h-8 w-auto"
          priority
        />
        <span className="font-heading text-xl font-extrabold tracking-tight">
          <span className="text-primary">FABI</span>
          <span className="text-secondary">DECOR</span>
        </span>
      </a>

      <nav className="hidden items-center gap-9 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-medium text-text transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 md:gap-6">
        <a
          href={SITE.phoneHref}
          className="hidden font-semibold text-primary sm:inline"
        >
          {SITE.phoneDisplay}
        </a>
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent-green px-5 font-semibold text-white transition-opacity hover:opacity-90"
        >
          <SiWhatsapp className="h-4.25 w-4.25" />
          WhatsApp Us
        </a>
      </div>
    </header>
  );
}
