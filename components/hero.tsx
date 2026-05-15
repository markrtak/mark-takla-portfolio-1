"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { HeroScribbleLayer } from "@/components/hero-scribbles";
import {
  reducedOrSpring,
  springHeroScribbleConfig,
  springReveal,
} from "@/lib/motion";
import { uiSectionScrollMargin } from "@/lib/ui-classes";
import { SITE } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const charRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const gazeNormX = useMotionValue(0);
  const gazeNormY = useMotionValue(0);

  const gazeSpringX = useSpring(gazeNormX, {
    stiffness: 150,
    damping: 30,
    mass: 0.32,
  });
  const gazeSpringY = useSpring(gazeNormY, {
    stiffness: 150,
    damping: 30,
    mass: 0.32,
  });

  /** Subtle “head / gaze” toward cursor — small angles only, no full-body tilt. */
  const gazeRotate = useTransform(gazeSpringX, [-0.5, 0.5], [-5.2, 5.2]);
  const gazeShiftX = useTransform(gazeSpringX, [-0.5, 0.5], [-3.5, 3.5]);
  const gazeShiftY = useTransform(gazeSpringY, [-0.5, 0.5], [-2.8, 2.8]);

  const spotX = useSpring(50, { stiffness: 200, damping: 32 });
  const spotY = useSpring(32, { stiffness: 200, damping: 32 });

  const spotlightBg = useMotionTemplate`radial-gradient(40% 32% at ${spotX}% ${spotY}%, rgba(255,255,255,0.16), transparent 60%)`;

  const springX = useSpring(mouseX, springHeroScribbleConfig);
  const springY = useSpring(mouseY, springHeroScribbleConfig);

  useEffect(() => {
    if (reduce) return;

    const updateGaze = (e: MouseEvent) => {
      const el = charRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const eyeY = r.top + r.height * 0.3;
      const scaleX = Math.max(window.innerWidth, 1);
      const scaleY = Math.max(window.innerHeight, 1);
      let nx = ((e.clientX - cx) / scaleX) * 2.4;
      let ny = ((e.clientY - eyeY) / scaleY) * 2.4;
      nx = Math.max(-0.5, Math.min(0.5, nx));
      ny = Math.max(-0.5, Math.min(0.5, ny));
      gazeNormX.set(nx);
      gazeNormY.set(ny);

      const px = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
      const py = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
      spotX.set(Math.max(5, Math.min(95, px)));
      spotY.set(Math.max(8, Math.min(92, py)));
    };

    const resetGaze = () => {
      gazeNormX.set(0);
      gazeNormY.set(0);
      spotX.set(50);
      spotY.set(32);
    };

    window.addEventListener("mousemove", updateGaze);
    window.addEventListener("blur", resetGaze);
    document.documentElement.addEventListener("mouseleave", resetGaze);

    return () => {
      window.removeEventListener("mousemove", updateGaze);
      window.removeEventListener("blur", resetGaze);
      document.documentElement.removeEventListener("mouseleave", resetGaze);
    };
  }, [reduce, gazeNormX, gazeNormY, spotX, spotY]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(r.width, 1);
      const y = (e.clientY - r.top) / Math.max(r.height, 1);
      mouseX.set(Math.min(1, Math.max(0, x)));
      mouseY.set(Math.min(1, Math.max(0, y)));
    },
    [mouseX, mouseY],
  );

  const onPointerLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className={`relative ${uiSectionScrollMargin} overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-scribble-mask pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <HeroScribbleLayer springX={springX} springY={springY} />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:max-w-5xl md:flex-row md:items-center md:justify-center md:gap-10 lg:max-w-6xl lg:gap-14">
        <motion.div
          className="relative w-[min(220px,72vw)] shrink-0 sm:w-[min(260px,55vw)] md:w-[min(280px,38%)]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedOrSpring(reduce, springReveal)}
        >
          <div ref={charRef} className="relative isolate">
            {reduce ? (
              <Image
                src="/hero-avatar.png"
                alt="Mark Takla"
                width={560}
                height={700}
                className="h-auto w-full select-none object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_48px_rgba(0,0,0,0.5)]"
                sizes="(max-width: 768px) 72vw, 280px"
                priority
                draggable={false}
              />
            ) : (
              <>
                <motion.div
                  className="relative will-change-transform"
                  style={{
                    transformOrigin: "50% 31%",
                    rotate: gazeRotate,
                    x: gazeShiftX,
                    y: gazeShiftY,
                  }}
                >
                  <Image
                    src="/hero-avatar.png"
                    alt="Mark Takla"
                    width={560}
                    height={700}
                    className="h-auto w-full select-none object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_48px_rgba(0,0,0,0.5)]"
                    sizes="(max-width: 768px) 72vw, 280px"
                    priority
                    draggable={false}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
                    style={{ background: spotlightBg }}
                    aria-hidden
                  />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col items-center text-center md:max-w-xl md:items-start md:text-left">
          <motion.div
            className="mb-6 flex flex-col items-center gap-3 md:items-start"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedOrSpring(reduce, springReveal, reduce ? 0 : 0.08)}
          >
            <span
              className="max-md:[text-shadow:0_0_14px_var(--surface),0_2px_8px_color-mix(in_srgb,var(--surface)_95%,transparent)] text-3xl font-semibold tracking-[0.08em] text-[var(--accent)] sm:text-4xl"
              style={{ fontFamily: "var(--font-ahlan), system-ui, sans-serif" }}
            >
              AHLAN
            </span>
            <p className="max-w-md text-sm font-medium leading-snug text-[var(--muted)] max-md:[text-shadow:0_0_12px_var(--surface),0_1px_2px_var(--surface)] sm:text-base">
              Glad you&apos;re here. Have a look around.
            </p>
          </motion.div>

          <motion.h1
            className="max-md:[text-shadow:0_0_14px_var(--surface),0_1px_3px_var(--surface),0_2px_24px_color-mix(in_srgb,var(--surface)_90%,transparent)] text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedOrSpring(reduce, springReveal, reduce ? 0 : 0.06)}
          >
            Mark Raymond Takla
            <span className="max-md:[text-shadow:0_0_12px_var(--surface),0_2px_10px_color-mix(in_srgb,var(--surface)_88%,transparent)] mt-1 block text-[var(--accent)]">
              {SITE.title}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl max-md:[text-shadow:0_0_12px_var(--surface),0_1px_2px_var(--surface)] text-lg leading-relaxed text-[var(--muted)]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedOrSpring(reduce, springReveal, reduce ? 0 : 0.12)}
          >
            Projects spanning Agentic AI, ML baselines, agents, data pipelines,
            and full-stack apps. Based in {SITE.location}.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedOrSpring(reduce, springReveal, reduce ? 0 : 0.18)}
          >
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-[var(--shadow-card-hover)] transition-[background-color,box-shadow] duration-200 hover:bg-[var(--accent-hover)] hover:brightness-[1.02]"
            >
              See projects
            </Link>
            <Link
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold tracking-tight text-[var(--ink)] shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] hover:shadow-[var(--shadow-card-hover)]"
            >
              Download CV
            </Link>
          </motion.div>
          <div
            className="pointer-events-none mt-6 h-8 w-full sm:hidden"
            style={{
              background:
                "radial-gradient(70% 100% at 50% 0%, rgba(0,0,0,0.14), transparent 72%)",
              filter: "blur(8px)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
