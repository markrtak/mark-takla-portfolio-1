"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { reducedOrSpring, springChrome } from "@/lib/motion";
import { SITE } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certs" },
  { href: "#volunteering", label: "Volunteer" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--border)_38%,transparent)] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] shadow-[0_1px_0_color-mix(in_srgb,var(--ink)_5%,transparent)] backdrop-blur-xl backdrop-saturate-150"
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reducedOrSpring(reduce, springChrome)}
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-2 px-3 sm:h-14 sm:px-6">
          <Link
            href="#top"
            className="truncate text-sm font-semibold tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--accent)] hover:opacity-90 sm:text-base"
            onClick={() => setMenuOpen(false)}
          >
            {SITE.name}
          </Link>
          <nav className="hidden flex-wrap justify-end gap-x-3 gap-y-1 text-[13px] font-medium tracking-tight text-[var(--muted)] sm:flex md:gap-x-4 md:text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-1.5 py-1 transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-semibold tracking-tight text-[var(--ink)] shadow-[var(--shadow-card)] transition-[border-color,color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:text-[var(--accent)] hover:shadow-[var(--shadow-card-hover)] sm:px-3 sm:py-1.5 sm:text-sm"
            >
              CV
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold tracking-tight text-white shadow-[var(--shadow-card-hover)] transition-[background-color,transform] duration-200 hover:bg-[var(--accent-hover)] hover:brightness-[1.02] max-[430px]:hidden sm:px-3 sm:py-1.5 sm:text-sm"
            >
              GitHub
            </a>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--accent)_28%,var(--border))] sm:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((s) => !s)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/25 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reducedOrSpring(reduce, springChrome)}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-12 z-50 h-[calc(100dvh-3rem)] w-[min(82vw,20rem)] border-l border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-4 shadow-[var(--shadow-card-hover)] backdrop-blur-xl backdrop-saturate-150 sm:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reducedOrSpring(reduce, springChrome)}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Short attention span?
              </p>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={`mobile-${l.href}`}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium tracking-tight text-[var(--ink)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--surface-muted)_88%,transparent)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-[color-mix(in_srgb,var(--border)_42%,transparent)] pt-4">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
                >
                  GitHub ↗
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
