import { SectionHead, delay } from "./shared";

const VALUES = [
  ["Workmanship", "Skilled, methodical execution on every surface."],
  ["Detail", "Clean edges, true lines and a consistent finish."],
  ["Reliability", "Clear schedules and responsive communication."],
  ["Quality", "Materials and methods chosen to perform."],
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <SectionHead
          className="lg:col-span-5"
          eyebrow="About SRGC"
          title="Your Partner in Quality Construction"
        >
          SRGC Developments Ltd is a contractor providing commercial and residential contracting
          services across Ontario. We specialize in exterior finishing and interior drywall,
          delivered with careful workmanship, attention to detail and dependable communication from
          first conversation to final walkthrough.
        </SectionHead>
        <ul className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          {VALUES.map(([t, d], i) => (
            <li
              key={t}
              data-reveal="item"
              style={delay(i * 90)}
              className={`grid gap-2 px-6 py-7 transition-colors duration-300 hover:bg-steel/25 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-baseline sm:gap-8 md:px-8 md:py-9 ${i % 2 === 0 ? "bg-secondary" : "bg-background"}`}
            >
              <h3 className="text-2xl font-bold text-navy">{t}</h3>
              <p className="text-lg leading-relaxed text-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
