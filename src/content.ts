export type ProjectId = 'production' | 'data' | 'space'

export interface Link {
  label: string
  href: string
}

export interface Project {
  id: ProjectId
  tab: string
  label: string
  organization: string
  dates: string
  title: string
  intro: string
  details: string[]
  proof: Array<{ value: string; label: string }>
  tools: string[]
  system: Array<{ label: string; detail: string }>
  constraint: string
  ownership: string
  verification: string
  links?: Link[]
}

export const links = {
  email: 'mailto:ernest_wong@sfu.ca',
  github: 'https://github.com/jumiknows',
  linkedin: 'https://www.linkedin.com/in/jumiknows/',
  resume: './resume.html',
} as const

export const profile = {
  eyebrow: 'Software engineer / systems + data + mission software',
  lead: 'I build software that connects messy real-world systems: production platforms, data pipelines, ERP integrations, and hardware in the field.',
  note: 'I like turning manual, fragile work into systems that are easier to operate, easier to verify, and easier for the next person to understand.',
  current: 'Building ERP integration software at Oakmont Industrial and data automation at Elections Canada while finishing Computer Science at SFU.',
  focusAreas: [
    'Production systems',
    'Data + automation',
    'Systems integration',
    'Embedded + mission',
  ],
} as const

export const projects: Project[] = [
  {
    id: 'production',
    tab: 'Release day',
    label: '01 / Production systems',
    organization: 'ISED, Government of Canada',
    dates: 'Jan 2025 to Aug 2026',
    title: 'I made release day less dependent on memory.',
    intro:
      'The patent submission platform spanned more than 50 applications and eight environments. A quiet configuration mismatch could turn a maintenance window into a long night.',
    details: [
      'Built Java and Python tooling with GraphQL to compare environment configuration and surface drift before it reached production.',
      'Moved repeat checks into Jenkins and coordinated application, cloud, Salesforce, and database teams during production deployments.',
    ],
    proof: [
      { value: '8+', label: 'environments compared' },
      { value: '50+', label: 'applications supported' },
    ],
    tools: ['Java', 'Python', 'GraphQL', 'Jenkins', 'AWS'],
    system: [
      { label: 'Environment state', detail: 'Application + configuration data' },
      { label: 'Comparison layer', detail: 'Java, Python + GraphQL' },
      { label: 'CI checks', detail: 'Jenkins reports + alerts' },
      { label: 'Release review', detail: 'Evidence before production' },
    ],
    constraint: 'Configuration drift across 8+ environments',
    ownership: 'Comparison tooling, automated checks, release verification',
    verification: 'Daily reports and production release checks across 50+ applications',
  },
  {
    id: 'data',
    tab: 'PDF to data',
    label: '02 / Data automation',
    organization: 'Elections Canada, Government of Canada',
    dates: 'May 2026 to present',
    title: 'I turned reporting PDFs back into usable data.',
    intro:
      'Monthly reporting arrived as multi-page Tableau PDFs. Updating Power BI meant manually finding values, retyping them, and hoping every reporting year behaved like the last.',
    details: [
      'Built a Python pipeline that converts multi-page Tableau PDFs into normalized, Power BI ready CSVs while recovering metrics missed in earlier reports.',
      'Split extraction into bilingual parsers and added validation for decimals, missing fields, reporting years, and zero-versus-null values.',
    ],
    proof: [
      { value: '5', label: 'dashboard sections parsed' },
      { value: 'EN/FR', label: 'bilingual parsing' },
    ],
    tools: ['Python', 'Pandas', 'Power BI', 'Denodo', 'SQL'],
    system: [
      { label: 'Tableau reports', detail: 'Multi-page PDF inputs' },
      { label: 'Parser layer', detail: 'Bilingual Python extractors' },
      { label: 'Validation', detail: 'Schema + value checks' },
      { label: 'Reporting', detail: 'Normalized CSVs + Power BI' },
    ],
    constraint: 'Source reports are PDFs, not structured exports',
    ownership: 'Parser architecture, validation, data model, reporting workflow',
    verification: 'Cross-year checks for missing fields, decimals, and zero-versus-null values',
  },
  {
    id: 'space',
    tab: '30 km up',
    label: '03 / Mission software',
    organization: 'UBC Orbit + SFU SAT',
    dates: 'Sep 2023 to Aug 2026',
    title: 'At 30 km, we could not walk over and restart it.',
    intro:
      'That changed how I thought about telemetry, power, error handling, and every assumption hidden inside a diagram.',
    details: [
      'Built the ALEASAT spacecraft dashboard with React, AWS, and OpenShift APIs to visualize telemetry and support command workflows for an ESA-supported CubeSat mission.',
      'Led software for a high-altitude balloon, integrating more than ten sensors through design reviews, ground testing, and flight.',
    ],
    proof: [
      { value: '10+', label: 'sensors integrated' },
      { value: '~30 km', label: 'balloon altitude' },
    ],
    tools: ['Python', 'React', 'Raspberry Pi', 'AWS', 'OpenShift'],
    system: [
      { label: 'Sensors', detail: '10+ flight inputs' },
      { label: 'Onboard compute', detail: 'Raspberry Pi + Python' },
      { label: 'Radio + APIs', detail: 'Telemetry + commands' },
      { label: 'Ground tools', detail: 'React + cloud services' },
    ],
    constraint: 'Limited access, power, bandwidth, and recovery',
    ownership: 'Telemetry, command workflows, sensor integration',
    verification: 'Design reviews, ground tests, and balloon flight near 30 km',
    links: [
      { label: 'ALEASAT', href: 'https://www.aleasat.space/' },
      { label: 'SFU SAT', href: 'https://sfusat.org/' },
    ],
  },
]

