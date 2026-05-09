"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const reduce = useReducedMotion();
  const [contactLinkHover, setContactLinkHover] = useState(false);

  return (
    <motion.footer
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-muted)] px-4 py-16 text-[var(--ink)] sm:px-6 sm:py-20"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.6 }}
    >
      <motion.div
        className="pointer-events-none absolute right-2 top-1/2 z-0 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-3 lg:right-4"
        initial={reduce ? false : { y: 150, x: 36, opacity: 0 }}
        whileInView={{ y: 0, x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          duration: reduce ? 0 : 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        animate={
          reduce
            ? undefined
            : {
                scale: contactLinkHover ? 1.08 : 1,
              }
        }
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/contact-call-character.png"
          alt=""
          width={260}
          height={260}
          className="h-auto w-[240px] lg:w-[300px] select-none object-contain opacity-95"
          draggable={false}
          priority={false}
        />
        <p className="text-center text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          MA3 EL SALAMA - TAKE CARE
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 pr-0 md:items-start md:pr-56 lg:pr-72">
        {/* Contact text */}
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--muted)] sm:text-base">
            Contact
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s connect
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            <span className="font-semibold text-[var(--ink)]">SHOKRAN</span> for
            visiting - reach out anytime.
          </p>
          <ul className="mt-7 space-y-3 text-base sm:text-lg">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                Email Me
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href="tel:+201280580403"
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                +20 128 058 0403
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SITE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setContactLinkHover(true)}
                onMouseLeave={() => setContactLinkHover(false)}
                onFocus={() => setContactLinkHover(true)}
                onBlur={() => setContactLinkHover(false)}
                className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile-only character on right */}
        <motion.div
          className="flex shrink-0 flex-col items-center gap-1 md:hidden"
          initial={reduce ? false : { x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduce ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/contact-call-character.png"
            alt=""
            width={160}
            height={160}
            className="h-auto w-[min(120px,30vw)] select-none object-contain opacity-95"
            draggable={false}
            priority={false}
          />
          <p className="text-center text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
            MA3 EL SALAMA
          </p>
        </motion.div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl border-t border-[var(--border)] pt-8 text-center text-xs text-[var(--muted)]">
        © 2026 Mark Takla. Built with Next.js.
      </p>
    </motion.footer>
  );
}
