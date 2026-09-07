import { links, profile } from '../content'
import MissionSystems from '../MissionSystems'
import { Arrow } from './Arrow'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="intro-card">
        <p className="eyebrow">
          <span aria-hidden="true" />
          {profile.eyebrow}
        </p>
        <h1>
          Hi, I’m<br />
          <em>Ernest.</em>
        </h1>
        <p className="hero-lead">{profile.lead}</p>
        <p className="hero-note">{profile.note}</p>

        <div className="engineering-index" aria-label="Engineering focus areas">
          {profile.focusAreas.map((area) => <span key={area}>{area}</span>)}
        </div>

        <div className="hero-actions">
          <a className="primary-link" href="#work">
            Inspect the systems <span aria-hidden="true">↓</span>
          </a>
          <a className="plain-link" href={links.resume} target="_blank" rel="noreferrer">
            résumé.pdf <Arrow />
          </a>
        </div>

        <div className="current-note">
          <span>RIGHT NOW</span>
          <p>{profile.current}</p>
        </div>
      </div>

      <MissionSystems />
    </section>
  )
}
