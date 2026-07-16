import {
  Droplets,
  Grid2x2,
  PackageCheck,
  PaintRoller,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  chipClassName: string;
};

// Flagship service (Painting) listed first. Chip colors cycle through the
// brand's rainbow accent tokens — see AGENTS.md "Design System".
const SERVICES: Service[] = [
  {
    title: "Painting",
    description:
      "Interior and exterior painting finished to a professional standard, from a single feature wall to a full home repaint.",
    icon: PaintRoller,
    chipClassName: "bg-accent-red/10 text-primary",
  },
  {
    title: "Maintenance",
    description:
      "General property maintenance and small repairs, so your home stays in great shape between bigger jobs.",
    icon: Wrench,
    chipClassName: "bg-accent-orange/10 text-primary",
  },
  {
    title: "House Washing",
    description:
      "Soft wash exterior cleaning that lifts grime, mould and salt build-up, restoring your home's kerb appeal.",
    icon: Droplets,
    chipClassName: "bg-accent-teal/10 text-primary",
  },
  {
    title: "Driveway Cleaning",
    description:
      "High-pressure driveway and path cleaning that clears years of dirt and moss safely and thoroughly.",
    icon: SprayCan,
    chipClassName: "bg-accent-yellow/10 text-primary",
  },
  {
    title: "Moving Out Painting",
    description:
      "Touch-ups and full repaints for tenants and landlords getting a property ready for inspection or sale.",
    icon: PackageCheck,
    chipClassName: "bg-accent-purple/10 text-primary",
  },
  {
    title: "Windows Cleaning",
    description:
      "Inside-and-out window cleaning that leaves streak-free glass and brighter, better-looking rooms.",
    icon: Grid2x2,
    chipClassName: "bg-accent-green/10 text-primary",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 flex w-full flex-col items-center gap-14 bg-accent-green px-6 py-20 md:px-16 md:py-28"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-sm font-semibold text-white">
          What We Offer
        </span>
        <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Full-service property care, all under one roof
        </h2>
        <p className="text-lg leading-relaxed text-white/85">
          From a fresh coat of paint to a spotless driveway, FabiDecor covers
          everything your property needs — all handled by one qualified, reliable
          painter based right here in Auckland.
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="flex flex-col items-start gap-4 rounded-md bg-white p-8"
          >
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${service.chipClassName}`}
            >
              <service.icon className="h-7 w-7" />
            </span>
            <h3 className="font-heading text-xl font-bold text-text">{service.title}</h3>
            <p className="leading-relaxed text-text-muted">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
