import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { experience, focusAreas, profile, projects, skills } from './data';

type Point = {
  x: number;
  y: number;
};

const GRID_SIZE = 8;
const WIN_SCORE = 8;
const TRAIL_LIFETIME_MS = 680;
// Easter egg keyboard sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  bornAt: number;
};

type OrbBurst = {
  id: number;
  x: number;
  y: number;
};

type OrbConfig = {
  name: string;
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
};

const ORBS: readonly OrbConfig[] = [
  { name: 'one', left: '7%', top: '10%', size: '92px', duration: '34s', delay: '-7s' },
  { name: 'two', left: '24%', top: '76%', size: '118px', duration: '40s', delay: '-16s' },
  { name: 'three', left: '37%', top: '34%', size: '86px', duration: '36s', delay: '-11s' },
  { name: 'four', left: '53%', top: '82%', size: '132px', duration: '44s', delay: '-19s' },
  { name: 'five', left: '64%', top: '18%', size: '102px', duration: '38s', delay: '-9s' },
  { name: 'six', left: '79%', top: '62%', size: '142px', duration: '42s', delay: '-14s' },
  { name: 'seven', left: '88%', top: '26%', size: '95px', duration: '37s', delay: '-4s' },
  { name: 'eight', left: '47%', top: '50%', size: '110px', duration: '41s', delay: '-21s' },
];

function randomPoint(exclude: Point): Point {
  const point = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };

  if (point.x === exclude.x && point.y === exclude.y) {
    return randomPoint(exclude);
  }

  return point;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
};

function ButtonLink({ href, children, variant = 'primary', external = false }: ButtonLinkProps) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  headingId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  headingId?: string;
}) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

