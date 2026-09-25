export type ProjectId = 'production' | 'privacy' | 'multimedia' | 'cleanlisten' | 'data' | 'space'

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
  resume: './resume.pdf',
} as const

export const profile = {
  eyebrow: 'Software engineer / systems, data, and embedded software',
  lead: 'I build production tooling, data pipelines, system integrations, and embedded software.',
  note: 'Most of my work starts with a manual or fragile process and ends with something testable, repeatable, and easier to operate.',
  current: 'Software Engineering Co-op at Oakmont Industries Ltd. and AI Engineer / Data Scientist Co-op at Elections Canada. Computing Science at SFU.',
  focusAreas: [
    'Production systems',
    'Data engineering',
    'Systems integration',
    'Embedded systems',
  ],
} as const

export const projects: Project[] = [
  {
    id: 'production',
    tab: 'Release automation',
    label: '01 / Production systems',
    organization: 'ISED, Government of Canada',
    dates: 'Jan 2025 to Aug 2026',
    title: 'Production Release Automation',
    intro:
      'Release work spanned 50+ applications and 8+ environments across Java, Salesforce, cloud, and database systems.',
    details: [
      'Built Java and Python drift-detection tooling with GraphQL and Jenkins to compare configuration across 8+ environments and surface mismatches before production.',
      'Led production deployments for a $100M+ patent submission platform, coordinating AWS Cloud Ops, Salesforce, Java, and database teams through maintenance windows.',
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
    ownership: 'Drift detection, release automation, production verification',
    verification: 'Daily reports and release checks across 50+ applications',
  },
  {
    id: 'privacy',
    tab: 'Protected sharing',
    label: '02 / Browser privacy',
    organization: 'Independent project',
    dates: 'Sep 2026',
    title: 'ShareGuard',
    intro:
      'Screen sharing can expose credentials and payment details that the presenter still needs to see while working.',
    details: [
      'Built a Chrome Manifest V3 extension that keeps the host browser unchanged while rendering a separate audience view with selective masking for passwords, API tokens, payment-card numbers, and user-defined blackout regions.',
      'Implemented tab capture, DOM geometry scanning, Canvas-based redaction, fail-closed navigation recovery, protected recording, deterministic unit tests, and Chromium smoke tests without requiring a cloud backend.',
    ],
    proof: [
      { value: '3', label: 'automatic secret categories' },
      { value: 'LOCAL', label: 'processing model' },
    ],
    tools: ['JavaScript', 'Chrome MV3', 'Canvas', 'Playwright'],
    system: [
      { label: 'Browser tab', detail: 'Original host view' },
      { label: 'DOM scanner', detail: 'Visible sensitive regions' },
      { label: 'Detector', detail: 'High-confidence local rules' },
      { label: 'Protected canvas', detail: 'Audience-only redaction' },
    ],
    constraint: 'Hide sensitive content from viewers without changing the host view',
    ownership: 'Capture orchestration, detection, protected renderer, navigation recovery, and interface',
    verification: 'Unit tests and Chromium smoke tests for detection, rendering, and navigation',
    links: [{ label: 'View code', href: 'https://github.com/jumiknows/shareguard' }],
  },
  {
    id: 'multimedia',
    tab: 'Multimedia lab',
    label: '03 / Media algorithms',
    organization: 'Independent project inspired by SFU CMPT 365',
    dates: 'Sep 2026',
    title: 'Multimedia Systems Lab',
    intro:
      'Audio and image algorithms became much easier to understand once I could see each transform, test it, and compare the result.',
    details: [
      'Built a dependency-free Java 17 desktop suite that reads PCM WAV files, separates stereo channels, renders waveforms, and verifies a complete Huffman encode and decode cycle.',
      'Implemented YUV brightness and saturation controls, monochrome colour mapping, ordered and Floyd Steinberg dithering, block DCT compression, PSNR, and a radix-two FFT spectrum, backed by eight deterministic tests.',
    ],
    proof: [
      { value: '8', label: 'deterministic tests' },
      { value: '2', label: 'interactive media labs' },
    ],
    tools: ['Java 17', 'Swing', 'RIFF/WAV', 'DCT', 'FFT'],
    system: [
      { label: 'Media input', detail: 'PCM WAV and image files' },
      { label: 'Decode and transform', detail: 'RIFF, YUV, dithering' },
      { label: 'Compress and analyze', detail: 'Huffman, DCT, FFT' },
      { label: 'Verify', detail: 'Round trips, metrics, and visual demos' },
    ],
    constraint: 'Make low-level media algorithms visible without hiding them behind third-party libraries',
    ownership: 'WAV parsing, codecs, transforms, interface, tests, and documentation',
    verification: 'Eight deterministic tests plus generated visual demonstrations',
    links: [{ label: 'View code', href: 'https://github.com/jumiknows/multimedia-systems-lab' }],
  },
  {
    id: 'cleanlisten',
    tab: 'CleanListen',
    label: '04 / Applied machine learning',
    organization: 'Personal project',
    dates: '2025 to present',
    title: 'CleanListen',
    intro:
      'Academic PDFs contain headers, page numbers, citations, and navigation text that make text-to-speech difficult to follow.',
    details: [
      'Trained a Python and scikit-learn classifier to identify readable research content while removing repeated PDF page noise without summarizing or rewriting the source.',
      'Achieved 91.2% prototype accuracy and an 89.7% KEEP F1 score, then wrapped the classifier in a repeatable command-line workflow with Pytest coverage.',
    ],
    proof: [
      { value: '91.2%', label: 'prototype accuracy' },
      { value: '89.7%', label: 'KEEP F1 score' },
    ],
    tools: ['Python', 'scikit-learn', 'Pandas', 'Pytest'],
    system: [
      { label: 'PDF input', detail: 'Extracted document lines' },
      { label: 'Features', detail: 'TF-IDF text features' },
      { label: 'Classifier', detail: 'KEEP or DROP' },
      { label: 'Output', detail: 'Cleaner listening copy' },
    ],
    constraint: 'Remove page noise without changing the research',
    ownership: 'Training pipeline, classifier, CLI workflow, tests',
    verification: 'Prototype: 91.2% accuracy and 89.7% KEEP F1',
    links: [{ label: 'View code', href: 'https://github.com/jumiknows/CleanListen' }],
  },
  {
    id: 'data',
    tab: 'PDF to data',
    label: '05 / Data engineering',
    organization: 'Elections Canada, Government of Canada',
    dates: 'May 2026 to present',
    title: 'EAP Reporting Pipeline',
    intro:
      'Monthly reporting arrived as multi-page Tableau PDFs instead of structured exports required by Power BI.',
    details: [
      'Automated Tableau-to-Power BI reporting with Python by converting multi-page PDFs into normalized CSV datasets, replacing manual transcription and recovering metrics missed in earlier reports.',
      'Designed bilingual parsers for five dashboard sections with cross-year validation for decimals, missing fields, reporting periods, and zero-versus-null values.',
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
    constraint: 'Source reports are PDFs instead of structured exports',
    ownership: 'Parser architecture, validation, data model, reporting workflow',
    verification: 'Cross-year validation for missing fields, decimals, and zero-versus-null values',
  },
  {
    id: 'space',
    tab: 'Mission software',
    label: '06 / Embedded + mission',
    organization: 'UBC Orbit + SFU SAT',
    dates: 'Sep 2023 to Sep 2026',
    title: 'ALEASAT Mission Software',
    intro:
      'Spacecraft and high-altitude systems need telemetry and command software that remains useful when hardware is remote and recovery options are limited.',
    details: [
      'Built a React, AWS, and OpenShift spacecraft dashboard to visualize telemetry and run command workflows for ALEASAT, an ESA-supported CubeSat mission targeting a 2028 SpaceX launch.',
      'Led high-altitude balloon software through PDR, CDR, and flight-readiness review, integrating 10+ sensors with Python and Raspberry Pi for a flight reaching about 30 km.',
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
      { label: 'Mission software code', href: 'https://github.com/jumiknows/Aleasat-Mission-Software' },
      { label: 'Balloon4 flight computer', href: 'https://github.com/jumiknows/Balloon4-Flight-Computer' },
    ],
  },
]

export const otherProjects = [
  {
    title: 'Balloon4 Flight Computer',
    description: 'Raspberry Pi flight computer with fault-isolated sensor workers, health monitoring, reproducible telemetry, simulated hardware tests, and unattended boot.',
    href: 'https://github.com/jumiknows/Balloon4-Flight-Computer',
    action: 'View repository',
  },
  {
    title: 'Processor Pipeline Simulator',
    description: 'C++ processor pipeline simulation with hazard and dependency handling.',
    href: 'https://github.com/jumiknows/Processor-Pipeline-Simulator',
    action: 'View repository',
  },
  {
    title: 'SereniTea UX Prototype',
    description: "Ranked among the class's top three for design and presentation, using team research and usability testing to shape a peer-support experience.",
    href: 'https://www.figma.com/proto/HWzXdHgZrj34OYd2ZN5bR5/CMPT-363-Part-3-Vertical-Prototype-Group-34?node-id=2268-535&starting-point-node-id=2268%3A535&t=DknL9qwTm0QqbhWb-1',
    action: 'Open Figma prototype',
  },
  {
    title: 'PDF Audiobook',
    description: 'React and TypeScript listening app for research PDFs, built in 2025.',
    href: 'https://github.com/jumiknows/pdf-audiobook',
    action: 'View repository',
  },
  {
    title: 'SFU Satellite Website',
    description: 'React and TypeScript website for the satellite team, with handover documentation.',
    href: 'https://github.com/jumiknows/sfusat_website',
    action: 'View repository',
  },
] as const

export const about = {
  eyebrow: 'About',
  heading: 'I like work that has a real system on the other side of it.',
  emphasis: '',
  paragraphs: [
    'I have worked across government platforms, ERP integrations, reporting pipelines, research, and student spacecraft. The common thread is practical engineering: understand the system, find the failure points, build the smallest useful improvement, and verify it.',
    'I also teach. I have taught coding to middle school students, tutored computing science at SFU, and represented the Faculty of Applied Sciences as a student ambassador.',
  ],
  principles: [
    'Understand the system first',
    'Automate repeatable work',
    'Test edge cases',
    'Document what matters',
  ],
} as const

export const recognition = {
  eyebrow: 'Recognition',
  heading: 'Awards and recognition',
  items: [
    { title: 'CS Undergraduate Society Award', detail: 'One of five recipients selected annually for contributions at SFU' },
    { title: 'AI Hackathon Finalist', detail: 'Finalist for Most Impactful and Best Use of Google Gemini' },
    { title: 'Mayor of Richmond Recognition Award', detail: 'Recognized for community contributions' },
  ],
} as const

export const skills = {
  eyebrow: 'Technical skills',
  heading: 'Tools I use',
  groups: [
    { label: 'Languages', value: 'Python, Go, Java, C#, TypeScript, JavaScript, SQL, Bash' },
    { label: 'Data + APIs', value: 'GraphQL, REST, SOAP, JSON, XML, Denodo, Pandas, Power BI' },
    { label: 'Cloud + DevOps', value: 'AWS, Docker, Kubernetes, OpenShift, Jenkins, Bamboo, Bitbucket' },
    { label: 'Testing + Tools', value: 'Pytest, JUnit, Selenium, Cypress, Postman, Figma, Maven, Poetry' },
  ],
} as const

export const contact = {
  eyebrow: 'Contact',
  heading: 'Get in touch',
  description: 'I am always happy to talk about software, systems, projects, or opportunities.',
  coordinates: '49.2827° N / 123.1207° W',
} as const
