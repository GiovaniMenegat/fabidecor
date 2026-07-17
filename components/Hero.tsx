import Image from "next/image";
import { SITE } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-16 px-6 py-16 md:flex-row md:justify-between md:px-16 md:py-24">
      <div className="flex w-full max-w-xl flex-col items-start gap-6">
        <span className="rounded-full bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary">
          Auckland Painting &amp; Property Care
        </span>

        <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl">
          Professional House Painter in Auckland — A Fresh Coat, Done Right.
        </h1>

        <svg width="120" height="10" viewBox="0 0 120 10" className="text-accent-purple">
          <path
            d="M2 8c20-6 38-6 58-3 20 3 38-3 58 0"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <p className="max-w-md text-lg leading-relaxed text-text-muted">
          Interior &amp; exterior painting, plus maintenance, house washing, driveway
          cleaning, window cleaning and move-out painting — all from one trusted,
          BCITO-qualified painter.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="flex h-12 items-center justify-center rounded-full bg-secondary px-7 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get a Free Quote
          </a>
          <a
            href="#gallery"
            className="flex h-12 items-center justify-center rounded-full border-[1.5px] border-primary px-7 font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            View Our Work
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
          <span className="text-sm font-medium text-text-muted">
            BCITO Qualified Professional Painter — {SITE.founder}
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-lg items-center justify-center rounded-lg bg-surface p-10 md:aspect-480/520">
        <Image
          src="/images/logo.png"
          alt="FabiDecor — house and paintbrush mark"
          width={490}
          height={336}
          className="h-auto w-full max-w-sm"
          priority
        />
      </div>
    </section>
  );
}
