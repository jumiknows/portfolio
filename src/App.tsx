import { useRef, useState } from 'react'
import { projects, skillGroups, type Project } from './data'
import MissionSystems from './MissionSystems'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ReleaseToy() {
  const [run, setRun] = useState(0)
  const logs = [
    ['ready for the maintenance window', 'checks are waiting', 'coffee is still warm'],
    ['preflight passed', 'database change checked', 'application healthy', 'release confirmed'],
    ['preflight passed', 'application returned 404', 'compared with UAT', 'config drift found', 'fixed and verified'],
  ]
  const lines = run === 0 ? logs[0] : run % 2 ? logs[1] : logs[2]

  return (
    <div className="release-toy toy" aria-label="Interactive release drill">
      <div className="toy-bar"><span>release_drill.txt</span><i aria-hidden="true" /></div>
      <div className="environment-row" aria-hidden="true"><span>DEV</span><span>QA</span><span>UAT</span><b>PROD</b></div>
      <div className="release-log" role="log" aria-live="polite">
        {lines.map((line, index) => <p key={line}><span>{index === 0 ? '$' : '✓'}</span>{line}</p>)}
      </div>
      <button type="button" onClick={() => setRun((value) => value + 1)}>
        {run === 0 ? 'Run a release drill' : 'Run it again'}
      </button>
      <small>The healthy path and the messy path alternate.</small>
    </div>
  )
}

function CleanListenToy() {
  const [clean, setClean] = useState(false)

  return (
    <div className={`clean-toy toy ${clean ? 'is-clean' : ''}`} aria-label="Interactive CleanListen example">
      <div className="toy-bar"><span>{clean ? 'listening copy' : 'raw PDF extraction'}</span><i aria-hidden="true" /></div>
      <div className="paper-sample" aria-live="polite">
        <span className="pdf-noise">JOURNAL OF EXAMPLE RESEARCH / PAGE 7</span>
        <h4>3. Methods</h4>
        <p>We evaluate the proposed method on a held out set of research documents.</p>
        <span className="pdf-noise">Downloaded from publisher.example / © Example Publisher</span>
        <p>The classifier predicts whether each extracted line should be kept for listening.</p>
        <span className="pdf-noise">References 42 to 67 / Return to navigation</span>
      </div>
      <button type="button" aria-pressed={clean} onClick={() => setClean((value) => !value)}>
        {clean ? 'Bring the noise back' : 'Clean this page'}
      </button>
      <small>The paper stays. The page furniture goes.</small>
    </div>
  )
}

function SpaceToy() {
  const [ping, setPing] = useState(0)
  const message = ping === 0
    ? 'payload waiting for command'
    : ping % 2
      ? 'packet received / sensors nominal'
      : 'packet received / temperature updated'

  return (
    <div className="space-toy toy" aria-label="Interactive high altitude balloon telemetry example">
      <div className="toy-bar"><span>HAB / flight console</span><i aria-hidden="true" /></div>
      <div className="altitude-readout">
        <div><span>ALTITUDE</span><strong>29.8</strong><small>km</small></div>
        <div><span>SENSORS</span><strong>10</strong><small>online</small></div>
      </div>
      <div className="signal-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <p className="telemetry-message" role="status">{message}</p>
      <button type="button" onClick={() => setPing((value) => value + 1)}>Ping the payload</button>
      <small>A tiny stand in for a much less tidy radio link.</small>
    </div>
  )
}

function ProjectToy({ id }: { id: Project['id'] }) {
  if (id === 'production') return <ReleaseToy />
  if (id === 'cleanlisten') return <CleanListenToy />
  return <SpaceToy />
}

