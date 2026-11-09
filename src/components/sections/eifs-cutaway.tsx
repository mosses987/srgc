import { useEffect, useRef, useState, type CSSProperties } from "react";

/** Layers listed outside-in, as a wall is read from the street. */
const LAYERS = [
  {
    key: "finish",
    name: "Finish coat",
    text: "The coloured, textured outer surface you see from the street.",
  },
  {
    key: "base",
    name: "Base coat and mesh",
    text: "Reinforcing mesh set in a base coat that takes the impact.",
  },
  {
    key: "board",
    name: "Insulation board",
    text: "Continuous board that wraps the wall and cuts heat loss.",
  },
  {
    key: "adhesive",
    name: "Adhesive",
    text: "Bonds the board to the wall, with fasteners where specified.",
  },
  {
    key: "substrate",
    name: "Substrate",
    text: "The sheathing or masonry the whole system is built on.",
  },
] as const;

type Key = (typeof LAYERS)[number]["key"];

const TONE: Record<Key, { face: string; edge: string; mark: string }> = {
  finish: {
    face: "oklch(0.9 0.025 245)",
    edge: "oklch(0.72 0.04 245)",
    mark: "oklch(0.72 0.04 245)",
  },
  base: {
    face: "oklch(0.72 0.06 245)",
    edge: "oklch(0.52 0.08 248)",
    mark: "oklch(0.36 0.11 256)",
  },
  board: {
    face: "oklch(0.97 0.006 250)",
    edge: "oklch(0.8 0.015 250)",
    mark: "oklch(0.8 0.015 250)",
  },
  adhesive: {
    face: "oklch(0.58 0.09 248)",
    edge: "oklch(0.4 0.09 252)",
    mark: "oklch(0.88 0.04 245)",
  },
  substrate: {
    face: "oklch(0.4 0.06 256)",
    edge: "oklch(0.28 0.06 258)",
    mark: "oklch(0.3 0.06 258)",
  },
};

function Texture({ id }: { id: Key }) {
  const c = TONE[id].mark;
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {id === "finish" && (
        <>
          <defs>
            <pattern id="p-finish" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.9" fill={c} />
              <circle cx="4.6" cy="4" r="0.7" fill={c} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#p-finish)" />
        </>
      )}
      {id === "base" && (
        <g stroke={c} strokeWidth="0.7" opacity="0.8">
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
              <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
            </g>
          ))}
        </g>
      )}
      {id === "board" && (
        <g fill="none" stroke={c} strokeWidth="1.2">
          <rect x="1" y="1" width="48" height="48" />
          <rect x="51" y="1" width="48" height="48" />
          <rect x="26" y="51" width="48" height="48" />
          <rect x="-24" y="51" width="48" height="48" />
          <rect x="76" y="51" width="48" height="48" />
        </g>
      )}
      {id === "adhesive" && (
        <g fill={c}>
          {[18, 50, 82].flatMap((x) =>
            [14, 38, 62, 86].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />),
          )}
        </g>
      )}
      {id === "substrate" && (
        <g stroke={c} strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="0" y1={(i + 1) * 11} x2="100" y2={(i + 1) * 11} />
          ))}
        </g>
      )}
    </svg>
  );
}

export function EifsCutaway() {
  const wrap = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const st = stack.current;
    const w = wrap.current;
    if (!st || !w) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      st.style.setProperty("--p", "0.8");
      return;
    }
    let raf = 0;
    let target = 0;
    let shown = 0;
    let last = -1;
    const measure = () => {
      const r = w.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -r.top / range));
    };
    const tick = () => {
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      st.style.setProperty("--p", shown.toFixed(4));
      const idx = Math.min(LAYERS.length - 1, Math.floor(shown * LAYERS.length));
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={wrap} className="eifs-wrap relative bg-navy text-navy-foreground">
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pt-20">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-6 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-steel">Inside an EIFS wall</p>
            <h3 className="mt-3 text-3xl font-bold leading-[1.08] md:text-5xl">
              Five layers, one envelope.
            </h3>
            <ol className="mt-6 space-y-1 md:mt-8">
              {LAYERS.map((l, i) => (
                <li
                  key={l.key}
                  data-active={i === active}
                  className={`eifs-label flex items-baseline gap-4 py-1.5 ${i === active ? "text-navy-foreground" : "text-steel"}`}
                >
                  <span className="w-8 shrink-0 text-sm font-bold" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{l.name}</span>
                    <span
                      className={`mt-1 max-w-[38ch] text-base leading-snug ${i === active ? "block" : "hidden md:block"}`}
                    >
                      {l.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div
            className="eifs-stage relative mx-auto h-[36svh] w-full max-w-xl sm:h-[44svh] lg:col-span-7 lg:h-[70svh] lg:max-w-none"
            role="img"
            aria-label="Exploded diagram of the five layers of an EIFS wall, from substrate to finish coat."
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                ref={stack}
                className="eifs-stack relative w-[min(40vw,24svh)] lg:w-[min(30vw,40svh,380px)]"
                style={
                  {
                    aspectRatio: "1",
                    "--p": 0.8,
                  } as CSSProperties
                }
              >
                {[...LAYERS].reverse().map((l, i) => {
                  const idx = LAYERS.length - 1 - i;
                  const tone = TONE[l.key];
                  return (
                    <div
                      key={l.key}
                      className="eifs-slab"
                      data-active={idx === active}
                      style={{ "--i": i, "--edge": tone.edge } as CSSProperties}
                    >
                      <div className="edge" />
                      <div className="face" style={{ background: tone.face }}>
                        <Texture id={l.key} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only">
        Layers outside in: {LAYERS.map((l) => `${l.name}. ${l.text}`).join(" ")}
      </p>
      <p className="absolute inset-x-0 bottom-5 hidden px-8 text-sm text-steel lg:block">
        <span className="mx-auto block max-w-[90rem]">
          Illustrative. Exact layers vary by manufacturer and project.
        </span>
      </p>
    </div>
  );
}
