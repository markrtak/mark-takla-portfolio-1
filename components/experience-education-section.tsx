"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  reducedOrSpring,
  springHoverLift,
  springLayout,
  springReveal,
  springRevealSoft,
  springTactile,
  viewportReveal,
  viewportRevealLoose,
} from "@/lib/motion";
import { CERTIFICATIONS, DEGREES, EXPERIENCE } from "@/lib/site";
import {
  uiCardInteractive,
  uiCardSurface,
  uiDisplayHeading,
  uiEyebrowMuted,
  uiLead,
  uiSectionDivider,
  uiSectionScrollMargin,
  uiTagSolid,
} from "@/lib/ui-classes";

type TabId = "experience" | "education" | "certifications";

type RGB = { r: number; g: number; b: number };

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "experience", label: "Experience", short: "Experience" },
  { id: "education", label: "Education", short: "Education" },
  { id: "certifications", label: "Certifications", short: "Certs" },
];

const DEFAULT_SCREEN_GLOW: RGB = { r: 100, g: 116, b: 139 };

/** Map job stack tags to screen-reflection glow (e.g. Python → yellow, .NET → blue). */
function screenGlowFromTags(tags?: string[]): RGB {
  if (!tags?.length) return DEFAULT_SCREEN_GLOW;
  const blob = tags.join(" ").toLowerCase();
  if (blob.includes("python")) return { r: 234, g: 179, b: 8 };
  if (
    blob.includes(".net") ||
    blob.includes("c#") ||
    blob.includes("dotnet") ||
    blob.includes("asp.net")
  ) {
    return { r: 59, g: 130, b: 246 };
  }
  if (blob.includes("java")) return { r: 249, g: 115, b: 22 };
  if (blob.includes("typescript") || blob.includes("javascript")) {
    return { r: 99, g: 102, b: 241 };
  }
  if (blob.includes("matlab")) return { r: 168, g: 85, b: 247 };
  if (blob.includes("uipath") || blob.includes("rpa")) {
    return { r: 6, g: 182, b: 212 };
  }
  if (blob.includes("robotics")) return { r: 52, g: 211, b: 153 };
  if (blob.includes("rail") || blob.includes("scada")) {
    return { r: 14, g: 165, b: 233 };
  }
  return DEFAULT_SCREEN_GLOW;
}

function parseHash(): TabId {
  if (typeof window === "undefined") return "experience";
  const h = window.location.hash.slice(1);
  if (h === "education" || h === "certifications") return h;
  if (h === "experience") return "experience";
  return "experience";
}

function experienceJobKey(job: (typeof EXPERIENCE)[number]): string {
  return `${job.organization}-${job.range}-${job.title}`;
}

/**
 * Mobile: sticky ceiling with background so cards don't show through.
 * lg+: sticky in left grid column (transparent, no padding).
 */
const STICKY_ICON_TOP_CLASS =
  "sticky top-12 z-20 flex justify-center bg-[var(--bg)] py-3 sm:top-14 " +
  "lg:top-[max(5rem,calc(50vh-11rem))] lg:z-0 lg:bg-transparent lg:py-0 lg:self-start";

/** Mobile: column (icon on top). lg+: two-column grid. */
const LAPTOP_SIDEBAR_LAYOUT =
  "flex flex-col gap-0 lg:grid lg:grid-cols-[minmax(200px,260px)_1fr] lg:items-start lg:gap-12 xl:grid-cols-[minmax(220px,280px)_1fr] xl:gap-14";

type ExperienceLaptopProps = {
  screenGlow: RGB;
  cardHovered: boolean;
  reduce: boolean | null;
  className?: string;
};

