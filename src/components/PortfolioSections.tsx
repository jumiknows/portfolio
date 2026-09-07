import { about, contact, links, recognitions, skillGroups } from '../content'
import { Arrow } from './Arrow'

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-heading">
        <p className="section-number">04 / The person</p>
        <h2>{about.heading}<br /><em>{about.emphasis}</em></h2>
      </div>
      <div className="about-body">
        {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="pocket-notes">
          {about.principles.map((principle) => <span key={principle}>{principle}</span>)}
        </div>
      </div>
    </section>
  )
}

export function RecognitionSection() {
  return (
    <section className="recognition-section" aria-labelledby="recognition-title">
      <div>
        <p className="section-number">A few nice things</p>
        <h2 id="recognition-title">Proof that other humans were involved.</h2>
      </div>
      <ol>
        {recognitions.map((recognition) => (
          <li key={recognition.title}>
            <b>{recognition.title}</b>
            <span>{recognition.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function SkillsSection() {
  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <div className="skills-title">
        <p className="section-number">Tool drawer</p>
        <h2 id="skills-title">What I work with</h2>
      </div>
      <div className="skill-drawer">
        {skillGroups.map((group, index) => (
          <div key={group.label}>
            <span>0{index + 1}</span>
            <b>{group.label}</b>
            <p>{group.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <p className="section-number">One last note</p>
      <h2>{contact.heading}</h2>
      <p>{contact.description}</p>
      <a className="email-link" href={links.email}>ernest_wong@sfu.ca <Arrow /></a>
      <div className="contact-links">
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        <a href={links.resume} target="_blank" rel="noreferrer">Résumé <Arrow /></a>
      </div>
      <footer><span>Built by Ernest Wong</span><span>{contact.coordinates}</span></footer>
    </section>
  )
}
