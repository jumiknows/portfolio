export type FolderKey = 'home' | 'work' | 'builds' | 'space' | 'people' | 'misc';

export const profile = {
  name: 'Ernest Wong',
  email: 'ernest_wong@sfu.ca',
  github: 'https://github.com/jumiknows',
  linkedin: 'https://linkedin.com/in/jumiknows/',
  resume: './resume.pdf',
};

export const folders: { key: FolderKey; label: string; hint: string; tone: string }[] = [
  { key: 'work', label: 'work', hint: 'production systems', tone: 'blue' },
  { key: 'builds', label: 'builds', hint: 'things I made', tone: 'orange' },
  { key: 'space', label: 'space', hint: 'satellites + balloons', tone: 'purple' },
  { key: 'people', label: 'people', hint: 'community + leadership', tone: 'green' },
  { key: 'misc', label: 'misc', hint: 'the human stuff', tone: 'pink' },
];

export const work = [
  {
    organization: 'ISED · Government of Canada',
    role: 'Software Engineer Intern',
    period: 'Jan 2025 — Present',
    blurb: 'Production engineering across releases, environment health, CI/CD automation, and debugging when the obvious answer is wrong.',
    evidence: ['$100M+ production platform', '8+ environments', '50+ apps automated'],
    stack: ['Java', 'Python', 'GraphQL', 'Jenkins', 'AWS'],
  },
  {
    organization: 'Elections Canada',
    role: 'Data Analyst Co-op',
    period: 'May 2026 — Present',
    blurb: 'Turning recurring reports and messy operational data into maintainable, validated datasets people can actually use.',
    evidence: ['PDF → structured data', 'Denodo VQL + SQL', 'cross-system QA'],
    stack: ['Python', 'SQL', 'Denodo', 'Power BI'],
  },
];

export const builds = [
  {
    name: 'CleanListen',
    extension: '.ml',
    href: 'https://github.com/jumiknows/CleanListen',
    blurb: 'Cleans research PDFs for screen readers and text-to-speech without summarizing away the paper.',
    evidence: ['91.2% accuracy', '89.7% KEEP F1', '94.0% specificity'],
    stack: ['Python', 'scikit-learn', 'Pandas'],
  },
  {
    name: 'ALEASAT',
    extension: '.mission',
    href: 'https://github.com/jumiknows/AleasatV2',
    blurb: 'Telemetry and command software designed around actual spacecraft operations and mission constraints.',
    evidence: ['ESA mission', '2028 launch target', 'telemetry + commands'],
    stack: ['React', 'TypeScript', 'AWS', 'OpenShift'],
  },
  {
    name: 'SFU SAT Web',
    extension: '.site',
    href: 'https://github.com/jumiknows/sfusat_website',
    blurb: 'Rebuilt the team’s public web presence and removed recurring hosting cost.',
    evidence: ['$200 → $0 / year', 'GitHub Pages'],
    stack: ['React', 'TypeScript'],
  },
];

export const people = [
  ['AI Coffee Chats', 'Created recurring AI learning sessions that reached 300+ attendees across ISED.'],
  ['SFU Student Ambassador', 'Presented to 100+ prospective students and helped make computing feel more approachable.'],
  ['Peer Tutor', 'Automated 200 personalized mentoring emails and supported students one-on-one.'],
];
