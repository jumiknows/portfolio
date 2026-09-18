import { links } from '../content'

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ernest Wong, home">
        <span>EW</span>
        <b>ERNEST WONG</b>
      </a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
<a href={links.resume}>Resume</a>
        <a href={links.email}>Email</a>
      </nav>
    </header>
  )
}