function ArchitectureMap({ project }: { project: Project }) {
  return (
    <div className="architecture-panel" aria-label={`${project.tab} system architecture`}>
      <div className="architecture-header">
        <span>System path</span>
        <small>{project.label.slice(0, 2)} / 04 interfaces</small>
      </div>
      <div className="system-flow">
        {project.system.map((node, index) => (
          <div className="system-node" key={node.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{node.label}</b>
            <small>{node.detail}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

function Workbench() {
  const [activeId, setActiveId] = useState<Project['id']>('production')
  const [qaNote, setQaNote] = useState(false)
  const tabRefs = useRef<Partial<Record<Project['id'], HTMLButtonElement | null>>>({})
  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0]

  const moveTabFocus = (nextIndex: number) => {
    const nextProject = projects[nextIndex]
    setActiveId(nextProject.id)
    requestAnimationFrame(() => tabRefs.current[nextProject.id]?.focus())
  }

  return (
    <section className="workbench" id="work" aria-labelledby="workbench-title">
      <div className="workbench-grid" aria-hidden="true" />
      <div className="bench-toolbar">
        <div>
          <span className="bench-dot" aria-hidden="true" />
          <strong id="workbench-title">Engineering case files</strong>
          <small>Architecture, constraints, ownership, verification</small>
        </div>
        <div className="bench-status-group">
          <p className="bench-status"><i aria-hidden="true" /> 03 systems documented</p>
          <button
            className="qa-cat"
            type="button"
            aria-expanded={qaNote}
            onClick={() => setQaNote((value) => !value)}
          >
            <img src="./assets/cat-avatar.png" alt="A sleepy orange cat" />
            <span>QA</span>
          </button>
          {qaNote && <p className="qa-bubble" role="status">Looks shippable. I checked twice.</p>}
        </div>
      </div>

      <div className="project-tabs" role="tablist" aria-label="Project case files">
        {projects.map((project) => (
          <button
            key={project.id}
            ref={(element) => { tabRefs.current[project.id] = element }}
            id={`project-tab-${project.id}`}
            type="button"
            role="tab"
            aria-selected={project.id === activeId}
            aria-controls="active-case"
            tabIndex={project.id === activeId ? 0 : -1}
            className={project.id === activeId ? 'is-active' : ''}
            onClick={() => setActiveId(project.id)}
            onKeyDown={(event) => {
              const currentIndex = projects.findIndex((item) => item.id === project.id)
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                moveTabFocus((currentIndex + 1) % projects.length)
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault()
                moveTabFocus((currentIndex - 1 + projects.length) % projects.length)
              } else if (event.key === 'Home') {
                event.preventDefault()
                moveTabFocus(0)
              } else if (event.key === 'End') {
                event.preventDefault()
                moveTabFocus(projects.length - 1)
              }
            }}
          >
            <span>{project.label.slice(0, 2)}</span>
            <b>{project.tab}</b>
          </button>
        ))}
      </div>

      <article
        className={`case-sheet case-${activeProject.id}`}
        id="active-case"
        role="tabpanel"
        aria-labelledby={`project-tab-${activeProject.id}`}
        key={activeProject.id}
      >
        <div className="case-copy">
          <p className="case-label">{activeProject.label}</p>
          <div className="case-meta"><b>{activeProject.organization}</b><span>{activeProject.dates}</span></div>
          <h2>{activeProject.title}</h2>
          <p className="case-intro">{activeProject.intro}</p>
          <dl className="engineering-summary">
            <div><dt>Constraint</dt><dd>{activeProject.constraint}</dd></div>
            <div><dt>My scope</dt><dd>{activeProject.ownership}</dd></div>
            <div><dt>Verified by</dt><dd>{activeProject.verification}</dd></div>
          </dl>
          <ul>
            {activeProject.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
          <div className="case-links">
            {activeProject.links?.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <Arrow /></a>
            ))}
          </div>
        </div>

        <div className="case-side">
          <ArchitectureMap project={activeProject} />
          <div className="proof-strip">
            {activeProject.proof.map((fact) => (
              <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
            ))}
          </div>
          <ProjectToy id={activeProject.id} />
          <div className="tool-tape" aria-label={`Tools used: ${activeProject.tools.join(', ')}`}>
            <span>STACK</span>{activeProject.tools.join(' / ')}
          </div>
        </div>
      </article>

    </section>
  )
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ernest Wong, home"><span>EW</span><b>ERNEST WONG</b></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="./resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
          <a href="mailto:ernest_wong@sfu.ca">Email</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="intro-card">
            <p className="eyebrow"><span aria-hidden="true" /> Software engineer / systems + data + flight</p>
            <h1>Hi, I’m<br /><em>Ernest.</em></h1>
            <p className="hero-lead">I engineer software where code meets operations: production systems, data pipelines, and hardware in the field.</p>
            <p className="hero-note">My best days usually end with a script, a checklist, and fewer people wondering what happens next.</p>
            <div className="engineering-index" aria-label="Engineering focus areas">
              <span>Production systems</span>
              <span>Data + applied ML</span>
              <span>Embedded + mission</span>
              <span>Verification + delivery</span>
            </div>
            <div className="hero-actions">
              <a className="primary-link" href="#work">Inspect the systems <span aria-hidden="true">↓</span></a>
              <a className="plain-link" href="./resume.pdf" target="_blank" rel="noreferrer">résumé.pdf <Arrow /></a>
            </div>
            <div className="current-note">
              <span>RIGHT NOW</span>
              <p>Building reusable data products at Elections Canada and finishing Computer Science at SFU.</p>
            </div>
          </div>
          <MissionSystems />
        </section>

        <Workbench />

        <section className="about-section" id="about">
          <div className="about-heading">
            <p className="section-number">04 / The person</p>
            <h2>I have a habit of asking,<br /><em>“why are we doing this by hand?”</em></h2>
          </div>
          <div className="about-body">
            <p>That question has followed me through government systems, student teams, research projects, and classrooms. It usually leads to a small tool. More importantly, it leads to a better conversation with the people doing the work.</p>
            <p>I also like teaching. I have hosted AI Coffee Chats for more than 300 attendees, tutored computing science at SFU, and taught twenty middle school students how to build with code.</p>
            <div className="pocket-notes">
              <span>Ask the awkward question</span>
              <span>Write down what worked</span>
              <span>Test the boring case</span>
              <span>Bring people with you</span>
            </div>
          </div>
        </section>

        <section className="recognition-section" aria-labelledby="recognition-title">
          <div>
            <p className="section-number">A few nice things</p>
            <h2 id="recognition-title">Proof that other humans were involved.</h2>
          </div>
          <ol>
            <li><b>CS Undergraduate Society Award</b><span>One of five recipients</span></li>
            <li><b>AI Hackathon Finalist</b><span>Best Use of Google Gemini</span></li>
            <li><b>Mayor of Richmond Recognition Award</b><span>Community recognition</span></li>
          </ol>
        </section>

        <section className="skills-section" aria-labelledby="skills-title">
          <div className="skills-title">
            <p className="section-number">Tool drawer</p>
            <h2 id="skills-title">What I work with</h2>
          </div>
          <div className="skill-drawer">
            {skillGroups.map((group, index) => (
              <div key={group.label}><span>0{index + 1}</span><b>{group.label}</b><p>{group.value}</p></div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-number">One last note</p>
          <h2>Want to compare notes?</h2>
          <p>Tell me what you are building, what keeps breaking, or what you wish worked better.</p>
          <a className="email-link" href="mailto:ernest_wong@sfu.ca">ernest_wong@sfu.ca <Arrow /></a>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/jumiknows/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a href="https://github.com/jumiknows" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="./resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
          </div>
          <footer><span>Built by Ernest Wong</span><span>49.2827° N / 123.1207° W</span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
