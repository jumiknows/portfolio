export const profile = {
  name: 'Ernest Wong',
  email: 'ernest_wong@sfu.ca',
  phone: '778-551-0906',
  location: 'Metro Vancouver, Canada',
  linkedin: 'https://linkedin.com/in/jumiknows/',
  github: 'https://github.com/jumiknows',
  resume: './resume.pdf',
};

export const focusAreas = [
  {
    title: 'Platform Engineering',
    description:
      'CI/CD automation, release workflows, infrastructure consistency, and internal tools that help teams ship reliably.',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'AWS, Docker, Kubernetes, OpenShift, Jenkins, Bamboo, deployment coordination, and production support.',
  },
  {
    title: 'Mission Software',
    description:
      'Telemetry dashboards, command workflows, embedded systems, Raspberry Pi sensor integration, and aerospace-adjacent software.',
  },
  {
    title: 'AI Security',
    description:
      'Privacy-aware ML tooling, PII removal, and research into security risks in AI systems.',
  },
] as const;

export const experience = [
  {
    role: 'Software Engineer Intern',
    organization: 'ISED · Government of Canada',
    period: 'Jan 2025 – Present',
    tags: ['DevOps', 'Cloud', 'Automation', 'Enterprise Systems'],
    bullets: [
      'Led production deployments for a $100M+ patent submission portal by coordinating AWS Cloud Ops, Salesforce, Java, and infrastructure teams during maintenance windows.',
      'Built Java drift detection tools using GraphQL APIs to monitor configuration consistency across 8+ environments with Jenkins reports and mismatch alerts.',
      'Developed Python and Selenium release automation tools to standardize CI/CD setup across Bitbucket, Bamboo, Nexus, and IBM WebSphere for 50+ applications.',
      'Resolved UI/UX and API defects in Salesforce Lightning components affecting bilingual, high-volume online patent filings.',
      'Co-designed an EDI learning tool in under 6 hours, earning finalist honors for Most Impactful and Best Use of Google Gemini at Canada’s largest AI hackathon.',
    ],
  },
  {
    role: 'Mission Operations Developer · Embedded Systems Lead',
    organization: 'UBC Orbit · SFU SAT Engineering Design Team',
    period: 'Sept 2023 – Present',
    tags: ['Aerospace', 'Telemetry', 'React', 'Embedded Systems'],
    bullets: [
      'Built mission operations software for ALEASAT, including telemetry visualization and command workflow support for a student satellite mission.',
      'Developed Python scripts integrating GPS, cameras, transmitters, and 10+ sensors with a Raspberry Pi for high-altitude balloon missions.',
      'Supported design milestones from Preliminary Design Review to Flight Readiness Review for a balloon system reaching about 30 km altitude.',
      'Migrated outreach websites from Squarespace to GitHub Pages and React, reducing recurring hosting costs.',
    ],
  },
  {
    role: 'Research Assistant in AI Cybersecurity',
    organization: 'Simon Fraser University',
    period: 'May 2024 – Aug 2024',
    tags: ['AI Security', 'Python', 'Privacy', 'ML'],
    bullets: [
      'Developed a Python machine learning tool to remove personal information from AI model outputs, achieving F1 greater than 80% on evaluation datasets.',
      'Used Tensor Trust to demonstrate AI security risks involving unauthorized access to sensitive data.',
    ],
  },
] as const;

export const projects = [
  {
    title: 'Mission Operations Dashboard',
    label: 'Aerospace Software',
    description:
      'A mission software dashboard for telemetry visibility, mission state awareness, and command workflow support for a student satellite mission.',
    challenge: 'Mission operators need fast situational awareness during high-pressure mission windows.',
    build: 'Built a telemetry and command-support interface to surface critical state and reduce operator friction.',
    impact: 'Improved mission visibility for student operators and aligned workflows with real operations constraints.',
    stack: ['React', 'TypeScript', 'AWS', 'OpenShift API', 'Telemetry'],
    link: 'https://github.com/jumiknows',
  },
  {
    title: 'Infrastructure Drift Detection',
    label: 'Platform Tooling',
    description:
      'A Java and GraphQL tool that compares configuration consistency across enterprise environments and publishes daily Jenkins health reports.',
    challenge: 'Configuration drift across multiple environments caused release risk and manual verification overhead.',
    build: 'Developed Java + GraphQL checks with Jenkins reporting and mismatch alerts for daily visibility.',
    impact: 'Helped teams track consistency across 8+ environments and catch drift before release windows.',
    stack: ['Java', 'GraphQL', 'Jenkins', 'Enterprise DevOps'],
    link: 'https://github.com/jumiknows',
  },
  {
    title: 'Release Automation Toolkit',
    label: 'DevOps Automation',
    description:
      'Python and Selenium automation for standardizing release setup across Bitbucket, Bamboo, Nexus, and IBM WebSphere applications.',
    challenge: 'Release setup repeated similar manual steps across many enterprise applications.',
    build: 'Created Python/Selenium automation to standardize setup and reduce repeated release prep tasks.',
    impact: 'Supported consistent CI/CD onboarding across 50+ applications and improved release reliability.',
    stack: ['Python', 'Selenium', 'Bamboo', 'Nexus', 'WebSphere'],
    link: 'https://github.com/jumiknows',
  },
  {
    title: 'AI Privacy Research Tool',
    label: 'AI Security',
    description:
      'A machine learning tool focused on identifying and removing personal information from AI model outputs.',
    challenge: 'LLM outputs can leak sensitive personal information without strong filtering controls.',
    build: 'Designed a Python ML pipeline to detect and redact PII from generated outputs.',
    impact: 'Reached F1 > 80% on evaluation datasets and demonstrated practical AI safety risk reduction.',
    stack: ['Python', 'Machine Learning', 'Privacy', 'AI Security'],
    link: 'https://github.com/jumiknows',
  },
] as const;

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'HTML', 'CSS'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'OpenShift', 'Jenkins', 'Bamboo', 'Bitbucket', 'Nexus'],
  },
  {
    category: 'Backend & APIs',
    items: ['GraphQL', 'REST', 'SOAP', 'PostgreSQL', 'Node.js', 'Prisma', 'Swagger'],
  },
  {
    category: 'Testing',
    items: ['Cypress', 'Pytest', 'JUnit', 'Postman', 'SoapUI', 'Code Review'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Figma', 'UI/UX', 'Salesforce Lightning'],
  },
] as const;
