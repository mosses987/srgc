import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { Menu, X, Phone, Mail, MapPin, User, ArrowRight, Check } from "lucide-react";

import logo from "@/assets/srgc-logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import stucco from "@/assets/stucco.jpg";
import eifs from "@/assets/eifs.jpg";
import siding from "@/assets/siding.jpg";
import drywall from "@/assets/drywall.jpg";
import commercial from "@/assets/commercial.jpg";
import residential from "@/assets/residential.jpg";

const TITLE = "SRGC Developments Ltd | Commercial & Residential Contractor in Ontario";
const DESC =
  "SRGC Developments Ltd provides stucco, EIFS, siding and drywall contracting for commercial and residential properties across Ontario. Request a quote today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const PHONE_DISPLAY = "647-721-4804";
const PHONE_HREF = "tel:+16477214804";
const EMAIL = "info@srgcdevelopments.ca";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#sectors", label: "Sectors" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  { title: "Stucco", img: stucco, desc: "Professional stucco exterior finishing solutions with clean lines and durable, even textures." },
  { title: "EIFS", img: eifs, desc: "Exterior insulation and finish systems that combine performance with a refined façade." },
  { title: "Siding", img: siding, desc: "Exterior siding installation and finishing, carefully detailed from corner to trim." },
  { title: "Drywall", img: drywall, desc: "Drywall installation and interior finishing, ready for paint and built to last." },
];

// Placeholder imagery — replace `src` and `label` with real SRGC project photos.
const GALLERY = [
  { src: hero, label: "Commercial building", span: "md:col-span-2 md:row-span-2" },
  { src: residential, label: "Residential exterior", span: "" },
  { src: stucco, label: "Stucco finish", span: "" },
  { src: siding, label: "Siding", span: "" },
  { src: drywall, label: "Drywall", span: "" },
  { src: commercial, label: "Commercial exterior", span: "md:col-span-2" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Sectors />
        <WhyUs />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return <img src={logo.url} alt="SRGC Developments Ltd" className={className} width={642} height={692} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-card/95 backdrop-blur transition-shadow ${scrolled ? "shadow-elegant" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex h-full items-center" aria-label="SRGC Developments Ltd — home">
          <Logo className="h-16 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary">
              {n.label}
            </a>
          ))}
          <CTA href="#contact">Request a Quote</CTA>
        </nav>
        <button
          className="grid h-11 w-11 place-items-center rounded-sm border lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-card px-5 pb-6 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b py-4 font-semibold">
              {n.label}
            </a>
          ))}
          <div className="mt-5" onClick={() => setOpen(false)}>
            <CTA href="#contact" className="w-full">Request a Quote</CTA>
          </div>
        </nav>
      )}
    </header>
  );
}

