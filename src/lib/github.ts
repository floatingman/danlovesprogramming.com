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

interface PinnedQueryResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          primaryLanguage?: { name: string } | null;
          repositoryTopics?: { nodes: Array<{ topic: { name: string } }> } | null;
          isFork: boolean;
          isArchived: boolean;
        }>;
      } | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

// Pinned repos mirror the user's GitHub profile pins (order preserved, forks included).
// They are only available via the GraphQL API, never the REST /repos endpoint.
async function getPinnedRepos(username: string, count: number): Promise<Repo[]> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not set; pinned repos require it');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'danlovesprogramming.com-build',
    },
    body: JSON.stringify({
      query: `query($login: String!, $first: Int!) {
        user(login: $login) {
          pinnedItems(first: $first, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                primaryLanguage { name }
                repositoryTopics(first: 6) { nodes { topic { name } } }
                isFork
                isArchived
              }
            }
          }
        }
      }`,
      variables: { login: username, first: count },
    }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`);
  const json = (await res.json()) as PinnedQueryResponse;
  if (json.errors?.length) throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`);
  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.map((n) => ({
    name: n.name,
    description: n.description,
    html_url: n.url,
    stargazers_count: n.stargazerCount,
    language: n.primaryLanguage?.name ?? null,
    topics: (n.repositoryTopics?.nodes ?? []).map((t) => t.topic.name),
    fork: n.isFork,
    archived: n.isArchived,
  }));
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
    // Default mode (no manual curation): mirror the GitHub profile pins when set.
    if (featured.length === 0 && exclude.length === 0) {
      try {
        const pinned = await getPinnedRepos(username, count);
        if (pinned.length > 0) return pinned.slice(0, count);
        console.warn('[github] no pinned repos found; falling back to star sort.');
      } catch (err) {
        console.warn(`[github] pinned fetch failed; falling back to star sort. ${err}`);
      }
    }
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
