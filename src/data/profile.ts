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
  linkedinUrl: 'https://www.linkedin.com/in/danielnewman/',
  githubUsername: 'floatingman',
  skills: [
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Go',
    'Docker',
    'Kubernetes',
    'Ansible',
    'Flux',
    'GitHub Actions',
    'AWS',
    'Linux',
    'Proxmox',
  ],
  experience: [
    {
      company: 'SUSE',
      role: 'Software Engineer', // unverified — confirm role title
      start: '2025', // unverified — confirm start year
      end: null,
      summary: '',
    },
    {
      company: 'Big Hearted Labs',
      role: 'Software Engineer', // unverified — confirm role title
      start: '2016', // unverified — confirm start year
      end: '2025', // unverified — confirm end year
      summary: 'My software consultancy.',
    },
  ],
  featuredRepos: [],
  excludeRepos: [],
};
