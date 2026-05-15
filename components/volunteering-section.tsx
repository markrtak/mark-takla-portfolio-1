"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  reducedOrSpring,
  springHoverLift,
  springRevealSoft,
  viewportReveal,
  viewportRevealTight,
} from "@/lib/motion";
import { VOLUNTEERING } from "@/lib/site";
import {
  uiDisplayHeading,
  uiEyebrowAccent,
  uiLead,
  uiSectionDivider,
  uiSectionScrollMargin,
  uiTagOutline,
  uiTagSolid,
} from "@/lib/ui-classes";

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
      className={`relative ${uiSectionScrollMargin} overflow-hidden ${uiSectionDivider} bg-[var(--bg)] px-4 py-20 sm:px-6`}
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
          viewport={viewportReveal}
          transition={reducedOrSpring(reduce, springRevealSoft)}
        >
          <p className={uiEyebrowAccent}>Giving back</p>
          <h2 className={`mt-2 ${uiDisplayHeading}`}>Volunteering</h2>
          <p className={uiLead}>
            Committing hundreds of hours to what counts and matters.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {VOLUNTEERING.map((entry, i) => {
            const v = vibeStyles[entry.vibe];
            const tilt = i === 1 ? "md:-rotate-1" : i === 2 ? "md:rotate-1" : "";
            return (
              <motion.li
                key={`${entry.title}-${entry.organization}`}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportRevealTight}
                transition={reducedOrSpring(
                  reduce,
                  springRevealSoft,
                  i * 0.075,
                )}
                whileHover={
                  reduce ? undefined : { y: -6, transition: springHoverLift }
                }
                className={`group relative list-none ${tilt}`}
              >
                <div
                  className={`relative rounded-[1.75rem] bg-gradient-to-br p-[1px] shadow-[var(--shadow-card)] transition-[box-shadow] duration-300 group-hover:shadow-[var(--shadow-card-hover)] ${v.shell}`}
                >
                  <article
                    className="relative h-full overflow-hidden rounded-[1.7rem] border border-[color-mix(in_srgb,var(--border)_38%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)] ring-1 ring-[color-mix(in_srgb,var(--ink)_3%,transparent)] transition-[border-color] duration-300 group-hover:border-[color-mix(in_srgb,var(--accent)_22%,var(--border))]"
                    style={{
                      clipPath:
                        entry.vibe === "ticket"
                          ? "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                          : undefined,
                    }}
                  >
                    <div
                      className="absolute -right-8 top-5 z-[2] w-40 rotate-45 py-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-[var(--shadow-card)]"
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
                          <p className="mt-1 text-sm font-semibold tracking-tight text-[var(--ink)]">
                            {entry.organization}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
                        {entry.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-dashed border-[color-mix(in_srgb,var(--border)_48%,transparent)] pt-4 text-[11px] tracking-wide text-[var(--muted)]">
                        <span className={uiTagSolid}>{entry.range}</span>
                        <span className={uiTagOutline}>{entry.location}</span>
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
