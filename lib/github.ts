export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  private: boolean;
};

function isExcluded(repo: GitHubRepo): boolean {
  const name = repo.name.toLowerCase();
  const full = repo.full_name.toLowerCase();
  if (name === "csguc" || full.includes("/csguc")) return true;
  if (name === "newco" || full.endsWith("/newco")) return true;
  if (name.includes("fawry") && name.includes("challenge")) return true;
  if (full.includes("fawry") && full.includes("challenge")) return true;
  return false;
}

export async function getPublicRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "markrtak-portfolio-site",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = (await res.json()) as GitHubRepo[];

  return data
    .filter((r) => !r.private)
    .filter((r) => !isExcluded(r))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    );
}
