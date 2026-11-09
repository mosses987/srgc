import { ArrowRight } from "lucide-react";

import { SectionHead } from "./shared";

/**
 * PLACEHOLDER CASES. Nothing here is a real SRGC project.
 * To publish a real project: set `photo` (import the image), and replace
 * title, trade, sector, place and year. A card with no `photo` renders the
 * clearly marked "Photo to come" frame, so stock images are never shown as work.
 */
type Case = {
  title: string;
  trade: string;
  sector: "Commercial" | "Residential";
  place: string;
  year: string;
  photo?: string;
  alt?: string;
};

const CASES: Case[] = [
  {
    title: "Project title",
    trade: "Stucco and EIFS",
    sector: "Commercial",
    place: "Ontario",
    year: "Year",
  },
  {
    title: "Project title",
    trade: "Siding",
    sector: "Residential",
    place: "Ontario",
    year: "Year",
  },
  {
    title: "Project title",
    trade: "Stucco",
    sector: "Residential",
    place: "Ontario",
    year: "Year",
  },
  {
    title: "Project title",
    trade: "Drywall",
    sector: "Commercial",
    place: "Ontario",
    year: "Year",
  },
];

export function Projects() {
  return (
    <section id="projects" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <SectionHead reveal={false} eyebrow="Project Showcase" title="The kind of work we deliver">
          Completed project case studies are being added. The frames below show how each one will
          appear, and are placeholders.
        </SectionHead>
      </div>
      <div className="mx-auto mt-16 max-w-[90rem] px-5 md:mt-24 md:px-8">
        <ul
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Project case studies, scroll sideways"
          tabIndex={0}
        >
          {CASES.map((c, i) => (
            <li key={i} className="w-[78%] shrink-0 snap-start sm:w-[56%] lg:w-[44%]">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-navy sm:aspect-[3/2]">
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt={c.alt ?? c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-start justify-between bg-[oklch(0.26_0.06_258)] p-6 md:p-8">
                    <span className="rounded-sm bg-steel px-3 py-1.5 text-sm font-bold text-navy">
                      Placeholder
                    </span>
                    <div>
                      <p className="font-display text-3xl font-extrabold text-navy-foreground md:text-5xl">
                        Photo to come
                      </p>
                      <p className="mt-2 text-base text-navy-foreground">
                        {c.sector} · {c.trade}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 text-base">
                <p className="font-bold text-navy">{c.title}</p>
                <p className="text-foreground">{c.trade}</p>
                <p className="text-foreground">
                  {c.sector}, {c.place}
                </p>
                <p className="text-foreground">{c.year}</p>
              </div>
              <a
                href="#contact"
                className="group/l mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline decoration-accent decoration-2 underline-offset-8 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Start a similar project{" "}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover/l:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