export const about = {
  eyebrow: '04 / Beyond the work',
  heading: 'I’m usually the person who asks,',
  emphasis: '“does this need to be done by hand?”',
  paragraphs: [
    'I ask that question in production systems, ERP workflows, data reporting, student teams, research projects, and classrooms. Sometimes the answer is a small tool. Sometimes it is a clearer process. Either way, I start by understanding the people and systems already doing the work.',
    'I also enjoy teaching. I have taught coding to middle school students, tutored computing science at SFU, and represented the Faculty of Applied Sciences as a student ambassador.',
  ],
  principles: [
    'Listen before building',
    'Make the process clearer',
    'Test the boring cases',
    'Write down what worked',
  ],
} as const

export const recognition = {
  eyebrow: 'Recognition',
  heading: 'A few things I’m proud of.',
  items: [
    { title: 'CS Undergraduate Society Award', detail: 'One of five recipients selected annually for contributions at SFU' },
    { title: 'AI Hackathon Finalist', detail: 'Finalist for Most Impactful and Best Use of Google Gemini' },
    { title: 'Mayor of Richmond Recognition Award', detail: 'Recognized for community contributions' },
  ],
} as const

export const skills = {
  eyebrow: 'Technical skills',
  heading: 'What I work with',
  groups: [
    { label: 'Build', value: 'Python, Go, Java, TypeScript, JavaScript, SQL, Bash' },
    { label: 'Connect', value: 'GraphQL, REST, SOAP, JSON, XML, Denodo, Pandas' },
    { label: 'Ship', value: 'AWS, Docker, Kubernetes, OpenShift, Jenkins, Bamboo' },
    { label: 'Check', value: 'Pytest, JUnit, Selenium, Cypress, Postman, Power BI' },
  ],
} as const

export const contact = {
  eyebrow: 'Get in touch',
  heading: 'Want to compare notes?',
  description: 'If you are building something useful, solving a technical problem, or simply want to say hello, I would be happy to hear from you.',
  coordinates: '49.2827° N / 123.1207° W',
} as const
