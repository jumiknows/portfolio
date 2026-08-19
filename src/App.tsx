import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
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

type UiSound = 'navigate' | 'open' | 'close' | 'action' | 'cat'

function playTone(context: AudioContext, kind: UiSound) {
  const patterns: Record<UiSound, { frequency: number; end: number; duration: number; gain: number }> = {
    navigate: { frequency: 330, end: 410, duration: 0.055, gain: 0.018 },
    open: { frequency: 460, end: 610, duration: 0.075, gain: 0.02 },
    close: { frequency: 390, end: 290, duration: 0.07, gain: 0.018 },
    action: { frequency: 520, end: 570, duration: 0.045, gain: 0.016 },
    cat: { frequency: 690, end: 840, duration: 0.08, gain: 0.014 },
  }

  const { frequency, end, duration, gain } = patterns[kind]
  const now = context.currentTime
  const oscillator = context.createOscillator()
  const volume = context.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, now)
  oscillator.frequency.exponentialRampToValueAtTime(end, now + duration)
  volume.gain.setValueAtTime(0.0001, now)
  volume.gain.exponentialRampToValueAtTime(gain, now + 0.008)
  volume.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  oscillator.connect(volume)
  volume.connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + duration + 0.01)
}

function useUiAudio() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('ew-sound') === 'on'
  })
  const contextRef = useRef<AudioContext | null>(null)

  const getContext = () => {
    if (typeof window === 'undefined' || !window.AudioContext) return null
    if (!contextRef.current) contextRef.current = new window.AudioContext()
    return contextRef.current
  }

  const play = (kind: UiSound) => {
    if (!enabled) return
    const context = getContext()
    if (!context) return
    if (context.state === 'suspended') {
      void context.resume().then(() => playTone(context, kind))
      return
    }
    playTone(context, kind)
  }

  const toggle = () => {
    const next = !enabled
    window.localStorage.setItem('ew-sound', next ? 'on' : 'off')

    const context = getContext()
    if (enabled && context) playTone(context, 'close')
    setEnabled(next)

    if (next && context) {
      if (context.state === 'suspended') {
        void context.resume().then(() => playTone(context, 'open'))
      } else {
        playTone(context, 'open')
      }
    }
  }

  useEffect(() => () => {
    if (contextRef.current && contextRef.current.state !== 'closed') {
      void contextRef.current.close()
    }
  }, [])

  return { enabled, play, toggle }
}


function LiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const time = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)

  const zone = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    timeZoneName: 'short',
  }).formatToParts(now).find((part) => part.type === 'timeZoneName')?.value ?? 'PT'

  return (
    <time
      className="live-clock"
      dateTime={now.toISOString()}
      title="Live time in Vancouver, British Columbia"
      aria-label={`Current time in Vancouver: ${time} ${zone}`}
    >
      <span className="live-dot" aria-hidden="true" />
      <span className="live-city">VANCOUVER</span>
      <b>{time}</b>
      <span>{zone}</span>
    </time>
  )
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
      <p className="hero-support">My work spans production systems, automation, applied ML, mission software, and the teams behind them.</p>
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
      <p className="chapter-lead">I like the part after the demo, when software has to survive maintenance windows, broken configs, databases, and real users.</p>
      <div className="role-block">
        <div className="role-meta"><span>ISED · GOVERNMENT OF CANADA</span><span>2025 - PRESENT</span></div>
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
      <p className="chapter-lead">The projects I remember most are the ones where I liked the people enough to keep building with them.</p>
      <div className="metric-strip three">
        <div><strong>300+</strong><span>AI attendees</span></div>
        <div><strong>100+</strong><span>students</span></div>
        <div><strong>200</strong><span>mentoring emails</span></div>
      </div>
      <blockquote className="people-quote">“Bring people with you.”</blockquote>
      <button className="secondary-action" onClick={openDetail}>open the people file <span>↗</span></button>
    </div>
  )
}

function ReleaseConsole({ onSound }: { onSound: (kind: UiSound) => void }) {
  const [run, setRun] = useState(0)
  const healthy = ['$ deploy --target prod', '✓ preflight', '✓ database change', '✓ application healthy', '✓ sanity tests', 'release confirmed · 00:22:14']
  const spicy = ['$ deploy --target prod', '✓ preflight', '✕ application · 404', '→ compare known-good UAT', '→ config drift found', '✓ corrected + verified']
  const lines = run === 0 ? ['$ ready to deploy', '> checks: waiting', '> maintenance window: open', '▮'] : (run % 2 ? healthy : spicy)

  return (
    <div className="console-card visual-overlay-card">
      <div className="console-title"><span>release_simulator.sh</span><span className="console-led" /></div>
      <div className="env-row"><span>QA</span><span>UAT</span><span className="active">PROD</span></div>
      <pre>{lines.join('\n')}</pre>
      <button className="visual-control" onClick={() => { onSound('action'); setRun((value) => value + 1) }}>{run === 0 ? 'simulate a release' : 'run it again'}</button>
      <small>{run > 0 && run % 2 === 0 ? 'evidence > guessing' : 'healthy path / failure path alternate'}</small>
    </div>
  )
}

