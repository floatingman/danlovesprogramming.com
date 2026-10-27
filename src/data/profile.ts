export interface ExperienceEntry {
  company: string;
  role: string;
  start: string; // e.g. "2022"
  end: string | null; // null = present
  summary: string;
  highlights?: string[]; // optional bullet points, rendered as a list
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
      company: 'SUSE', // full-time, remote — from LinkedIn
      role: 'Software Engineer', // unverified — LinkedIn entry omits exact title; confirm
      start: 'Jan 2022',
      end: null,
      summary: 'Advancing software quality assurance through innovative CI/CD solutions and automation.',
      highlights: [
        'Developed air-gapped CI/CD infrastructure for Rancher Manager and RKE2 on AWS, facilitating seamless deployments.',
        'Authored 100+ Jenkins pipelines, standardizing processes and enhancing efficiency across staging and release branches.',
        'Improved release reliability by extending Kubernetes e2e validation across multiple Rancher repositories, addressing flaky tests.',
      ],
    },
  ],
  featuredRepos: [],
  excludeRepos: [],
};
