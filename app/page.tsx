import { AboutSection } from "@/components/about-section";
import { ExperienceEducationSection } from "@/components/experience-education-section";
import { HobbiesSection } from "@/components/hobbies-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { VolunteeringSection } from "@/components/volunteering-section";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { getPublicRepos, type GitHubRepo } from "@/lib/github";
import { SITE } from "@/lib/site";

/** Always fetch GitHub repos at request time so exclusions stay in sync after deploys. */
export const dynamic = "force-dynamic";

export default async function Home() {
  let repos: GitHubRepo[] = [];
  try {
    repos = await getPublicRepos(SITE.githubUsername);
  } catch {
    repos = [];
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <HobbiesSection />
        <ProjectsSection repos={repos} />
        <ExperienceEducationSection />
        <VolunteeringSection />
      </main>
      <SiteFooter />
    </>
  );
}