function ExperienceLaptop({
  screenGlow,
  cardHovered,
  reduce,
  className = "",
}: ExperienceLaptopProps) {
  const glowStyle = {
    background: `radial-gradient(ellipse 85% 75% at 50% 38%, rgba(${screenGlow.r},${screenGlow.g},${screenGlow.b},0.55), rgba(${screenGlow.r},${screenGlow.g},${screenGlow.b},0.12) 45%, transparent 72%)`,
  };

  return (
    <motion.div
      className={`relative w-full max-w-[min(100px,28vw)] sm:max-w-[min(120px,32vw)] lg:max-w-none ${className}`}
      animate={{ scale: reduce ? 1 : cardHovered ? 1.05 : 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : springTactile
      }
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[72%] w-[130%] -translate-x-1/2 blur-3xl transition-[background,opacity] duration-300 ease-out"
        style={glowStyle}
        aria-hidden
      />
      <div className="relative aspect-[4/5] w-full">
        <motion.div
          className="absolute inset-0 z-[1]"
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -4, 0],
                  rotate: [0, 1.2, -0.8, 0],
                }
          }
          transition={{
            duration: 5.5,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/hero-character.png"
            alt=""
            fill
            className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_14px_32px_rgba(0,0,0,0.35)]"
            sizes="(max-width: 1024px) 58vw, 280px"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperienceEducationSection() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<TabId>("experience");
  const [screenGlow, setScreenGlow] = useState<RGB>(DEFAULT_SCREEN_GLOW);
  const [cardHovered, setCardHovered] = useState(false);

  const syncFromHash = useCallback(() => {
    setTab(parseHash());
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  useEffect(() => {
    if (tab !== "experience") {
      setCardHovered(false);
      setScreenGlow(DEFAULT_SCREEN_GLOW);
    }
  }, [tab]);

  const selectTab = (id: TabId) => {
    setTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section
      id="experience"
      className={`relative ${uiSectionScrollMargin} ${uiSectionDivider} bg-[var(--bg)] px-4 py-20 sm:px-6`}
    >
      <span
        id="education"
        className={`pointer-events-none absolute left-0 top-0 block h-px w-px ${uiSectionScrollMargin} opacity-0`}
        aria-hidden
      />
      <span
        id="certifications"
        className={`pointer-events-none absolute left-0 top-0 block h-px w-px ${uiSectionScrollMargin} opacity-0`}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={reducedOrSpring(reduce, springReveal)}
        >
          <p className={uiEyebrowMuted}>Background</p>
          <h2 className={`mt-2 ${uiDisplayHeading}`}>
            Experience, education & certifications
          </h2>
          <p className={`mx-auto ${uiLead}`}>
            Choose a category below - everything lives in this one section.
          </p>
        </motion.div>

        <div
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-[color-mix(in_srgb,var(--border)_38%,transparent)] sm:bg-[color-mix(in_srgb,var(--surface-muted)_92%,transparent)] sm:p-1 sm:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--ink)_5%,transparent)] sm:backdrop-blur-sm"
          role="tablist"
          aria-label="Experience, education, or certifications"
        >
          {TABS.map(({ id, label, short }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              className={`relative flex-1 rounded-full py-3 text-sm font-semibold tracking-tight outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:py-2.5 ${
                tab === id
                  ? "text-[var(--ink)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
              onClick={() => selectTab(id)}
            >
              {tab === id && (
                <motion.span
                  layoutId="career-tab-pill"
                  className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-[var(--shadow-card)] ring-1 ring-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                  transition={springLayout}
                />
              )}
              <span className="relative z-10 sm:hidden">{short}</span>
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-10 min-h-[240px]">
          {tab === "experience" && (
            <div
              id="panel-experience"
              role="tabpanel"
              aria-labelledby="tab-experience"
            >
              <div className={LAPTOP_SIDEBAR_LAYOUT}>
                <div className={STICKY_ICON_TOP_CLASS}>
                  <ExperienceLaptop
                    screenGlow={screenGlow}
                    cardHovered={cardHovered}
                    reduce={reduce}
                  />
                </div>

                <div className="mt-4 min-w-0 space-y-6 lg:mt-0">
                  {EXPERIENCE.map((job, idx) => (
                    <motion.article
                      key={experienceJobKey(job)}
                      className={`p-6 sm:p-7 ${uiCardInteractive}`}
                      initial={reduce ? false : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportRevealLoose}
                      transition={reducedOrSpring(
                        reduce,
                        springRevealSoft,
                        idx * 0.055,
                      )}
                      whileHover={
                        reduce
                          ? undefined
                          : { y: -5, transition: springHoverLift }
                      }
                      onMouseEnter={() => {
                        setScreenGlow(screenGlowFromTags(job.tags));
                        setCardHovered(true);
                      }}
                      onMouseLeave={() => {
                        setScreenGlow(DEFAULT_SCREEN_GLOW);
                        setCardHovered(false);
                      }}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold tracking-tight text-[var(--ink)]">
                            {job.title}
                          </h3>
                          <p className="mt-0.5 font-semibold tracking-tight text-[var(--muted)]">
                            {job.organization}
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-sm tabular-nums tracking-tight text-[var(--muted)] sm:text-right">
                          <p className="font-semibold text-[var(--ink)]">
                            {job.range}
                          </p>
                          <p>{job.location}</p>
                        </div>
                      </div>
                      {job.summary && (
                        <p className="mt-4 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
                          {job.summary}
                        </p>
                      )}
                      {job.bullets && job.bullets.length > 0 && (
                        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
                          {job.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {job.tags && job.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {job.tags.map((t) => (
                            <span key={t} className={uiTagSolid}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "education" && (
            <div
              id="panel-education"
              role="tabpanel"
              aria-labelledby="tab-education"
            >
              <div className={LAPTOP_SIDEBAR_LAYOUT}>
                <div className={STICKY_ICON_TOP_CLASS}>
                  <ExperienceLaptop
                    screenGlow={DEFAULT_SCREEN_GLOW}
                    cardHovered={false}
                    reduce={reduce}
                  />
                </div>

                <div className="mt-4 min-w-0 space-y-6 lg:mt-0">
                  {DEGREES.map((d, idx) => (
                    <motion.article
                      key={d.degree}
                      className={`p-6 sm:p-7 ${uiCardInteractive}`}
                      initial={reduce ? false : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportRevealLoose}
                      transition={reducedOrSpring(
                        reduce,
                        springRevealSoft,
                        idx * 0.055,
                      )}
                      whileHover={
                        reduce
                          ? undefined
                          : { y: -5, transition: springHoverLift }
                      }
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold tracking-tight text-[var(--ink)]">
                            {d.degree}
                          </h3>
                          <p className="mt-0.5 font-semibold tracking-tight text-[var(--muted)]">
                            {d.institution}
                          </p>
                        </div>
                        <div className="shrink-0 text-left text-sm tabular-nums tracking-tight text-[var(--muted)] sm:text-right">
                          <p className="font-semibold text-[var(--ink)]">{d.range}</p>
                          <p>{d.location}</p>
                        </div>
                      </div>
                      {d.description && (
                        <p className="mt-4 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
                          {d.description}
                        </p>
                      )}
                      {d.coursework && d.coursework.length > 0 && (
                        <div className="mt-5">
                          <p className={`${uiEyebrowMuted} tracking-[0.14em]`}>
                            Relevant coursework
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {d.coursework.map((c) => (
                              <span key={c} className={uiTagSolid}>
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "certifications" && (
            <div
              id="panel-certifications"
              role="tabpanel"
              aria-labelledby="tab-certifications"
            >
              <div className={LAPTOP_SIDEBAR_LAYOUT}>
                <div className={STICKY_ICON_TOP_CLASS}>
                  <ExperienceLaptop
                    screenGlow={DEFAULT_SCREEN_GLOW}
                    cardHovered={false}
                    reduce={reduce}
                  />
                </div>

                <div className="mt-4 min-w-0 lg:mt-0">
                  <div className={`p-6 sm:p-7 ${uiCardSurface}`}>
                    <p className="text-sm font-medium tracking-tight text-[var(--muted)]">
                      Diplomas, bootcamps, and courses.
                    </p>
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
                      {CERTIFICATIONS.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="font-semibold text-[var(--accent)]" aria-hidden>
                            ·
                          </span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
