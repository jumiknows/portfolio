import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import AmbientScene from './components/AmbientScene'
import { chapterDetails, chapters, type ChapterId } from './data'

const orderedIds = chapters.map((chapter) => chapter.id)

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>
}

function IndexCopy({ openDetail }: { openDetail: () => void }) {
  return (
    <div className="copy-stack index-copy">
      <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · BUILDER · HUMAN</p>
      <h1 className="hero-name"><span>Ernest</span><em>Wong.</em></h1>
      <p className="hero-thesis">I build systems that <strong>survive contact with reality.</strong></p>
      <p className="hero-support">Production platforms, automation, applied ML, mission software — and the communities that make ambitious work worth doing.</p>
      <div className="action-row">
        <button className="primary-action" onClick={openDetail}>open the field note <span>→</span></button>
        <a className="text-action" href="./resume.pdf" target="_blank" rel="noreferrer">resume.pdf <ExternalArrow /></a>
      </div>
      <div className="compact-proof" aria-label="Selected impact">
        <div><strong>$100M+</strong><span>production</span></div>
        <div><strong>50+</strong><span>apps</span></div>
        <div><strong>8+</strong><span>envs</span></div>
        <div><strong>300+</strong><span>people</span></div>
      </div>
    </div>
  )
}

function WorkCopy({ openDetail }: { openDetail: () => void }) {
  return (
    <div className="copy-stack">
      <p className="eyebrow">CASE 01 · PRODUCTION</p>
      <h2>Software with<br /><em>consequences.</em></h2>
      <p className="chapter-lead">I like the part after the demo — when software meets maintenance windows, broken configs, databases, and actual users.</p>
      <div className="role-block">
        <div className="role-meta"><span>ISED · GOVERNMENT OF CANADA</span><span>2025—PRESENT</span></div>
        <h3>Software Engineer Intern</h3>
        <div className="metric-strip three">
          <div><strong>$100M+</strong><span>platform</span></div>
          <div><strong>8+</strong><span>environments</span></div>
          <div><strong>50+</strong><span>applications</span></div>
        </div>
      </div>
      <div className="stack-chips"><span>Java</span><span>Python</span><span>GraphQL</span><span>Jenkins</span><span>AWS</span></div>
      <button className="secondary-action" onClick={openDetail}>open production case file <span>↗</span></button>
    </div>
  )
}

function LabCopy({ openDetail }: { openDetail: () => void }) {
  return (
    <div className="copy-stack">
      <p className="eyebrow">CASE 02 · APPLIED ML</p>
      <h2>Keep the paper.<br /><em>Lose the noise.</em></h2>
      <p className="chapter-lead">CleanListen turns messy academic PDFs into cleaner text for screen readers and TTS without summarizing away the research.</p>
      <div className="metric-strip three">
        <div><strong>91.2%</strong><span>accuracy</span></div>
        <div><strong>89.7%</strong><span>KEEP F1</span></div>
        <div><strong>94.0%</strong><span>specificity</span></div>
      </div>
      <div className="stack-chips"><span>Python</span><span>scikit-learn</span><span>Pandas</span><span>CLI</span><span>CI</span></div>
      <div className="action-row tight">
        <button className="secondary-action" onClick={openDetail}>open ML case file <span>↗</span></button>
        <a className="text-action" href="https://github.com/jumiknows/CleanListen" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
      </div>
    </div>
  )
}

