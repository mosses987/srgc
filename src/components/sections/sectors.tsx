import { Check } from "lucide-react";

import commercial from "@/assets/commercial.jpg";
import residential from "@/assets/residential.jpg";
import { SectionHead, delay } from "./shared";

const ITEMS = [
  {
    title: "Commercial",
    img: commercial,
    desc: "Exterior and interior contracting solutions for commercial properties, from façade finishing to interior drywall.",
    points: ["Stucco & EIFS façades", "Exterior siding", "Interior drywall"],
    imgClass: "lg:col-span-8 aspect-[16/10]",
    panel: "lg:col-span-4 lg:col-start-9 bg-navy text-navy-foreground",
    sub: "text-navy-foreground",
    mark: "text-steel",
    head: "text-navy-foreground",
  },
  {
    title: "Residential",
    img: residential,
    desc: "Exterior finishing and interior drywall solutions for residential properties, completed with care for your home.",
    points: ["Stucco & siding exteriors", "EIFS finishing", "Drywall & interior finishing"],
    imgClass: "lg:col-span-5 lg:col-start-8 aspect-[4/5]",
    panel: "lg:col-span-6 lg:col-start-1 lg:row-start-1 bg-secondary text-foreground",
    sub: "text-foreground",
    mark: "text-accent",
    head: "text-navy",
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="py-24 md:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <SectionHead
          eyebrow="Commercial & Residential"
          title="One team for every type of property"
        />
        <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
          {ITEMS.map((it) => (
            <article key={it.title} className="group grid items-stretch gap-0 lg:grid-cols-12">
              <div className={`overflow-hidden rounded-sm bg-navy ${it.imgClass}`}>
                <img
                  src={it.img}
                  alt={`${it.title} property exterior`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  data-reveal="media"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className={`flex flex-col justify-center p-8 md:p-12 ${it.panel}`}>
                <h3 data-reveal="head" className={`text-3xl font-bold md:text-5xl ${it.head}`}>
                  {it.title}
                </h3>
                <p
                  data-reveal="text"
                  style={delay(100)}
                  className={`mt-5 text-lg leading-relaxed ${it.sub}`}
                >
                  {it.desc}
                </p>
                <ul className="mt-7 space-y-3">
                  {it.points.map((p, i) => (
                    <li
                      key={p}
                      data-reveal="side"
                      style={delay(200 + i * 80)}
                      className={`flex items-center gap-3 text-base font-semibold ${it.sub}`}
                    >
                      <Check className={`h-4 w-4 shrink-0 ${it.mark}`} aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
