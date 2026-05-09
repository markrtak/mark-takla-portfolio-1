"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VOLUNTEERING } from "@/lib/site";

const vibeStyles = {
  ribbon: {
    shell:
      "from-[color-mix(in_srgb,var(--accent)_22%,transparent)] to-[color-mix(in_srgb,var(--accent)_6%,transparent)]",
    notch: "bg-[var(--accent)]",
    label: "text-[var(--accent)]",
  },
  ticket: {
    shell:
      "from-[color-mix(in_srgb,var(--ink)_8%,transparent)] to-[color-mix(in_srgb,var(--muted)_12%,transparent)]",
    notch: "bg-[var(--ink)]",
    label: "text-[var(--ink)]",
  },
  stamp: {
    shell:
      "from-[color-mix(in_srgb,var(--accent-soft)_100%,transparent)] to-[color-mix(in_srgb,var(--surface-muted)_100%,transparent)]",
    notch: "bg-[color-mix(in_srgb,var(--accent)_65%,var(--ink))]",
    label: "text-[color-mix(in_srgb,var(--accent)_75%,var(--ink))]",
  },
} as const;

export function VolunteeringSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="volunteering"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-20 sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 10% -10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 100%, color-mix(in srgb, var(--muted) 12%, transparent), transparent 50%)
          `,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Giving back
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Volunteering
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Committing 200+ hours to what counts and matters. Scouting, New
            Jersey summer camps in 2023 (30+ children), and refugee community
            events (200+ children). Each on its own card, aligned with my CV.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {VOLUNTEERING.map((entry, i) => {
            const v = vibeStyles[entry.vibe];
            const tilt = i === 1 ? "md:-rotate-1" : i === 2 ? "md:rotate-1" : "";
            return (
              <motion.li
                key={`${entry.title}-${entry.organization}`}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative list-none ${tilt}`}
              >
                <div
                  className={`relative rounded-[1.75rem] bg-gradient-to-br p-[1px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] ${v.shell}`}
                >
                  <article
                    className="relative h-full overflow-hidden rounded-[1.7rem] border border-[color-mix(in_srgb,var(--border)_55%,transparent)] bg-[var(--surface)]"
                    style={{
                      clipPath:
                        entry.vibe === "ticket"
                          ? "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                          : undefined,
                    }}
                  >
                    <div
                      className="absolute -right-8 top-5 z-[2] w-40 rotate-45 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-white shadow-sm"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent-hover) 85%, var(--accent)))",
                      }}
                      aria-hidden
                    >
                      Volunteer
                    </div>

                    {entry.vibe === "stamp" && (
                      <div
                        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full border-2 border-dashed border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] opacity-40"
                        aria-hidden
                      />
                    )}

                    <div className="relative p-6 sm:p-7">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-inner ${v.notch}`}
                          aria-hidden
                        >
                          {entry.vibe === "ribbon"
                            ? "♥"
                            : entry.vibe === "ticket"
                              ? "◇"
                              : "✦"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={`text-lg font-bold leading-snug tracking-tight ${v.label}`}
                          >
                            {entry.title}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                            {entry.organization}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                        {entry.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-dashed border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
                        <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 font-medium text-[var(--ink)]">
                          {entry.range}
                        </span>
                        <span className="rounded-full border border-[var(--border)] px-3 py-1">
                          {entry.location}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
