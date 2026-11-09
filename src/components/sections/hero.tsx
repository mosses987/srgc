import hero from "@/assets/hero.jpg";
import { CTA } from "./shared";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy pt-20"
    >
      <img
        src={hero}
        alt="Modern commercial building exterior at dusk"
        className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
        fetchPriority="high"
      />
      <div className="absolute inset-0" style={{ background: "var(--scrim)" }} />
      <div className="relative mx-auto w-full max-w-[90rem] px-5 pb-28 md:px-8 md:pb-24">
        <p className="eyebrow animate-rise text-steel">Ontario, Canada</p>
        <h1
          className="animate-rise mt-5 text-[clamp(1.5rem,7.1vw,6.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy-foreground"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block whitespace-nowrap">Building Better.</span>
          <span className="block whitespace-nowrap">Delivering Excellence.</span>
        </h1>
        <p
          className="animate-rise mt-7 max-w-[40ch] text-lg text-navy-foreground md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Commercial and Residential Contracting Solutions Across Ontario.
        </p>
        <div
          className="animate-rise mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6"
          style={{ animationDelay: "0.45s" }}
        >
          <CTA href="#contact" variant="light">
            Request a Quote
          </CTA>
          <CTA href="#services" variant="ghost">
            Explore Our Services
          </CTA>
        </div>
      </div>
    </section>
  );
}