function SpaceCopy({ openDetail }: { openDetail: () => void }) {
  return (
    <div className="copy-stack space-copy">
      <p className="eyebrow">CASE 03 · MISSION SYSTEMS</p>
      <h2>Software that<br /><em>leaves the building.</em></h2>
      <p className="chapter-lead">Mission operations, telemetry, embedded systems, and a high-altitude balloon that forced software decisions to meet physical reality.</p>
      <div className="metric-strip three">
        <div><strong>~30 km</strong><span>balloon</span></div>
        <div><strong>10+</strong><span>sensors</span></div>
        <div><strong>2028</strong><span>mission target</span></div>
      </div>
      <div className="action-row space-links">
        <a className="secondary-action link-button" href="https://www.aleasat.space/" target="_blank" rel="noreferrer">ALEASAT <ExternalArrow /></a>
        <a className="text-action" href="https://sfusat.org/" target="_blank" rel="noreferrer">SFU SAT <ExternalArrow /></a>
      </div>
      <button className="case-link" onClick={openDetail}>read the mission log →</button>
    </div>
  )
}

function PeopleCopy({ openDetail }: { openDetail: () => void }) {
  return (
    <div className="copy-stack">
      <p className="eyebrow">CASE 04 · PEOPLE</p>
      <h2>Good systems need<br /><em>humans in the loop.</em></h2>
      <p className="chapter-lead">The work I remember most is usually attached to people I wanted to keep building with.</p>
      <div className="metric-strip three">
        <div><strong>300+</strong><span>AI attendees</span></div>
        <div><strong>100+</strong><span>students</span></div>
        <div><strong>200</strong><span>mentoring emails</span></div>
      </div>
      <blockquote className="people-quote">“Make ambitious work easier for other people to join.”</blockquote>
      <button className="secondary-action" onClick={openDetail}>open the people file <span>↗</span></button>
    </div>
  )
}

function ReleaseConsole() {
  const [run, setRun] = useState(0)
  const healthy = ['$ deploy --target prod', '✓ preflight', '✓ database change', '✓ application healthy', '✓ sanity tests', 'release confirmed · 00:22:14']
  const spicy = ['$ deploy --target prod', '✓ preflight', '✕ application · 404', '→ compare known-good UAT', '→ config drift found', '✓ corrected + verified']
  const lines = run === 0 ? ['$ ready to deploy', '> checks: waiting', '> maintenance window: open', '▮'] : (run % 2 ? healthy : spicy)

  return (
    <div className="console-card visual-overlay-card">
      <div className="console-title"><span>release_simulator.sh</span><span className="console-led" /></div>
      <div className="env-row"><span>QA</span><span>UAT</span><span className="active">PROD</span></div>
      <pre>{lines.join('\n')}</pre>
      <button className="visual-control" onClick={() => setRun((value) => value + 1)}>{run === 0 ? 'simulate a release' : 'run it again'}</button>
      <small>{run > 0 && run % 2 === 0 ? 'evidence > guessing' : 'healthy path / failure path alternate'}</small>
    </div>
  )
}

function CleanListenDemo({ clean, setClean }: { clean: boolean; setClean: (value: boolean) => void }) {
  return (
    <div className={`paper-demo visual-overlay-card ${clean ? 'is-clean' : ''}`}>
      <div className="demo-toolbar"><span>{clean ? 'CLEAN OUTPUT' : 'RAW PDF'}</span><b>{clean ? '3 artifacts removed' : 'noise detected'}</b></div>
      <div className="demo-paper">
        <span className="noise-line">JOURNAL OF EXAMPLE RESEARCH · VOL. 14</span>
        <strong>3. Methods</strong>
        <p>We evaluate the proposed method on a held-out set of research documents.</p>
        <span className="noise-line">Downloaded from publisher.example · 04:13 PM</span>
        <p>The classifier predicts whether each extracted line should be kept for listening.</p>
        <span className="noise-line">© 2026 Example Publisher · Page 7</span>
      </div>
      <button className="visual-control" aria-pressed={clean} onClick={() => setClean(!clean)}>{clean ? 'show raw PDF' : 'run CleanListen'}</button>
    </div>
  )
}

