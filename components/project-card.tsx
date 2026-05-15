"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";
import {
  reducedOrSpring,
  springHoverLift,
  springRevealSoft,
  viewportRevealLoose,
} from "@/lib/motion";
import { uiCardInteractive } from "@/lib/ui-classes";

type ProjectCardProps = {
  repo: GitHubRepo;
  index: number;
};

export function ProjectCard({ repo, index }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const desc =
    repo.description?.trim() ||
    "Open repository - see README on GitHub for details.";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportRevealLoose}
      transition={reducedOrSpring(reduce, springRevealSoft, index * 0.05)}
      whileHover={
        reduce ? undefined : { y: -5, transition: springHoverLift }
      }
      className={`group flex h-full flex-col p-6 ${uiCardInteractive}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[var(--ink)] underline-offset-4 group-hover:text-[var(--accent)] group-hover:underline">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            {repo.name.replace(/-/g, " ")}
          </a>
        </h3>
        {repo.fork && (
          <span className="shrink-0 rounded-md border border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[var(--bg)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            Fork
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed tracking-tight text-[var(--muted)]">
        {desc}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-[var(--muted)]">
        {repo.language && (
          <span className="rounded-md bg-[var(--surface-muted)] px-2 py-1 font-semibold text-[var(--ink)]">
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-md border border-[color-mix(in_srgb,var(--border)_45%,transparent)] px-2 py-1 font-medium"
          >
            {t}
          </span>
        ))}
        <span className="ml-auto tabular-nums opacity-80">
          ★ {repo.stargazers_count}
        </span>
      </div>
    </motion.article>
  );
}
