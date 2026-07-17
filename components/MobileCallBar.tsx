import { Phone } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SITE } from "@/lib/site-config";

/**
 * Fixed bottom action bar, mobile only — most local-service search traffic
 * is mobile, and a persistent "Call Now" is a common conversion lever for
 * trades sites. See AGENTS.md "SEO". Pairs with `pb-16 md:pb-0` on <body>
 * in layout.tsx so this never overlaps the footer.
 */
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={SITE.phoneHref}
        className="flex h-16 flex-1 items-center justify-center gap-2 border-r border-border font-semibold text-primary"
      >
        <Phone className="h-4.5 w-4.5" />
        Call Now
      </a>
      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 flex-1 items-center justify-center gap-2 bg-accent-green font-semibold text-white"
      >
        <SiWhatsapp className="h-4.25 w-4.25" />
        WhatsApp
      </a>
    </div>
  );
}
