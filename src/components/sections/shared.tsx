import { useEffect, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import logo from "@/assets/srgc-logo.png";

export const PHONE_DISPLAY = "647-721-4804";
export const PHONE_HREF = "tel:+16477214804";
export const EMAIL = "info@srgcdevelopments.ca";

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#sectors", label: "Sectors" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/**
 * Staggered entrance. Elements start visible (no-JS safe). Only those below the
 * fold are marked `.pre` once script runs, then released as they enter.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.remove("pre");
          el.classList.add("in");
          io.unobserve(el);
        }),
      { threshold: 0.05, rootMargin: "0px 0px 6% 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.classList.add("pre");
      io.observe(el);
    });
    // Fast jumps (anchor links, End key) can skip an element entirely; release anything already above the fold.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      document.querySelectorAll<HTMLElement>("[data-reveal].pre").forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          el.classList.remove("pre");
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img src={logo} alt="SRGC Developments Ltd" className={className} width={549} height={460} />
  );
}

export function CTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-4 text-sm font-bold tracking-wide transition-[background-color,color,transform] duration-300 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-navy",
    light: "bg-navy-foreground text-navy hover:bg-steel",
    ghost:
      "text-navy-foreground underline decoration-steel decoration-2 underline-offset-8 hover:decoration-navy-foreground",
  }[variant];
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  tone = "light",
  className = "",
  reveal = true,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  reveal?: boolean;
}) {
  const r = (kind: string) => (reveal ? kind : undefined);
  return (
    <div className={`max-w-5xl ${className}`}>
      <p data-reveal={r("text")} className={`eyebrow ${tone === "dark" ? "text-steel" : ""}`}>
        {eyebrow}
      </p>
      <h2
        data-reveal={r("head")}
        style={{ "--d": "80ms" } as React.CSSProperties}
        className={`mt-4 text-3xl font-bold leading-[1.08] md:text-5xl ${tone === "dark" ? "text-navy-foreground" : "text-navy"}`}
      >
        {title}
      </h2>
      {children && (
        <p
          data-reveal={r("text")}
          style={{ "--d": "180ms" } as React.CSSProperties}
          className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground"
        >
          {children}
        </p>
      )}
    </div>
  );
}

export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
