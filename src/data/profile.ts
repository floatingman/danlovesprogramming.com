export interface ExperienceEntry {
  company: string;
  role: string;
  start: string; // e.g. "2022"
  end: string | null; // null = present
  summary: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  summary: string;
  linkedinUrl: string;
  githubUsername: string;
  skills: string[];
  experience: ExperienceEntry[];
  // Repo curation: featuredRepos = pinned picks (order preserved, topped up to 6 by stars);
  // excludeRepos = hidden from auto-selection. Both empty = default top-6-by-stars.
  featuredRepos: string[];
  excludeRepos: string[];
}

// SYNC WITH LINKEDIN: edit this object when your LinkedIn profile changes.
export const profile: Profile = {
  name: 'Daniel Newman',
  headline: 'I make stuff, sometimes with a computer',
  location: 'Nashville, TN',
  summary: '', // empty = auto-hidden; add a 2-3 sentence bio here when ready
  linkedinUrl: 'https://www.linkedin.com/in/danlovesprogramming', // guessed vanity URL — verify it resolves
  githubUsername: 'floatingman',
  skills: [
    'Astro',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Go',
    'React',
    'Docker',
    'Kubernetes',
    'Flux',
    'GitHub Actions',
    'AWS',
    'Linux',
    'Proxmox',
  ],
  experience: [
    {
      company: 'Big Hearted Labs', // verified from GitHub profile
      role: 'Software Engineer', // neutral placeholder — refine from LinkedIn
      start: '2016', // unverified — confirm with user before ship
      end: null,
      summary: 'Building software for Big Hearted Labs.',
    },
  ],
  featuredRepos: [],
  excludeRepos: [],
};
