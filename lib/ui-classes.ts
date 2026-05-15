/**
 * Repeated composition tokens — pair with CSS vars in globals.css (--shadow-card, etc.).
 */

/** Sticky header clearance for hash / in-page scroll targets (matches header ~48–56px + air). */
export const uiSectionScrollMargin = "scroll-mt-24";

export const uiSectionDivider =
  "border-t border-[color-mix(in_srgb,var(--border)_42%,transparent)]";

export const uiEyebrowMuted =
  "text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]";

export const uiEyebrowAccent =
  "text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]";

export const uiDisplayHeading =
  "text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl";

export const uiLead =
  "mt-3 max-w-2xl text-[var(--muted)] leading-relaxed tracking-tight";

export const uiCardSurface =
  "relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--border)_38%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)] ring-1 ring-[color-mix(in_srgb,var(--ink)_3.5%,transparent)] transition-[border-color,box-shadow] duration-300 ease-out";

export const uiCardInteractive =
  `${uiCardSurface} hover:border-[color-mix(in_srgb,var(--accent)_26%,var(--border))] hover:shadow-[var(--shadow-card-hover)]`;

export const uiTagSolid =
  "rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--ink)]";

export const uiTagOutline =
  "rounded-full border border-[color-mix(in_srgb,var(--border)_48%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]";
