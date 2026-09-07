import { Hero } from './components/Hero'
import {
  AboutSection,
  ContactSection,
  RecognitionSection,
  SkillsSection,
} from './components/PortfolioSections'
import { SiteHeader } from './components/SiteHeader'
import { Workbench } from './components/Workbench'

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Workbench />
        <AboutSection />
        <RecognitionSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