function IndexOverlay() {
  return (
    <div className="orbit-labels" aria-hidden="true">
      <span className="orbit-chip prod">PROD<small>ship it</small></span>
      <span className="orbit-chip ml">ML<small>clean it</small></span>
      <span className="orbit-chip orbit">ORBIT<small>ALEASAT</small></span>
      <span className="orbit-chip people">300+<small>bring people</small></span>
      <span className="map-caption">CURRENT TRAJECTORY</span>
      <span className="hand-note">apparently this became a career ↗</span>
    </div>
  )
}

function SpaceOverlay() {
  return (
    <div className="space-overlay" aria-hidden="true">
      <span className="altitude-tag">HAB · ~30 KM</span>
      <span className="orbit-tag">ALEASAT · ORBIT</span>
      <span className="mission-caption">software → radio → physics</span>
    </div>
  )
}

function PeopleOverlay() {
  return (
    <div className="people-overlay" aria-hidden="true">
      <div className="sticky-note"><span className="tape" />bring people<br /><strong>with you.</strong></div>
      <span className="network-label a">AI COFFEE</span>
      <span className="network-label b">SAT</span>
      <span className="network-label c">MENTORING</span>
    </div>
  )
}

function VisualOverlay({ chapter, clean, setClean }: { chapter: ChapterId; clean: boolean; setClean: (value: boolean) => void }) {
  if (chapter === 'index') return <IndexOverlay />
  if (chapter === 'work') return <ReleaseConsole />
  if (chapter === 'lab') return <CleanListenDemo clean={clean} setClean={setClean} />
  if (chapter === 'space') return <SpaceOverlay />
  return <PeopleOverlay />
}

