"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    title: "Music",
    body: "I listen across genres - a big part of how I focus, relax, and recharge.",
  },
  {
    title: "Weightlifting & CrossFit",
    body: "6 consistent years in the gym: barbell work, high-intensity conditioning, and showing up on hard days.",
  },
  {
    title: "Basketball & swimming",
    body: "I used to play basketball competitively and swam for years - team energy and the pool are still my happy places.",
  },
] as const;

export function HobbiesSection() {
  const reduce = useReducedMotion();

  const slideFromLeft = reduce
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: -72 };
  const slideFromRight = reduce
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: 72 };

  const visible = { opacity: 1, x: 0 };

  return (
    <section
      id="hobbies"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-20 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <motion.div
          className="absolute bottom-0 left-0 top-auto z-0 w-[min(52vw,13.5rem)] sm:w-[min(38vw,18rem)] md:w-[min(34vw,20rem)]"
          initial={slideFromLeft}
          whileInView={visible}
          viewport={{ once: true, amount: 0.25, margin: "-80px 0px" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: reduce ? 0 : 0.05,
          }}
          aria-hidden
        >
          <Image
            src="/hobbies/basketball.png"
            alt=""
            width={400}
            height={500}
            className="h-auto w-full object-contain object-left-bottom opacity-95 drop-shadow-[0_18px_32px_rgba(0,0,0,0.22)]"
            sizes="(max-width: 640px) 42vw, 20rem"
            priority={false}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 top-auto z-0 w-[min(52vw,13.5rem)] sm:w-[min(38vw,18rem)] md:w-[min(34vw,20rem)]"
          initial={slideFromRight}
          whileInView={visible}
          viewport={{ once: true, amount: 0.25, margin: "-80px 0px" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: reduce ? 0 : 0.12,
          }}
          aria-hidden
        >
          <Image
            src="/hobbies/gym.png"
            alt=""
            width={400}
            height={500}
            className="h-auto w-full object-contain object-right-bottom opacity-95 drop-shadow-[0_18px_32px_rgba(0,0,0,0.22)]"
            sizes="(max-width: 640px) 42vw, 20rem"
            priority={false}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Beyond the screen
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Hobbies
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            A few things that keep me balanced when I&apos;m not building or
            learning.
          </p>
        </motion.div>

        <ul className="mt-12 space-y-8 text-left sm:mt-14">
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] px-5 py-4 shadow-sm backdrop-blur-sm sm:px-6"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : 0.08 * i,
              }}
            >
              <h3 className="font-semibold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ul>

        <div
          className="mt-12 flex justify-center gap-6 px-2 pb-2 sm:hidden"
          aria-hidden
        >
          <motion.div
            className="relative h-44 w-[min(8.25rem,38vw)] shrink-0"
            initial={slideFromLeft}
            whileInView={visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduce ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: reduce ? 0 : 0.05,
            }}
          >
            <Image
              src="/hobbies/basketball.png"
              alt=""
              fill
              className="object-contain object-bottom object-left opacity-95 drop-shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
              sizes="(max-width: 640px) 38vw, 10rem"
            />
          </motion.div>
          <motion.div
            className="relative h-44 w-[min(8.25rem,38vw)] shrink-0"
            initial={slideFromRight}
            whileInView={visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduce ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: reduce ? 0 : 0.12,
            }}
          >
            <Image
              src="/hobbies/gym.png"
              alt=""
              fill
              className="object-contain object-bottom object-right opacity-95 drop-shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
              sizes="(max-width: 640px) 38vw, 10rem"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
