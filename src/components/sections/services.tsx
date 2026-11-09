import { ArrowRight } from "lucide-react";

import stucco from "@/assets/stucco.jpg";
import eifs from "@/assets/eifs.jpg";
import siding from "@/assets/siding.jpg";
import drywall from "@/assets/drywall.jpg";
import { SectionHead, delay } from "./shared";
import { EifsCutaway } from "./eifs-cutaway";

export const SERVICES = [
  {
    title: "Stucco",
    img: stucco,
    desc: "Professional stucco exterior finishing solutions with clean lines and durable, even textures.",
  },
  {
    title: "EIFS",
    img: eifs,
    desc: "Exterior insulation and finish systems that combine performance with a refined façade.",
  },
  {
    title: "Siding",
    img: siding,
    desc: "Exterior siding installation and finishing, carefully detailed from corner to trim.",
  },
  {
    title: "Drywall",
    img: drywall,
    desc: "Drywall installation and interior finishing, ready for paint and built to last.",
  },
];

/** Each row takes a different image shape and side so the list never reads as a card grid. */
const ROW_LAYOUT = [
  { img: "lg:col-span-7 aspect-[16/10]", text: "lg:col-span-4 lg:col-start-9" },
  {
    img: "lg:col-span-5 lg:col-start-8 aspect-[4/5]",
    text: "lg:col-span-5 lg:col-start-1 lg:row-start-1",
  },
  { img: "lg:col-span-6 aspect-[3/2]", text: "lg:col-span-4 lg:col-start-8" },
  {
    img: "lg:col-span-4 lg:col-start-9 aspect-square",
    text: "lg:col-span-5 lg:col-start-2 lg:row-start-1",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-secondary pt-24 md:pt-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <SectionHead eyebrow="Our Services" title="Specialized finishing, inside and out" />
        <div className="mt-20 space-y-24 pb-28 md:mt-28 md:space-y-36 md:pb-44">
          {SERVICES.map((s, i) => {
            const l = ROW_LAYOUT[i]!;
            return (
              <article key={s.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <div className={`group overflow-hidden rounded-sm bg-navy ${l.img}`}>
                  <img
                    src={s.img}
                    alt={`${s.title} work`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    data-reveal="media"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
                <div className={l.text}>
                  <span
                    data-reveal="text"
                    className="font-display text-5xl font-extrabold text-primary"
                  >
                    0{i + 1}
                  </span>
                  <h3
                    data-reveal="head"
                    style={delay(80)}
                    className="mt-3 text-3xl font-bold text-navy md:text-5xl"
                  >
                    {s.title}
                  </h3>
                  <p
                    data-reveal="text"
                    style={delay(180)}
                    className="mt-5 max-w-[42ch] text-lg leading-relaxed text-foreground"
                  >
                    {s.desc}
                  </p>
                  <a
                    data-reveal="item"
                    style={delay(280)}
                    href="#contact"
                    className="group/l mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary underline decoration-accent decoration-2 underline-offset-8 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    Get a quote{" "}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover/l:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <EifsCutaway />
    </section>
  );
}
