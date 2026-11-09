import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

import { CTA, Logo, NAV, PHONE_DISPLAY, PHONE_HREF } from "./shared";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [
        btn.current,
        ...Array.from(panel.current.querySelectorAll<HTMLElement>("a")),
      ].filter((x): x is HTMLElement => !!x);
      const a = f[0];
      const z = f[f.length - 1];
      if (!a || !z) return;
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-card">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="flex h-full items-center focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="SRGC Developments Ltd, home"
        >
          <Logo className="h-[4.5rem] w-auto" />
        </a>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative py-2 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {n.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </a>
          ))}
          <CTA href="#contact">Request a Quote</CTA>
        </nav>
        <button
          ref={btn}
          className="relative z-[60] grid h-12 w-12 place-items-center rounded-sm bg-secondary text-navy transition-colors hover:bg-steel/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          ref={panel}
          className="fixed inset-x-0 bottom-0 top-20 flex flex-col overflow-y-auto bg-navy px-5 pb-8 pt-4 lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="animate-rise font-display text-3xl font-bold text-navy-foreground transition-colors hover:text-steel focus-visible:outline-2 focus-visible:outline-steel"
              style={{ animationDelay: `${i * 50}ms`, paddingBlock: "0.9rem" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-auto grid gap-3 pt-8">
            <CTA href="#contact" variant="light" className="w-full">
              Request a Quote
            </CTA>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold text-primary-foreground focus-visible:outline-2 focus-visible:outline-steel"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/** Persistent call + quote bar for phones. Hides while the contact section is on screen. */
export function MobileActionBar() {
  const [inContact, setInContact] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  // Shown at the top of the page and whenever the visitor scrolls up; tucked away while reading downward
  // so it never sits over content. Always hidden while the contact form itself is on screen.
  const hide = inContact || scrollingDown;
  useEffect(() => {
    const t = document.getElementById("contact");
    if (!t) return;
    const io = new IntersectionObserver(([e]) => setInContact(!!e?.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(t);
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) setScrollingDown(false);
      else if (y > last + 6) setScrollingDown(true);
      else if (y < last - 6) setScrollingDown(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-navy transition-transform duration-500 lg:hidden ${hide ? "translate-y-full" : ""}`}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <a
        href={PHONE_HREF}
        className="flex h-14 items-center justify-center gap-2 text-sm font-bold text-navy-foreground focus-visible:outline-2 focus-visible:outline-steel"
      >
        <Phone className="h-4 w-4" aria-hidden="true" /> Call
      </a>
      <a
        href="#contact"
        className="flex h-14 items-center justify-center bg-primary text-sm font-bold text-primary-foreground focus-visible:outline-2 focus-visible:outline-steel"
      >
        Request a Quote
      </a>
    </div>
  );
}