function CleanListenDemo({ clean, setClean, onSound }: { clean: boolean; setClean: (value: boolean) => void; onSound: (kind: UiSound) => void }) {
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
      <button className="visual-control" aria-pressed={clean} onClick={() => { onSound('action'); setClean(!clean) }}>{clean ? 'show raw PDF' : 'run CleanListen'}</button>
    </div>
  )
}

function IndexOverlay({ goTo }: { goTo: (chapter: ChapterId) => void }) {
  return (
    <div className="orbit-labels" aria-label="Current trajectory. Select a node to open that chapter.">
      <button
        type="button"
        className="orbit-chip prod"
        onClick={() => goTo('work')}
        aria-label="Open Work chapter: Production systems"
        title="Production systems - open Work"
      >
        PROD<small>ship it</small>
      </button>
      <button
        type="button"
        className="orbit-chip ml"
        onClick={() => goTo('lab')}
        aria-label="Open Lab chapter: Machine learning"
        title="Machine learning - open Lab"
      >
        ML<small>clean it</small>
      </button>
      <button
        type="button"
        className="orbit-chip orbit"
        onClick={() => goTo('space')}
        aria-label="Open Space chapter: ALEASAT and mission software"
        title="Orbit - open Space"
      >
        ORBIT<small>ALEASAT</small>
      </button>
      <button
        type="button"
        className="orbit-chip people"
        onClick={() => goTo('people')}
        aria-label="Open People chapter: Community and mentoring"
        title="Community - open People"
      >
        300+<small>bring people</small>
      </button>
      <span className="map-caption">CURRENT TRAJECTORY · CLICK A NODE</span>
      <span className="hand-note" aria-hidden="true">apparently this became a career ↗</span>
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

function VisualOverlay({ chapter, clean, setClean, onSound, goTo }: { chapter: ChapterId; clean: boolean; setClean: (value: boolean) => void; onSound: (kind: UiSound) => void; goTo: (chapter: ChapterId) => void }) {
  if (chapter === 'index') return <IndexOverlay goTo={goTo} />
  if (chapter === 'work') return <ReleaseConsole onSound={onSound} />
  if (chapter === 'lab') return <CleanListenDemo clean={clean} setClean={setClean} onSound={onSound} />
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


function ContactSheet({
  onClose,
  onCopyEmail,
}: {
  onClose: () => void
  onCopyEmail: () => void
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <motion.div
      className="sheet-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className="detail-sheet contact-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        initial={{ y: 34, opacity: 0, rotate: 0.35 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="sheet-close" onClick={onClose} aria-label="Close contact sheet">×</button>
        <p className="eyebrow">OPEN CHANNEL · VANCOUVER</p>
        <h2 id="contact-title">Say hello.</h2>
        <p>
          The easiest way to reach me is email. If your browser has no mail app configured,
          copy the address instead.
        </p>

        <div className="contact-address" aria-label="Email address">
          <span>ERNEST_WONG@SFU.CA</span>
          <button type="button" onClick={onCopyEmail}>COPY EMAIL</button>
        </div>

        <div className="contact-actions">
          <a className="primary-action" href="mailto:ernest_wong@sfu.ca?subject=Hello%20Ernest">
            OPEN EMAIL <ExternalArrow />
          </a>
          <a
            className="secondary-action"
            href="https://www.linkedin.com/in/jumiknows/"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN <ExternalArrow />
          </a>
          <a
            className="secondary-action"
            href="https://github.com/jumiknows"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB <ExternalArrow />
          </a>
        </div>

        <div className="sheet-footer">
          <span>Usually replies with too many ideas.</span>
          <span>close with ESC</span>
        </div>
      </motion.article>
    </motion.div>
  )
}

function MobileDock({ active, goTo }: { active: ChapterId; goTo: (chapter: ChapterId) => void }) {
  return (
    <nav className="mobile-dock" aria-label="Portfolio chapters">
      {chapters.map((chapter) => (
        <button key={chapter.id} className={chapter.id === active ? 'active' : ''} onClick={() => goTo(chapter.id)} aria-keyshortcuts={String(chapters.indexOf(chapter) + 1)}>
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
  const [contactOpen, setContactOpen] = useState(false)
  const [clean, setClean] = useState(false)
  const [catPokes, setCatPokes] = useState(0)
  const [toast, setToast] = useState('')
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const [lightsOn, setLightsOn] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.localStorage.getItem('ew-lamp') !== 'off'
  })
  const uiAudio = useUiAudio()
  const isMobile = useMediaQuery('(max-width: 900px)')
  const prefersReducedMotion = Boolean(useReducedMotion())
  const activeIndex = orderedIds.indexOf(active)
  const meta = chapters[activeIndex]

  const goTo = (chapter: ChapterId) => {
    if (chapter === active) return
    uiAudio.play('navigate')
    setActive(chapter)
    setDetailOpen(false)
    setContactOpen(false)
    history.replaceState(null, '', chapter === 'index' ? window.location.pathname : `#${chapter}`)
    if (navigator.vibrate) navigator.vibrate(8)
  }

  const toggleLamp = () => {
    const next = !lightsOn
    setLightsOn(next)
    window.localStorage.setItem('ew-lamp', next ? 'on' : 'off')
    uiAudio.play('action')
  }

  const openDetail = () => {
    uiAudio.play('open')
    setDetailOpen(true)
  }

  const closeDetail = () => {
    uiAudio.play('close')
    setDetailOpen(false)
  }

  const openContact = () => {
    uiAudio.play('open')
    setContactOpen(true)
  }

  const closeContact = () => {
    uiAudio.play('close')
    setContactOpen(false)
  }

  const copyEmail = async () => {
    uiAudio.play('action')
    const email = 'ernest_wong@sfu.ca'

    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = email
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    setToast('email copied to clipboard')
    window.setTimeout(() => setToast(''), 1800)
  }

  const move = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(orderedIds.length - 1, activeIndex + direction))
    if (next !== activeIndex) goTo(orderedIds[next])
  }

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (detailOpen || contactOpen) return
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
    if (active === 'index') return <IndexCopy openDetail={openDetail} />
    if (active === 'work') return <WorkCopy openDetail={openDetail} />
    if (active === 'lab') return <LabCopy openDetail={openDetail} />
    if (active === 'space') return <SpaceCopy openDetail={openDetail} />
    return <PeopleCopy openDetail={openDetail} />
  }, [active, uiAudio.enabled])

  const pokeCat = () => {
    uiAudio.play('cat')
    const next = catPokes + 1
    setCatPokes(next)
    const messages = ['meow.exe started', 'incident commander: check the logs', 'please stop poking prod', 'fine. you found the cat. 🐈']
    setToast(messages[Math.min(next - 1, messages.length - 1)])
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className={`app-shell chapter-${active} ${lightsOn ? 'lights-on' : 'lights-off'}`} style={{ '--chapter-accent': meta.color } as CSSProperties}>
      <a className="skip-link" href="#chapter-content">Skip to content</a>
      <div className="desk-noise" aria-hidden="true" />

      <header className="app-bar">
        <button className="brand" onClick={() => goTo('index')} aria-label="Go to index"><span>EW</span><b>FIELD NOTES</b></button>
        <LiveClock />
        <div className="top-links">
          <a href="./resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ</a>
          <a href="https://github.com/jumiknows" target="_blank" rel="noreferrer">GITHUB</a>
          <button className="top-link-button" type="button" onClick={openContact}>SAY HELLO ↗</button>
          <span className="utility-divider" aria-hidden="true" />
          <button className="top-control" type="button" aria-pressed={lightsOn} onClick={toggleLamp} title={lightsOn ? 'Turn the desk lamp off' : 'Turn the desk lamp on'}>
            <span aria-hidden="true">◐</span><b>{lightsOn ? 'LIGHT ON' : 'LIGHT OFF'}</b>
          </button>
          <button className="top-control" type="button" aria-pressed={uiAudio.enabled} onClick={uiAudio.toggle} title={uiAudio.enabled ? 'Turn interface sound off' : 'Turn interface sound on'}>
            <span aria-hidden="true">♪</span><b>{uiAudio.enabled ? 'SOUND ON' : 'SOUND'}</b>
          </button>
        </div>
      </header>

      <main className="viewport-stage">
        <div className="dossier-shell">
          <nav className="desktop-tabs" aria-label="Portfolio chapters">
            {chapters.map((chapter) => (
              <button key={chapter.id} className={chapter.id === active ? 'active' : ''} onClick={() => goTo(chapter.id)} aria-keyshortcuts={String(chapters.indexOf(chapter) + 1)}>
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
                    <VisualOverlay chapter={active} clean={clean} setClean={setClean} onSound={uiAudio.play} goTo={goTo} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>
          </div>
        </div>

        {!isMobile && (
          <div className="keyboard-hint" aria-label="Keyboard shortcuts">
            <span><kbd>1-5</kbd> jump to a chapter</span>
            <i aria-hidden="true" />
            <span><kbd>←</kbd><kbd>→</kbd> switch chapters</span>
          </div>
        )}

        {isMobile && (
          <div className="mobile-edge-controls" aria-hidden="true">
            <button disabled={activeIndex === 0} onClick={() => move(-1)} aria-label="Previous chapter">‹</button>
            <span>{meta.number} / 04</span>
            <button disabled={activeIndex === orderedIds.length - 1} onClick={() => move(1)} aria-label="Next chapter">›</button>
          </div>
        )}
      </main>

      {isMobile && <MobileDock active={active} goTo={goTo} />}

      <AnimatePresence>{detailOpen && <DetailSheet chapter={active} onClose={closeDetail} />}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactSheet onClose={closeContact} onCopyEmail={copyEmail} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
      <AnimatePresence>{isMobile && showSwipeHint && <motion.div className="swipe-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span>←</span> swipe between chapters <span>→</span></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App
