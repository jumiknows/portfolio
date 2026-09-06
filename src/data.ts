export type Project = {
  id: 'production' | 'cleanlisten' | 'space'
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
  links?: Array<{ label: string; href: string }>
}

export const projects: Project[] = [
  {
    id: 'production',
    tab: 'Release day',
    label: '01 / Production systems',
    organization: 'ISED, Government of Canada',
    dates: 'Jan 2025 to Aug 2026',
    title: 'I made release day less dependent on memory.',
    intro:
      'The patent platform spanned more than 50 applications and eight environments. One quiet configuration mismatch could turn a maintenance window into a scavenger hunt.',
    details: [
      'Built Java and Python tools that compared environments and turned configuration drift into a report the team could act on.',
      'Moved repeat checks into Jenkins, then helped application, cloud, database, and Salesforce teams verify production changes.',
    ],
    proof: [
      { value: '8+', label: 'environments compared' },
      { value: '50+', label: 'applications supported' },
    ],
    tools: ['Java', 'Python', 'GraphQL', 'Jenkins', 'AWS'],
    system: [
      { label: 'Environment data', detail: 'Application + configuration state' },
      { label: 'Comparison layer', detail: 'Java, Python + GraphQL' },
      { label: 'CI gate', detail: 'Jenkins checks + reports' },
      { label: 'Release review', detail: 'Evidence before production' },
    ],
    constraint: 'Configuration drift across 8+ environments',
    ownership: 'Comparison tooling, automated checks, release verification',
    verification: 'Reports reviewed across 50+ applications',
  },
  {
    id: 'cleanlisten',
    tab: 'CleanListen',
    label: '02 / Applied machine learning',
    organization: 'Independent project',
    dates: '2026',
    title: 'Academic PDFs are awful to listen to. I wanted to fix that.',
    intro:
      'Screen readers often read every header, page number, citation, and navigation label before they get back to the research.',
    details: [
      'Trained a classifier to keep useful lines and remove page furniture without summarizing or rewriting the paper.',
      'Wrapped the model in a tested command line workflow so the result could be inspected, repeated, and improved.',
    ],
    proof: [
      { value: '91.2%', label: 'prototype accuracy' },
      { value: '89.7%', label: 'KEEP F1 score' },
    ],
    tools: ['Python', 'scikit-learn', 'Pandas', 'Pytest'],
    system: [
      { label: 'PDF lines', detail: 'Raw extracted text' },
      { label: 'Feature pipeline', detail: 'Text + layout signals' },
      { label: 'Classifier', detail: 'KEEP or DROP' },
      { label: 'Listening copy', detail: 'Research preserved' },
    ],
    constraint: 'Remove page noise without rewriting the research',
    ownership: 'Training pipeline, command-line workflow, tests',
    verification: '91.2% accuracy and 89.7% KEEP F1',
    links: [{ label: 'View the code', href: 'https://github.com/jumiknows/CleanListen' }],
  },
  {
    id: 'space',
    tab: '30 km up',
    label: '03 / Mission software',
    organization: 'UBC Orbit and SFU SAT',
    dates: 'Sep 2023 to present',
    title: 'At 30 km, we could not walk over and restart it.',
    intro:
      'That changed how I thought about telemetry, power, error handling, and every assumption hidden inside a diagram.',
    details: [
      'Built telemetry and command workflows for ALEASAT, a joint SFU and UBC Earth observation CubeSat supported by ESA Fly Your Satellite!',
      'Led software for a high altitude balloon, integrating more than ten sensors through design reviews, testing, and flight.',
    ],
    proof: [
      { value: '10+', label: 'sensors integrated' },
      { value: '~30 km', label: 'balloon altitude' },
    ],
    tools: ['Python', 'React', 'Raspberry Pi', 'AWS', 'Radio'],
    system: [
      { label: 'Sensors', detail: '10+ flight inputs' },
      { label: 'Onboard compute', detail: 'Raspberry Pi + Python' },
      { label: 'Radio link', detail: 'Telemetry + commands' },
      { label: 'Ground tools', detail: 'React + cloud services' },
    ],
    constraint: 'Limited access, power, bandwidth, and recovery',
    ownership: 'Telemetry, command workflows, sensor integration',
    verification: 'Design reviews, ground tests, balloon flight near 30 km',
    links: [
      { label: 'ALEASAT', href: 'https://www.aleasat.space/' },
      { label: 'SFU SAT', href: 'https://sfusat.org/' },
    ],
  },
]

export const skillGroups = [
  { label: 'Build', value: 'Python, Java, TypeScript, JavaScript, SQL, Bash' },
  { label: 'Connect', value: 'GraphQL, REST, SOAP, Denodo, Power BI, Pandas' },
  { label: 'Ship', value: 'AWS, Docker, Kubernetes, OpenShift, Jenkins, Bamboo' },
  { label: 'Check', value: 'Pytest, JUnit, Selenium, Cypress, Postman' },
]