function DetailSheet({ chapter, onClose }: { chapter: ChapterId; onClose: () => void }) {
  const detail = chapterDetails[chapter]

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.article
        className="detail-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        initial={{ y: 40, opacity: 0, rotate: -0.5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 34, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="sheet-close" onClick={onClose} aria-label="Close case file">×</button>
        <p className="eyebrow">FIELD NOTE · {chapter.toUpperCase()}</p>
        <h2 id="detail-title">{detail.title}</h2>
        {detail.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ul>{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        <div className="sheet-footer"><span>EW / 2026</span><span>close with ESC</span></div>
      </motion.article>
    </motion.div>
  )
}

function MobileDock({ active, goTo }: { active: ChapterId; goTo: (chapter: ChapterId) => void }) {
  return (
    <nav className="mobile-dock" aria-label="Portfolio chapters">
      {chapters.map((chapter) => (
        <button key={chapter.id} className={chapter.id === active ? 'active' : ''} onClick={() => goTo(chapter.id)}>
          <span className="dock-number">{chapter.number}</span>
          <span>{chapter.short}</span>
        </button>
      ))}
    </nav>
  )
}

function App() {
  const initialHash = (typeof window !== 'undefined' ? window.location.hash.slice(1) : '') as ChapterId
  const [active, setActive] = useState<ChapterId>(orderedIds.includes(initialHash) ? initialHash : 'index')
  const [detailOpen, setDetailOpen] = useState(false)
  const [clean, setClean] = useState(false)
  const [catPokes, setCatPokes] = useState(0)
  const [toast, setToast] = useState('')
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const isMobile = useMediaQuery('(max-width: 900px)')
  const prefersReducedMotion = Boolean(useReducedMotion())
  const activeIndex = orderedIds.indexOf(active)
  const meta = chapters[activeIndex]

  const goTo = (chapter: ChapterId) => {
    if (chapter === active) return
    setActive(chapter)
    setDetailOpen(false)
    history.replaceState(null, '', chapter === 'index' ? window.location.pathname : `#${chapter}`)
    if (navigator.vibrate) navigator.vibrate(8)
  }

  const move = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(orderedIds.length - 1, activeIndex + direction))
    if (next !== activeIndex) goTo(orderedIds[next])
  }

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (detailOpen) return
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
      if (/^[1-5]$/.test(event.key)) goTo(orderedIds[Number(event.key) - 1])
    }
    window.addEventListener('keydown', keyHandler)
    return () => window.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSwipeHint(false), 5200)
    return () => window.clearTimeout(timer)
  }, [])

  const copy = useMemo(() => {
    const openDetail = () => setDetailOpen(true)
    if (active === 'index') return <IndexCopy openDetail={openDetail} />
    if (active === 'work') return <WorkCopy openDetail={openDetail} />
    if (active === 'lab') return <LabCopy openDetail={openDetail} />
    if (active === 'space') return <SpaceCopy openDetail={openDetail} />
    return <PeopleCopy openDetail={openDetail} />
  }, [active])

  const pokeCat = () => {
    const next = catPokes + 1
    setCatPokes(next)
    const messages = ['meow.exe started', 'incident commander: check the logs', 'please stop poking prod', 'fine. you found the cat. 🐈']
    setToast(messages[Math.min(next - 1, messages.length - 1)])
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className={`app-shell chapter-${active}`} style={{ '--chapter-accent': meta.color } as CSSProperties}>
      <a className="skip-link" href="#chapter-content">Skip to content</a>
      <div className="desk-noise" aria-hidden="true" />

      <header className="app-bar">
        <button className="brand" onClick={() => goTo('index')} aria-label="Go to index"><span>EW</span><b>FIELD NOTES</b></button>
        <div className="coords">VANCOUVER · 49.2827° N · 123.1207° W</div>
        <div className="top-links">
          <a href="./resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ</a>
          <a href="https://github.com/jumiknows" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="mailto:ernest_wong@sfu.ca">SAY HELLO ↗</a>
        </div>
      </header>

      <main className="viewport-stage">
        <div className="dossier-shell">
          <nav className="desktop-tabs" aria-label="Portfolio chapters">
            {chapters.map((chapter) => (
              <button key={chapter.id} className={chapter.id === active ? 'active' : ''} onClick={() => goTo(chapter.id)}>
                <span>{chapter.number}</span><b>{chapter.label}</b>
              </button>
            ))}
          </nav>

          <div className="folder-frame">
            <div className="folder-label"><span>EW / ACTIVE FILE</span><span>{meta.code}</span></div>
            <button className="cat-button" onClick={pokeCat} aria-label="Poke the incident commander">
              <img src="./assets/cat-avatar.png" alt="A sleepy orange cat" />
              <span>incident commander</span>
            </button>

            <motion.section
              className="paper-stage"
              id="chapter-content"
              drag={isMobile ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const intent = info.offset.x + info.velocity.x * 0.16
                if (intent < -70) move(1)
                if (intent > 70) move(-1)
              }}
              style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="chapter-copy-panel"
                  key={active}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: activeIndex % 2 ? 24 : -24, rotateY: activeIndex % 2 ? -2 : 2 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  {copy}
                </motion.div>
              </AnimatePresence>

              <div className="visual-panel">
                <AmbientScene chapter={active} clean={clean} reducedMotion={prefersReducedMotion} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    className="visual-overlay"
                    key={`${active}-overlay`}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.34 }}
                  >
                    <VisualOverlay chapter={active} clean={clean} setClean={setClean} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>
          </div>
        </div>

        {isMobile && (
          <div className="mobile-edge-controls" aria-hidden="true">
            <button disabled={activeIndex === 0} onClick={() => move(-1)} aria-label="Previous chapter">‹</button>
            <span>{meta.number} / 04</span>
            <button disabled={activeIndex === orderedIds.length - 1} onClick={() => move(1)} aria-label="Next chapter">›</button>
          </div>
        )}
      </main>

      {isMobile && <MobileDock active={active} goTo={goTo} />}

      <AnimatePresence>{detailOpen && <DetailSheet chapter={active} onClose={() => setDetailOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
      <AnimatePresence>{isMobile && showSwipeHint && <motion.div className="swipe-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span>←</span> swipe chapters <span>→</span></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App
