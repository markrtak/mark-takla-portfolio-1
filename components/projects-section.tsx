import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import type { GitHubRepo } from "@/lib/github";
import { SITE } from "@/lib/site";
import {
  uiDisplayHeading,
  uiEyebrowAccent,
  uiLead,
  uiSectionDivider,
  uiSectionScrollMargin,
} from "@/lib/ui-classes";

const allReposUrl = `${SITE.github}?tab=repositories`;

type ProjectsSectionProps = {
  repos: GitHubRepo[];
};

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className={`${uiSectionScrollMargin} ${uiSectionDivider} bg-[var(--surface-muted)] px-4 py-20 sm:px-6`}
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className={uiEyebrowAccent}>Portfolio</p>
          <h2 className={`mt-2 ${uiDisplayHeading}`}>GitHub projects</h2>
          <p className={uiLead}>
            And this website you are viewing! Created with Next.js, TypeScript,
            Tailwind CSS, and Framer Motion, then deployed and hosted on Vercel.{" "}
            <Link
              href={allReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              View the full list of projects on GitHub
            </Link>
            .
          </p>
        </FadeIn>

        {repos.length === 0 ? (
          <FadeIn
            delay={0.1}
            className="mt-12 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--border)_48%,transparent)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow-card)] ring-1 ring-[color-mix(in_srgb,var(--ink)_3%,transparent)] text-[var(--muted)]"
          >
            Could not load repositories. Try again later or{" "}
            <Link
              href={allReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              browse all projects on GitHub
            </Link>
            .
          </FadeIn>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
