export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

export async function getTopRepos(
  username: string,
  count = 6,
  featured: string[] = [],
  exclude: string[] = [],
): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'danlovesprogramming.com-build',
  };
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100`,
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const repos = (await res.json()) as Repo[];
    const excluded = new Set(exclude.map((n) => n.toLowerCase()));
    const owned = repos.filter(
      (r) => !r.fork && !r.archived && !excluded.has(r.name.toLowerCase()),
    );
    if (featured.length > 0) {
      const wanted = new Set(featured.map((n) => n.toLowerCase()));
      const picked = new Set<string>();
      const featuredPicks = owned.filter((r) => {
        const name = r.name.toLowerCase();
        if (wanted.has(name) && !picked.has(name)) {
          picked.add(name);
          return true;
        }
        return false;
      });
      const rest = owned
        .filter((r) => !picked.has(r.name.toLowerCase()))
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
      return [...featuredPicks, ...rest].slice(0, count);
    }
    return owned.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, count);
  } catch (err) {
    console.warn(`[github] repo fetch failed; Projects section renders fallback. ${err}`);
    return [];
  }
}
