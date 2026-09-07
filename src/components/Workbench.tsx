import { useRef, useState, type KeyboardEvent } from 'react'
import { projects, type Project, type ProjectId } from '../content'
import { Arrow } from './Arrow'
import { ProjectDemo } from './ProjectDemos'

const firstProject = projects[0]

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

export function Workbench() {
  const [activeId, setActiveId] = useState<ProjectId>(firstProject.id)
  const [isQaNoteVisible, setIsQaNoteVisible] = useState(false)
  const tabRefs = useRef<Partial<Record<ProjectId, HTMLButtonElement | null>>>({})
  const activeProject = projects.find((project) => project.id === activeId) ?? firstProject

  function selectAndFocusProject(index: number) {
    const nextProject = projects[index]
    setActiveId(nextProject.id)
    requestAnimationFrame(() => tabRefs.current[nextProject.id]?.focus())
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    const lastIndex = projects.length - 1
    const destinations: Partial<Record<string, number>> = {
      ArrowRight: currentIndex === lastIndex ? 0 : currentIndex + 1,
      ArrowLeft: currentIndex === 0 ? lastIndex : currentIndex - 1,
      Home: 0,
      End: lastIndex,
    }
    const destination = destinations[event.key]

    if (destination === undefined) return
    event.preventDefault()
    selectAndFocusProject(destination)
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
            aria-expanded={isQaNoteVisible}
            aria-label="Toggle the quality assurance note"
            onClick={() => setIsQaNoteVisible((visible) => !visible)}
          >
            <img src="./assets/cat-avatar.png" alt="" />
            <span>QA</span>
          </button>
          {isQaNoteVisible && <p className="qa-bubble" role="status">Looks shippable. I checked twice.</p>}
        </div>
      </div>

      <div className="project-tabs" role="tablist" aria-label="Project case files">
        {projects.map((project, index) => (
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
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <span>{project.label.slice(0, 2)}</span>
            <b>{project.tab}</b>
          </button>
        ))}
      </div>

      <article
        className="case-sheet"
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
          {activeProject.links && (
            <div className="case-links">
              {activeProject.links.map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                  {link.label} <Arrow />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="case-side">
          <ArchitectureMap project={activeProject} />
          <div className="proof-strip">
            {activeProject.proof.map((fact) => (
              <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
            ))}
          </div>
          <ProjectDemo projectId={activeProject.id} />
          <div className="tool-tape" aria-label={`Tools used: ${activeProject.tools.join(', ')}`}>
            <span>STACK</span>{activeProject.tools.join(' / ')}
          </div>
        </div>
      </article>
    </section>
  )
}