function CTA({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-navy hover:-translate-y-0.5 shadow-elegant"
      : "border border-navy-foreground/40 text-navy-foreground hover:bg-navy-foreground hover:text-navy";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SectionHead({ eyebrow, title, children, center }: { eyebrow: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-navy md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy pt-20">
      <img src={hero} alt="Modern commercial building exterior at dusk" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover" width={1920} height={1088} fetchPriority="high" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <p className="eyebrow animate-rise text-steel">Ontario, Canada</p>
        <h1 className="animate-rise mt-5 max-w-4xl text-5xl font-extrabold leading-[1.02] text-navy-foreground md:text-7xl lg:text-8xl" style={{ animationDelay: "0.15s" }}>
          Building Better.
          <br />
          Delivering Excellence.
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg text-navy-foreground/85 md:text-xl" style={{ animationDelay: "0.3s" }}>
          Commercial and Residential Contracting Solutions Across Ontario.
        </p>
        <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.45s" }}>
          <CTA href="#contact">Request a Quote</CTA>
          <CTA href="#services" variant="ghost">Explore Our Services</CTA>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <SectionHead eyebrow="About SRGC" title="Your Partner in Quality Construction">
          SRGC Developments Ltd is a contractor providing commercial and residential contracting services across Ontario.
          We specialize in exterior finishing and interior drywall — delivered with careful workmanship, attention to detail
          and dependable communication from first conversation to final walkthrough.
        </SectionHead>
        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-sm border bg-border">
          {[
            ["Workmanship", "Skilled, methodical execution on every surface."],
            ["Detail", "Clean edges, true lines and a consistent finish."],
            ["Reliability", "Clear schedules and responsive communication."],
            ["Quality", "Materials and methods chosen to perform."],
          ].map(([t, d]) => (
            <div key={t} className="bg-card p-7 md:p-9">
              <div className="h-0.5 w-8 bg-accent" />
              <h3 className="mt-5 text-lg font-bold text-navy">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Our Services" title="Specialized finishing, inside and out" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="reveal group relative aspect-[3/4] overflow-hidden rounded-sm bg-navy" style={{ transitionDelay: `${i * 90}ms` }}>
              <img src={s.img} alt={`${s.title} work`} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="text-xs font-bold text-steel">0{i + 1}</span>
                <h3 className="mt-2 text-2xl font-bold text-navy-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-foreground/80">{s.desc}</p>
                <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground">
                  Get a quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  const items = [
    { title: "Commercial", img: commercial, desc: "Exterior and interior contracting solutions for commercial properties — from façade finishing to interior drywall.", points: ["Stucco & EIFS façades", "Exterior siding", "Interior drywall"] },
    { title: "Residential", img: residential, desc: "Exterior finishing and interior drywall solutions for residential properties, completed with care for your home.", points: ["Stucco & siding exteriors", "EIFS finishing", "Drywall & interior finishing"] },
  ];
  return (
    <section id="sectors" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Commercial & Residential" title="One team for every type of property" />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {items.map((it) => (
            <article key={it.title} className="reveal group overflow-hidden rounded-sm border bg-card transition-shadow hover:shadow-elegant">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={it.img} alt={`${it.title} property exterior`} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-3xl font-bold text-navy">{it.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{it.desc}</p>
                <ul className="mt-6 space-y-3">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-accent" /> {p}
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

function WhyUs() {
  const reasons = [
    ["Commercial and residential contracting", "Contracting services for both property types."],
    ["Multiple specialized services", "Stucco, EIFS, siding and drywall under one contractor."],
    ["Quality-focused workmanship", "Every finish is held to a careful, consistent standard."],
    ["Serving clients across Ontario", "Reliable service for projects throughout the province."],
  ];
  return (
    <section className="bg-navy py-24 text-navy-foreground md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal">
          <p className="eyebrow text-steel">Why Choose SRGC</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Built on care, precision and follow-through.</h2>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-sm bg-navy-foreground/10 sm:grid-cols-2">
          {reasons.map(([t, d], i) => (
            <li key={t} className="reveal bg-navy p-8 transition-colors hover:bg-primary">
              <span className="font-display text-4xl font-extrabold text-steel/60">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Project Showcase" title="The kind of work we deliver">
          A look at the commercial, residential, stucco, siding and drywall finishes we specialize in.
        </SectionHead>
        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:grid-cols-4">
          {GALLERY.map((g) => (
            <figure key={g.label} className={`reveal group relative overflow-hidden rounded-sm bg-muted ${g.span}`}>
              <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-0 left-0 bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Images shown are representative of our services.</p>
      </div>
    </section>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+()\-.\s]*$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(1, "Please add a short message").max(1500),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = r.data;
    const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\nService: ${v.service}\n\n${v.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request — ${v.service}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-ring/30";

  return (
    <section id="contact" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Contact" title="Let's Build Something Together.">
            Tell us about your project and we'll get back to you to discuss scope and next steps.
          </SectionHead>
          <ul className="reveal mt-10 space-y-5">
            <ContactRow icon={<User />} label="Contact">Berat Sorguc · SRGC Developments Ltd</ContactRow>
            <ContactRow icon={<Phone />} label="Phone"><a href={PHONE_HREF} className="hover:text-primary">{PHONE_DISPLAY}</a></ContactRow>
            <ContactRow icon={<Mail />} label="Email"><a href={`mailto:${EMAIL}`} className="break-all hover:text-primary">{EMAIL}</a></ContactRow>
            <ContactRow icon={<MapPin />} label="Service area">Ontario, Canada</ContactRow>
          </ul>
          <a href={PHONE_HREF} className="reveal mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Phone className="h-4 w-4" /> Call now
          </a>
        </div>

        <form onSubmit={onSubmit} noValidate className="reveal rounded-sm bg-card p-7 shadow-elegant md:p-10">
          <h3 className="text-2xl font-bold text-navy">Request a Quote</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" error={errors.name}><input id="name" name="name" autoComplete="name" className={field} /></Field>
            <Field label="Email" name="email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" className={field} /></Field>
            <Field label="Phone" name="phone" error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></Field>
            <Field label="Service Required" name="service" error={errors.service}>
              <select id="service" name="service" defaultValue="" className={field}>
                <option value="" disabled>Select a service</option>
                {["Stucco", "EIFS", "Siding", "Drywall", "Multiple / Not sure"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Message" name="message" error={errors.message}><textarea id="message" name="message" rows={5} className={field} /></Field>
            </div>
          </div>
          <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 font-bold text-primary-foreground shadow-elegant transition hover:-translate-y-0.5 hover:bg-navy">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </button>
          {sent && <p className="mt-4 text-sm text-muted-foreground" role="status">Your email app should open with your enquiry ready to send. If it doesn't, email us at {EMAIL}.</p>}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-navy">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold text-navy">{children}</p>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <Logo className="h-28 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Commercial and residential contracting across Ontario, Canada.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES.map((s) => <li key={s.title}><a href="#services" className="hover:text-primary">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Berat Sorguc</li>
            <li><a href={PHONE_HREF} className="hover:text-primary">{PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li>
            <li>Ontario, Canada</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SRGC Developments Ltd. All rights reserved.
      </div>
    </footer>
  );
}
