import { about, contact, links, recognition, skills } from '../content'

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-heading">
        <p className="section-number">{about.eyebrow}</p>
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
        <p className="section-number">{recognition.eyebrow}</p>
        <h2 id="recognition-title">{recognition.heading}</h2>
      </div>
      <ol>
        {recognition.items.map((item) => (
          <li key={item.title}>
            <b>{item.title}</b>
            <span>{item.detail}</span>
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
        <p className="section-number">{skills.eyebrow}</p>
        <h2 id="skills-title">{skills.heading}</h2>
      </div>
      <div className="skill-drawer">
        {skills.groups.map((group, index) => (
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
      <p className="section-number">{contact.eyebrow}</p>
      <h2>{contact.heading}</h2>
      <p>{contact.description}</p>
      <a className="email-link" href={links.email}>Email me</a>
      <div className="contact-links">
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={links.resume} download="Ernest_Wong_Resume.pdf">Resume</a>
      </div>
      <footer><span>Built by Ernest Wong</span><span>{contact.coordinates}</span></footer>
    </section>
  )
}
