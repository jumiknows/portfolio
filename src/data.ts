export type ChapterId = 'index' | 'work' | 'lab' | 'space' | 'people'

export type ChapterMeta = {
  id: ChapterId
  number: string
  label: string
  short: string
  color: string
  code: string
}

export const chapters: ChapterMeta[] = [
  { id: 'index', number: '00', label: 'INDEX', short: 'Home', color: '#7a648e', code: '00 / INDEX' },
  { id: 'work', number: '01', label: 'WORK', short: 'Work', color: '#37755b', code: '01 / WORK' },
  { id: 'lab', number: '02', label: 'LAB', short: 'Lab', color: '#b35b4c', code: '02 / LAB' },
  { id: 'space', number: '03', label: 'SPACE', short: 'Space', color: '#4d638b', code: '03 / SPACE' },
  { id: 'people', number: '04', label: 'PEOPLE', short: 'People', color: '#b66f3e', code: '04 / PEOPLE' },
]

export const chapterDetails: Record<ChapterId, { title: string; body: string[]; bullets: string[] }> = {
  index: {
    title: 'What this portfolio is trying to prove',
    body: [
      'I like software that has to survive real constraints: production releases, messy data, hardware, mission deadlines, and human coordination.',
      'Instead of listing everything by date, I grouped the work into case files I can explain on a whiteboard.'
    ],
    bullets: ['$100M+ production platform', '50+ applications automated', '8+ environments compared', '300+ AI community attendees']
  },
  work: {
    title: 'Production engineering case file',
    body: [
      'At ISED, healthy releases could be validated in roughly 15 to 30 minutes. The hard releases were the ones where a 404 or 500 could come from application code, configuration, database state, internal services, or environment drift.',
      'I built tooling that turned part of that ambiguity into evidence: compare against known-good environments, surface mismatches, and make daily health checks repeatable.'
    ],
    bullets: ['Java + GraphQL configuration drift tooling', 'Python + Selenium release automation', 'Jenkins health reporting', 'AWS, Salesforce, WebSphere release coordination']
  },
  lab: {
    title: 'CleanListen case file',
    body: [
      'CleanListen treats noisy academic PDF extraction as a line-level classification problem. The goal is not to summarize the paper, but to preserve research content while removing navigation, headers, references, page furniture, and other TTS-hostile noise.',
      'The public repository now includes a CLI, grouped benchmarking, tests, CI, and reproducible model metadata.'
    ],
    bullets: ['91.2% prototype accuracy', '89.7% KEEP F1', '94.0% specificity', 'Python + scikit-learn + Pandas']
  },
  space: {
    title: 'Mission software case file',
    body: [
      'My space work spans mission operations software and embedded systems. I helped build ALEASAT telemetry and command workflows, and led a high-altitude balloon design cycle through PDR, CDR, and FRR.',
      'The part I like most is that software decisions eventually meet physical reality: radios, sensors, power, altitude, packet loss, and a vehicle you cannot simply restart by walking over to it.'
    ],
    bullets: ['ALEASAT mission dashboard', '~30 km high-altitude balloon', '10+ sensors and subsystems', 'React + AWS + OpenShift + Raspberry Pi']
  },
  people: {
    title: 'Community case file',
    body: [
      'The work I remember most is usually attached to people I wanted to keep building with. I have led recurring AI Coffee Chats, spoken to prospective students, tutored computing science, and helped people find communities where they could contribute.',
      'For me, technical leadership means making it easier for other people to contribute and grow.'
    ],
    bullets: ['300+ AI Coffee Chat attendees', '100+ prospective students reached', '200 personalized mentoring emails automated', 'SFU CS Undergraduate Society Award']
  }
}
