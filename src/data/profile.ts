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
  // Repo curation (site-level override): featuredRepos = picks (order preserved, topped up
  // by stars); excludeRepos = hidden from auto-selection; exclude always wins over featured.
  // Both empty = mirror GitHub profile pins, falling back to top-6-by-stars if none set.
  featuredRepos: string[];
  excludeRepos: string[];
}

// SYNC WITH LINKEDIN: edit this object when your LinkedIn profile changes.
export const profile: Profile = {
  name: 'Daniel Newman',
  headline: 'I make stuff, sometimes with a computer',
  location: 'Nashville, TN',
  summary: 'I help enterprise engineering teams remove CI/CD as the bottleneck and ship faster, more reliably. 10+ years building automation and test infrastructure at SUSE, Equinox Media, and XOi Technologies: air-gapped CI/CD on AWS, 100+ Jenkins pipelines, and Kubernetes/Rancher test automation. From Jenkins cleanup to multi-cloud pipelines across AWS, GCP, and Azure.',
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
      role: 'Senior Software Quality Assurance Engineer', // from LinkedIn Positions
      start: 'Jan 2022',
      end: null,
      summary: 'Advancing software quality assurance through innovative CI/CD solutions and automation.',
      highlights: [
        'Developed air-gapped CI/CD infrastructure for Rancher Manager and RKE2 on AWS, facilitating seamless deployments.',
        'Authored 100+ Jenkins pipelines, standardizing processes and enhancing efficiency across staging and release branches.',
        'Improved release reliability by extending Kubernetes e2e validation across multiple Rancher repositories, addressing flaky tests.',
      ],
    },
    {
      company: 'Equinox Media',
      role: 'Test Lead',
      start: 'Apr 2021',
      end: 'Aug 2021',
      summary: 'Supervised overall system testing and AWS infrastructure monitoring with New Relic and Terraform, driving test strategy and implementation for logistics programs built on Shopify and Zuora.',
      highlights: [
        'Boosted API automation testing by 100% through increased output and strong team management of test engineers.',
        'Enhanced regular testing by integrating automated test suites and communicating results with the Newman NodeJS library.',
      ],
    },
    {
      company: 'XOi Technologies',
      role: 'Automation Engineer',
      start: 'Feb 2020',
      end: 'Mar 2021',
      summary: 'Led system automation while supervising and training developers and QA teams, raising the test automation rate by 100% through an improved framework built on Webdriver.io (NodeJS), Cucumber, Selenium, and Appium.',
      highlights: [
        'Secured 100% testing frequency through excellent development of Jenkins build pipelines.',
        'Increased automated functional testing and reduced regressions by catching bugs before they reached production.',
      ],
    },
  ],
  featuredRepos: [],
  excludeRepos: [],
};