// TypedSectionHeader: moves the typing animation to section headers (used for the Focus section)
function TypedSectionHeader({
  eyebrow,
  title,
  description,
  headingId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  headingId?: string;
}) {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setTyped(title);
      return;
    }

    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

    (async () => {
      const glitch = ' ###';
      const charDelay = 80; // slower, per-letter reveal
      const glitchCharDelay = 120;
      const deleteDelay = 36;
      while (!cancelled) {
        for (let i = 1; i <= title.length && !cancelled; i += 1) {
          setTyped(title.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await wait(charDelay);
        }
        // pause on full
        // eslint-disable-next-line no-await-in-loop
        await wait(900);

        // glitch
        for (let i = 1; i <= glitch.length && !cancelled; i += 1) {
          setTyped(title + glitch.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await wait(glitchCharDelay);
        }

        // pause and then delete
        // eslint-disable-next-line no-await-in-loop
        await wait(540);
        const full = title + glitch;
        for (let i = full.length; i >= 0 && !cancelled; i -= 1) {
          setTyped(full.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await wait(deleteDelay);
        }

        // small pause and repeat
        // eslint-disable-next-line no-await-in-loop
        await wait(320);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [title]);

  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId} aria-label={title}>
        <span aria-hidden>{typed || '\u00A0'}</span>
        <span className="typing-caret" aria-hidden />
      </h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// ScrollLaunchRocket: a scroll-linked launch track that feels like a cinematic reveal
function ScrollLaunchRocket() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setProgress(1);
      return;
    }

    const section = document.getElementById('focus');
    if (!section) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.78;
      const end = -Math.max(rect.height * 0.4, 420);
      const raw = (start - rect.top) / (start - end);
      const nextProgress = clamp(raw, 0, 1);
      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const offsetY = 290 - progress * 760;
  const offsetX = -120 + progress * 18;
  const scale = 0.96 + progress * 0.14;
  const opacity = clamp((progress - 0.04) / 0.16, 0, 1);

  return (
    <div className="launch-rocket" aria-hidden="true">
      <div className="launch-rocket__track" />
      <div
        className="launch-rocket__rocket"
        style={{
          opacity,
          transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale}) rotate(-14deg)`,
        }}
      >
        <span className="launch-rocket__body" />
        <span className="launch-rocket__window" />
        <span className="launch-rocket__fin launch-rocket__fin--left" />
        <span className="launch-rocket__fin launch-rocket__fin--right" />
        <span className="launch-rocket__flame" />
        <span className="launch-rocket__smoke launch-rocket__smoke--one" />
        <span className="launch-rocket__smoke launch-rocket__smoke--two" />
        <span className="launch-rocket__smoke launch-rocket__smoke--three" />
      </div>
    </div>
  );
}

function TagList({ items }: { items: readonly string[] }) {
  return (
    <div className="tag-list" aria-label="Technologies and focus areas">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function AmbientEffects() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [poppedOrbs, setPoppedOrbs] = useState<string[]>([]);
  const [bursts, setBursts] = useState<OrbBurst[]>([]);
  const [cursor, setCursor] = useState<Point | null>(null);
  const idRef = useRef(0);
  const burstIdRef = useRef(0);
  const latestMoveAtRef = useRef(0);
  const burstTimeoutsRef = useRef<number[]>([]);

  const triggerOrbPop = useCallback((orb: OrbConfig, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const burstId = burstIdRef.current++;
    const rect = event.currentTarget.getBoundingClientRect();

    setPoppedOrbs((previous) => (previous.includes(orb.name) ? previous : [...previous, orb.name]));
    setBursts((previous) => [
      ...previous,
      {
        id: burstId,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    ]);

    const timeoutId = window.setTimeout(() => {
      setPoppedOrbs((previous) => previous.filter((name) => name !== orb.name));
      setBursts((previous) => previous.filter((burst) => burst.id !== burstId));
    }, 780);

    burstTimeoutsRef.current.push(timeoutId);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }

      const now = performance.now();
      if (now - latestMoveAtRef.current < 20) {
        return;
      }
      latestMoveAtRef.current = now;

      setTrail((previous) => [
        ...previous.slice(-22),
        {
          id: idRef.current++,
          x: event.clientX,
          y: event.clientY,
          bornAt: Date.now(),
        },
      ]);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    const handleCursorMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }

      setCursor({ x: event.clientX, y: event.clientY });
    };

    const clearCursor = () => {
      setCursor(null);
    };

    window.addEventListener('pointermove', handleCursorMove, { passive: true });
    window.addEventListener('pointerleave', clearCursor);
    window.addEventListener('blur', clearCursor);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointermove', handleCursorMove);
      window.removeEventListener('pointerleave', clearCursor);
      window.removeEventListener('blur', clearCursor);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const cutoff = Date.now() - TRAIL_LIFETIME_MS;
      setTrail((previous: TrailPoint[]) => previous.filter((point) => point.bornAt > cutoff));
    }, 70);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    return () => {
      burstTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const latestPoint = trail[trail.length - 1];

  const getOrbOffset = useCallback(
    (orb: OrbConfig) => {
      if (!cursor) {
        return { x: 0, y: 0 };
      }

      const width = window.innerWidth || document.documentElement.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight;
      const size = Number.parseFloat(orb.size);
      const centerX = (Number.parseFloat(orb.left) / 100) * width + size / 2;
      const centerY = (Number.parseFloat(orb.top) / 100) * height + size / 2;
      const dx = centerX - cursor.x;
      const dy = centerY - cursor.y;
      const distance = Math.hypot(dx, dy);
      const influenceRadius = 240;

      if (distance === 0 || distance >= influenceRadius) {
        return { x: 0, y: 0 };
      }

      const strength = Math.pow(1 - distance / influenceRadius, 2);
      const push = 18 * strength;
      return {
        x: (dx / distance) * push,
        y: (dy / distance) * push,
      };
    },
    [cursor]
  );

  return (
    <div className="fx-layer">
      {ORBS.map((orb) => (
        <button
          aria-label="Pop bubble"
          className={`orb orb--${orb.name} ${poppedOrbs.includes(orb.name) ? 'orb--popped' : ''}`}
          key={orb.name}
          onClick={(event) => triggerOrbPop(orb, event)}
          style={{
            '--left': orb.left,
            '--top': orb.top,
            '--size': orb.size,
            '--duration': orb.duration,
            '--delay': orb.delay,
            '--repel-x': `${getOrbOffset(orb).x}px`,
            '--repel-y': `${getOrbOffset(orb).y}px`,
          } as CSSProperties}
          type="button"
        >
          <span className="orb__core" />
        </button>
      ))}

      {bursts.map((burst) => (
        <span className="orb-burst" key={burst.id} style={{ left: burst.x, top: burst.y }} />
      ))}

      {trail.map((point) => (
        <span className="trail-star" key={point.id} style={{ left: point.x, top: point.y }} />
      ))}

      {latestPoint ? <span className="cursor-star" style={{ left: latestPoint.x, top: latestPoint.y }} /> : null}
    </div>
  );
}

function InteractiveLab() {
  const [player, setPlayer] = useState<Point>({ x: 0, y: 0 });
  const [target, setTarget] = useState<Point>({ x: 4, y: 4 });
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(24);
  const [status, setStatus] = useState<'playing' | 'won' | 'ended'>('playing');

  const resetGame = useCallback(() => {
    const start = { x: 0, y: 0 };
    setPlayer(start);
    setTarget(randomPoint(start));
    setScore(0);
    setMoves(24);
    setStatus('playing');
  }, []);

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      if (status !== 'playing') {
        return;
      }

      setPlayer((previous) => {
        const next = {
          x: Math.max(0, Math.min(GRID_SIZE - 1, previous.x + dx)),
          y: Math.max(0, Math.min(GRID_SIZE - 1, previous.y + dy)),
        };

        if (next.x === previous.x && next.y === previous.y) {
          return previous;
        }

        const collected = next.x === target.x && next.y === target.y;

        setMoves((value) => {
          const updated = Math.max(0, value - 1);
          if (updated === 0) {
            setStatus((current) => (current === 'playing' ? 'ended' : current));
          }
          return updated;
        });

        if (collected) {
          setScore((value) => {
            const updated = value + 1;
            if (updated >= WIN_SCORE) {
              setStatus('won');
            }
            return updated;
          });
          setTarget(randomPoint(next));
        }

        return next;
      });
    },
    [status, target]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        movePlayer(0, -1);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        movePlayer(0, 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        movePlayer(-1, 0);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        movePlayer(1, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  const gameMessage =
    status === 'won'
      ? 'Mission complete. Target lock achieved.'
      : status === 'ended'
        ? 'Mission ended. Reset and run it back.'
        : 'Use arrow keys (or buttons) to collect target nodes.';

  return (
    <section className="section section--lab" id="lab">
      <SectionHeader
        eyebrow="Interactive lab"
        title="A little terminal energy + mini game"
        description="Fun easter eggs can make a portfolio memorable. This keeps it lightweight while still showing implementation polish."
      />

      <div className="lab-grid">
        <article className="terminal-card" aria-label="Terminal style activity log">
          <p className="terminal-card__title">mission-console.log</p>
          <ul className="terminal-lines">
            {[
              'init:: loading telemetry adapters',
              'auth:: session token issued',
              'ci/cd:: release checklist verified',
              'infra:: drift scan clean across 8 environments',
              'ops:: deployment status green',
            ].map((line, index) => (
              <li key={line} className={`terminal-line terminal-line--${index + 1}`}>
                <span>$</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="terminal-tip">Try typing “orbit” or ↑ ↑ ↓ ↓ ← → ← → B A.</p>
        </article>

        <article className="mini-game-card" aria-label="Mini game">
          <div className="mini-game-card__header">
            <h3>Grid Ops</h3>
            <p>
              Score: <strong>{score}</strong> / {WIN_SCORE} · Moves left: <strong>{moves}</strong>
            </p>
          </div>

          <p className="mini-game-card__message">{gameMessage}</p>

          <div className="game-grid" role="img" aria-label="Game board">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isPlayer = player.x === x && player.y === y;
              const isTarget = target.x === x && target.y === y;

              return (
                <span
                  className={`game-cell ${isPlayer ? 'game-cell--player' : ''} ${isTarget ? 'game-cell--target' : ''}`}
                  key={`${x}-${y}`}
                />
              );
            })}
          </div>

          <div className="game-controls" aria-label="Game controls">
            <button type="button" onClick={() => movePlayer(0, -1)}>
              ↑
            </button>
            <div>
              <button type="button" onClick={() => movePlayer(-1, 0)}>
                ←
              </button>
              <button type="button" onClick={() => movePlayer(1, 0)}>
                →
              </button>
            </div>
            <button type="button" onClick={() => movePlayer(0, 1)}>
              ↓
            </button>
            <button type="button" className="game-controls__reset" onClick={resetGame}>
              Reset
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

function App() {
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;
  const [hyperMode, setHyperMode] = useState(false);
  const [easterToast, setEasterToast] = useState('');
  const [orbitBurstId, setOrbitBurstId] = useState(0);
  const konamiProgress = useRef<string[]>([]);
  const typeBuffer = useRef('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      // Secret #1: Konami code toggles Hyper Mode.
      const nextKonami = [...konamiProgress.current, key].slice(-KONAMI_SEQUENCE.length);
      konamiProgress.current = nextKonami;
      if (nextKonami.join('|') === KONAMI_SEQUENCE.join('|')) {
        setHyperMode((enabled) => !enabled);
        setEasterToast('Hyper mode unlocked ⚡');
        konamiProgress.current = [];
      }

      // Secret #2: typing "orbit" triggers the emoji burst.
      if (event.key.length === 1) {
        typeBuffer.current = `${typeBuffer.current}${event.key.toLowerCase()}`.slice(-12);
        if (typeBuffer.current.includes('orbit')) {
          setOrbitBurstId((value) => value + 1);
          setEasterToast('Orbit burst deployed ✨');
          typeBuffer.current = '';
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className={hyperMode ? 'hyper-mode' : undefined}>
      <a className="skip-link" href="#top">
        Skip to content
      </a>

      <AmbientEffects />

      <ScrollLaunchRocket />

      {easterToast ? (
        <div className="easter-toast" role="status" aria-live="polite">
          {easterToast}
        </div>
      ) : null}

      {orbitBurstId ? (
        <div className="orbit-burst" aria-hidden="true" key={orbitBurstId}>
          {['🛰️', '✨', '🔵', '☄️', '⚙️', '💫'].map((item, index) => (
            <span className={`orbit-burst__item orbit-burst__item--${index + 1}`} key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ernest Wong homepage">
          <span
            className="brand-mark"
            onDoubleClick={() => {
              setHyperMode((enabled) => !enabled);
              setEasterToast('Secret toggle activated 🚀');
            }}
            title="Double-click for secret mode"
          >
            EW
          </span>
          <span>
            <strong>Ernest Wong</strong>
            <small>Software · Cloud · Mission Systems</small>
          </span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#lab">Lab</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__content">
          <p className="hero__pill">Open to platform, cloud, SRE, developer tools, and mission software roles</p>
          <h1>I build software that teams can trust in production.</h1>
          <p className="hero__text">
            Computer Science student with hands-on experience in CI/CD, cloud automation, telemetry, and reliability.
            I focus on the layer where software engineering meets operations.
          </p>
          <div className="hero__actions">
            <ButtonLink href={`mailto:${profile.email}`}>Contact me</ButtonLink>
            <ButtonLink href={resumeHref} variant="secondary" external>
              View resume
            </ButtonLink>
          </div>
          <TagList items={['Production deployments', 'CI/CD automation', 'Cloud systems', 'Satellite software']} />
        </div>

        <aside className="hero-card" aria-label="Portfolio highlights">
          <p className="eyebrow">Current direction</p>
          <h2>Platform engineering with mission focus.</h2>
          <p>
            My strongest fit is building tools, dashboards, and infrastructure workflows that help technical teams ship
            safely and move faster.
          </p>
          <dl className="stats-grid">
            <div>
              <dt>50+</dt>
              <dd>applications supported</dd>
            </div>
            <div>
              <dt>8+</dt>
              <dd>environments monitored</dd>
            </div>
            <div>
              <dt>$100M+</dt>
              <dd>portal impact</dd>
            </div>
            <div>
              <dt>30 km</dt>
              <dd>balloon mission altitude</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section section--compact" id="focus" aria-labelledby="focus-title">
        <TypedSectionHeader eyebrow="Focus" title="How I help teams ship faster" headingId="focus-title" />
        <div className="card-grid card-grid--four">
          {focusAreas.map((area) => (
            <article className="card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <SectionHeader
          eyebrow="Experience"
          title="Production work across cloud, mission software, and AI security"
          description="I ship reliable releases, automate repetitive workflows, improve infrastructure consistency, and build tools that support real operations."
        />
        <div className="timeline">
          {experience.map((job) => (
            <article className="experience-card" key={`${job.organization}-${job.role}`}>
              <div className="experience-card__header">
                <div>
                  <h3>{job.role}</h3>
                  <p>{job.organization}</p>
                </div>
                <span>{job.period}</span>
              </div>
              <TagList items={job.tags} />
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--light" id="projects">
        <SectionHeader
          eyebrow="Projects"
          title="Selected systems and tooling"
          description="Short case studies showing my approach: identify risk, build practical solutions, and measure impact."
        />
        <div className="card-grid card-grid--two">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <p className="project-card__label">{project.label}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <dl className="project-highlights" aria-label={`${project.title} case study highlights`}>
                <div>
                  <dt>Challenge</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div>
                  <dt>Build</dt>
                  <dd>{project.build}</dd>
                </div>
                <div>
                  <dt>Impact</dt>
                  <dd>{project.impact}</dd>
                </div>
              </dl>
              <TagList items={project.stack} />
              {project.link ? (
                <a className="project-card__link" href={project.link} target="_blank" rel="noreferrer">
                  {project.link.includes('github.com') ? 'View code' : 'View project'}
                </a>
              ) : (
                <a className="project-card__link" href={`mailto:${profile.email}?subject=Project%20demo%20request`}>
                  Request demo
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <SectionHeader
          eyebrow="Skills"
          title="Technical toolkit"
          description="A practical stack for building, shipping, and supporting production software." 
        />
        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.category}>
              <h3>{group.category}</h3>
              <TagList items={group.items} />
            </article>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div>
          <p className="eyebrow">Why me</p>
          <h2>My edge is the bridge between code and operations.</h2>
          <p>
            I turn messy workflows into dependable systems. I care about clear communication, safe releases, and tools
            that help teams move faster without breaking trust.
          </p>
        </div>
        <div className="why-grid">
          <article>
            <h3>Builder</h3>
            <p>I turn repetitive work into repeatable tooling and automation.</p>
          </article>
          <article>
            <h3>Operator</h3>
            <p>I understand release windows, reliability risks, and cross-team coordination under pressure.</p>
          </article>
          <article>
            <h3>Systems-minded</h3>
            <p>I enjoy mission-critical, telemetry-heavy, and hardware-adjacent software.</p>
          </article>
          <article>
            <h3>Human-centered</h3>
            <p>I prioritize user clarity, documentation quality, and collaborative execution.</p>
          </article>
        </div>
      </section>

      <InteractiveLab />

      <section className="section contact-section" id="contact">
        <div className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2>Let’s build resilient systems together.</h2>
          <p>
            I am looking for roles in platform engineering, cloud infrastructure, SRE, developer tooling, backend
            systems, and mission operations software. If you are hiring, I would love to connect.
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={resumeHref} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Ernest Wong</p>
        <p>{profile.location}</p>
      </footer>
    </main>
  );
}

export default App;
