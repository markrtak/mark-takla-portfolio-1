"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CERTIFICATIONS, DEGREES, EXPERIENCE } from "@/lib/site";

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
          : { type: "spring", stiffness: 420, damping: 28 }
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
      className="relative scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg)] px-4 py-20 sm:px-6"
    >
      <span
        id="education"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px scroll-mt-28 opacity-0"
        aria-hidden
      />
      <span
        id="certifications"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px scroll-mt-28 opacity-0"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Background
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Experience, education & certifications
          </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
                Choose a category below - everything lives in this one section.
              </p>
        </motion.div>

        <div
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-[var(--border)] sm:bg-[var(--surface-muted)] sm:p-1 sm:shadow-inner"
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
              className={`relative flex-1 rounded-full py-3 text-sm font-semibold transition-colors sm:py-2.5 ${
                tab === id
                  ? "text-[var(--ink)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
              onClick={() => selectTab(id)}
            >
              {tab === id && (
                <motion.span
                  layoutId="career-tab-pill"
                  className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
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

                <div className="mt-4 min-w-0 space-y-5 lg:mt-0">
                  {EXPERIENCE.map((job) => (
                    <article
                      key={experienceJobKey(job)}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-colors hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))]"
                      onMouseEnter={() => {
                        setScreenGlow(screenGlowFromTags(job.tags));
                        setCardHovered(true);
                      }}
                      onMouseLeave={() => {
                        setScreenGlow(DEFAULT_SCREEN_GLOW);
                        setCardHovered(false);
                      }}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[var(--ink)]">
                            {job.title}
                          </h3>
                          <p className="font-medium text-[var(--muted)]">
                            {job.organization}
                          </p>
                        </div>
                        <div className="text-left text-sm text-[var(--muted)] sm:text-right">
                          <p className="font-medium text-[var(--ink)]">
                            {job.range}
                          </p>
                          <p>{job.location}</p>
                        </div>
                      </div>
                      {job.summary && (
                        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                          {job.summary}
                        </p>
                      )}
                      {job.bullets && job.bullets.length > 0 && (
                        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
                          {job.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {job.tags && job.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
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

                <div className="mt-4 min-w-0 space-y-5 lg:mt-0">
                  {DEGREES.map((d) => (
                    <article
                      key={d.degree}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[var(--ink)]">
                            {d.degree}
                          </h3>
                          <p className="font-medium text-[var(--muted)]">
                            {d.institution}
                          </p>
                        </div>
                        <div className="text-left text-sm text-[var(--muted)] sm:text-right">
                          <p className="font-medium text-[var(--ink)]">{d.range}</p>
                          <p>{d.location}</p>
                        </div>
                      </div>
                      {d.description && (
                        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                          {d.description}
                        </p>
                      )}
                      {d.coursework && d.coursework.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                            Relevant coursework
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {d.coursework.map((c) => (
                              <span
                                key={c}
                                className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink)]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
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
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
                    <p className="text-sm text-[var(--muted)]">
                      Diplomas, bootcamps, and courses.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                      {CERTIFICATIONS.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-[var(--muted)]" aria-hidden>
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
