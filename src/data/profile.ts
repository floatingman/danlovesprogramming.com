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
}

// SYNC WITH LINKEDIN: edit this object when your LinkedIn profile changes.
export const profile: Profile = {
  name: 'Daniel Newman',
  headline: 'GitOps loop verified: push, CI, cluster, live',
  location: 'Nashville, TN',
  summary: '', // TODO(user): 2-3 sentence bio from LinkedIn
  linkedinUrl: '', // TODO(user): LinkedIn vanity URL
  githubUsername: 'floatingman',
  skills: [], // TODO(user): skills list
  experience: [], // TODO(user): roles, newest first
};
