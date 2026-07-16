"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

// No real project photos yet — each placeholder is mapped to a service so
// real photos have an obvious home later. See AGENTS.md "Content status".
const GALLERY_ITEMS = [
  "Interior Painting",
  "Exterior Painting",
  "House Washing",
  "Driveway Cleaning",
  "Move-Out Painting",
];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const distance = (card?.offsetWidth ?? 400) + 24; // card width + gap
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 flex w-full flex-col items-center gap-10 bg-bg px-6 py-20 md:px-16 md:py-28"
    >
      <div className="flex w-full max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-xl flex-col items-start gap-4">
          <span className="rounded-full bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary">
            Our Work
          </span>
          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-4xl">
            See the difference for yourself
          </h2>
          <p className="text-lg leading-relaxed text-text-muted">
            A look at recent painting and property care jobs around Auckland.
            Photos coming soon.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-surface"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex w-full max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none"
      >
        {GALLERY_ITEMS.map((caption) => (
          <div
            key={caption}
            className="flex h-75 w-100 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-md bg-surface"
          >
            <ImageIcon className="h-12 w-12 text-text-muted" />
            <span className="font-medium text-text-muted">{caption}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {GALLERY_ITEMS.map((caption, index) => (
          <span
            key={caption}
            className={
              index === 0
                ? "h-2 w-6 rounded-full bg-secondary"
                : "h-2 w-2 rounded-full bg-border"
            }
          />
        ))}
      </div>
    </section>
  );
}
