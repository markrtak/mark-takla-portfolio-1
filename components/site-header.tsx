"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
        className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-md"
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-2 px-3 sm:h-14 sm:px-6">
          <Link
            href="#top"
            className="truncate text-sm font-semibold tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--accent)] hover:opacity-90 sm:text-base"
            onClick={() => setMenuOpen(false)}
          >
            {SITE.name}
          </Link>
          <nav className="hidden flex-wrap justify-end gap-x-3 gap-y-1 text-xs font-medium text-[var(--muted)] sm:flex md:gap-x-4 md:text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[var(--accent)]"
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
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:px-3 sm:py-1.5 sm:text-sm"
            >
              CV
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold text-white shadow-md transition hover:bg-[var(--accent-hover)] max-[430px]:hidden sm:px-3 sm:py-1.5 sm:text-sm"
            >
              GitHub
            </a>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] sm:hidden"
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
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-12 z-50 h-[calc(100dvh-3rem)] w-[min(82vw,20rem)] border-l border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl sm:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Short attention span?
              </p>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={`mobile-${l.href}`}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--surface-muted)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-[var(--border)] pt-4">
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
