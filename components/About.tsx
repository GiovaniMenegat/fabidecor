import { SITE } from "@/lib/site-config";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 flex w-full flex-col items-center gap-7 bg-accent-purple px-6 py-24 md:py-28"
    >
      <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-sm font-semibold text-white">
        Our Story
      </span>

      <h2 className="max-w-2xl text-center font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        Proudly painting Auckland homes since 2021
      </h2>

      <svg width="120" height="10" viewBox="0 0 120 10" className="text-accent-orange">
        <path
          d="M2 8c20-6 38-6 58-3 20 3 38-3 58 0"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <p className="max-w-2xl text-center text-xl leading-relaxed text-white">
        FabiDecor was founded in 2021 right here in Auckland by {SITE.founder}, a
        BCITO-qualified painter with a simple goal: give homeowners honest,
        high-quality work without the hassle. What started with one man and a
        paintbrush has grown into a trusted local name for painting and property
        care — still built on the same care and attention to detail we started
        with.
      </p>

      <span className="font-semibold text-white/78">— {SITE.founder}, Founder</span>
    </section>
  );
}
