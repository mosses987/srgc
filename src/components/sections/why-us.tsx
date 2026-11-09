const REASONS = [
  ["Commercial and residential contracting", "Contracting services for both property types."],
  ["Multiple specialized services", "Stucco, EIFS, siding and drywall under one contractor."],
  ["Quality-focused workmanship", "Every finish is held to a careful, consistent standard."],
  ["Serving clients across Ontario", "Reliable service for projects throughout the province."],
];

export function WhyUs() {
  return (
    <section className="bg-navy py-24 text-navy-foreground md:py-32" aria-labelledby="why-title">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="max-w-none">
          <p className="eyebrow text-steel">Why Choose SRGC</p>
          <h2
            id="why-title"
            className="mt-4 text-[1.65rem] font-bold leading-[1.08] sm:text-3xl md:text-5xl"
          >
            Built on care, precision and follow-through.
          </h2>
        </div>
        <ol className="mt-16 md:mt-24">
          {REASONS.map(([t, d], i) => (
            <li
              key={t}
              className={`group grid items-baseline gap-3 px-0 py-8 transition-colors duration-300 hover:bg-primary md:grid-cols-12 md:gap-10 md:px-6 md:py-10 ${i % 2 === 0 ? "bg-navy" : "bg-[oklch(0.24_0.06_260)]"}`}
            >
              <span
                className="font-display text-5xl font-extrabold text-steel md:col-span-2"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3 className="text-2xl font-bold md:col-span-5">{t}</h3>
              <p className="text-lg leading-relaxed text-navy-foreground md:col-span-5">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
