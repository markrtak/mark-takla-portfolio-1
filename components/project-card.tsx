"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";

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
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: reduce ? 0 : 0.45,
        delay: reduce ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduce
          ? undefined
          : { y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
      }
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug text-[var(--ink)] underline-offset-4 group-hover:text-[var(--accent)] group-hover:underline">
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
          <span className="shrink-0 rounded-md bg-[var(--bg)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
            Fork
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {desc}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        {repo.language && (
          <span className="rounded-md bg-[var(--bg)] px-2 py-1 font-medium text-[var(--ink)]">
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md border border-[var(--border)] px-2 py-1">
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
