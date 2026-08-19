import { useEffect, useMemo, useState } from 'react';
import { builds, folders, people, profile, work, type FolderKey } from './data';

const Arrow = () => <span aria-hidden="true">↗</span>;

function FolderIcon({ tone, open = false }: { tone: string; open?: boolean }) {
  return <span className={`folderIcon tone-${tone} ${open ? 'isOpen' : ''}`} aria-hidden="true"><i /></span>;
}

function FileIcon({ type = 'txt' }: { type?: string }) {
  return <span className={`fileIcon file-${type}`} aria-hidden="true"><i>{type}</i></span>;
}

function OrbitToy() {
  const [launches, setLaunches] = useState(0);
  return (
    <button
      className={`orbitToy ${launches ? 'launched' : ''}`}
      onClick={() => setLaunches((value) => value + 1)}
      aria-label="Launch the tiny satellite"
      title="poke the satellite"
    >
      <span className="orbitRing" />
      <span className="planet">EW</span>
      <span className="satellite">✦</span>
      {launches >= 3 && <span className="egg">okay, mission control 😭</span>}
    </button>
  );
}

function DesktopFolder({
  item,
  active,
  onOpen,
}: {
  item: (typeof folders)[number];
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <button className={`desktopFolder ${active ? 'active' : ''}`} onClick={onOpen}>
      <FolderIcon tone={item.tone} open={active} />
      <strong>{item.label}/</strong>
      <small>{item.hint}</small>
    </button>
  );
}

function HomeView({ onOpen }: { onOpen: (key: FolderKey) => void }) {
  return (
    <div className="view homeView">
      <div className="introGrid">
        <section className="helloPaper">
          <div className="paperClip" aria-hidden="true" />
          <span className="kicker">hello.txt</span>
          <h1>Hi, I’m Ernest.</h1>
          <p>
            I like turning messy systems into things people can trust — then finding the people who make building them fun.
          </p>
          <div className="scribble">ship useful things ✳</div>
        </section>
        <OrbitToy />
      </div>

      <div className="sectionLabel"><span>folders</span><i /></div>
      <div className="folderGrid">
        {folders.map((item) => (
          <DesktopFolder key={item.key} item={item} active={false} onOpen={() => onOpen(item.key)} />
        ))}
      </div>

      <div className="sectionLabel"><span>recently opened</span><i /></div>
      <div className="recentGrid">
        <button className="recentFile" onClick={() => onOpen('work')}>
          <FileIcon type="prod" />
          <div><strong>production.deploy</strong><span>$100M+ platform · releases · debugging</span></div>
          <Arrow />
        </button>
        <button className="recentFile" onClick={() => onOpen('builds')}>
          <FileIcon type="ml" />
          <div><strong>CleanListen.ml</strong><span>research PDFs → cleaner listening</span></div>
          <Arrow />
        </button>
        <button className="recentFile" onClick={() => onOpen('space')}>
          <FileIcon type="orb" />
          <div><strong>balloon.mission</strong><span>~30 km · 10+ sensors · lots of zip ties</span></div>
          <Arrow />
        </button>
      </div>
    </div>
  );
}

function WorkView() {
  return (
    <div className="view">
      <div className="viewHeader">
        <div><span className="kicker">work/</span><h2>Software that has to survive contact with reality.</h2></div>
        <div className="stamp">PROD<br /><b>VERIFIED</b></div>
      </div>
      <div className="fileStack">
        {work.map((item, index) => (
          <article className="paperFile" key={item.organization}>
            <div className="fileNumber">0{index + 1}</div>
            <div className="paperMain">
              <div className="meta"><strong>{item.organization}</strong><span>{item.period}</span></div>
              <h3>{item.role}</h3>
              <p>{item.blurb}</p>
              <div className="evidenceRow">{item.evidence.map((fact) => <span key={fact}>{fact}</span>)}</div>
              <div className="miniTags">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <aside className="marginNote">Most satisfying bug: the one that looked random until the logs finally told the truth.</aside>
    </div>
  );
}

function BuildsView() {
  return (
    <div className="view">
      <div className="viewHeader">
        <div><span className="kicker">builds/</span><h2>Things you can actually poke.</h2></div>
        <span className="handNote">no lorem ipsum projects →</span>
      </div>
      <div className="buildGrid">
        {builds.map((item, index) => (
          <a className={`buildCard build-${index + 1}`} href={item.href} target="_blank" rel="noreferrer" key={item.name}>
            <div className="buildTab"><FileIcon type={item.extension.slice(1)} /><span>{item.name}{item.extension}</span></div>
            <h3>{item.name}</h3>
            <p>{item.blurb}</p>
            <div className="metricTape">{item.evidence.map((metric) => <span key={metric}>{metric}</span>)}</div>
            <div className="miniTags">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
            <span className="openRepo">open repository <Arrow /></span>
          </a>
        ))}
      </div>
    </div>
  );
}

function SpaceView() {
  return (
    <div className="view spaceView">
      <div className="viewHeader"><div><span className="kicker">space/</span><h2>I did, in fact, send code into the sky.</h2></div></div>
      <div className="missionBoard">
        <div className="missionPath"><span className="earth">Earth</span><i /><span className="altitude">~30 km</span><i /><span className="orbit">orbit-ish ambitions</span></div>
        <div className="missionCards">
          <article><span>01 · ALEASAT</span><h3>Mission operations</h3><p>Telemetry visualization and command workflows supporting an ESA mission targeting a 2028 SpaceX launch.</p><b>React · AWS · OpenShift</b></article>
          <article><span>02 · HAB</span><h3>High-altitude balloon</h3><p>Led PDR, CDR, and FRR through a flight reaching roughly 30 km with 10+ sensors and subsystems.</p><b>Python · Raspberry Pi · radios</b></article>
        </div>
      </div>
      <div className="spaceSticker">mission rule #1: test the boring stuff ✦</div>
    </div>
  );
}

function PeopleView() {
  return (
    <div className="view">
      <div className="viewHeader"><div><span className="kicker">people/</span><h2>The part of engineering I don’t want to automate.</h2></div></div>
      <div className="polaroidGrid">
        {people.map(([title, copy], index) => (
          <article className={`polaroid p${index + 1}`} key={title}>
            <div className="photoPlaceholder"><span>{index === 0 ? '300+' : index === 1 ? '100+' : '200'}</span><small>{index === 0 ? 'attendees' : index === 1 ? 'students' : 'emails'}</small></div>
            <h3>{title}</h3><p>{copy}</p>
          </article>
        ))}
      </div>
      <p className="peopleFooter">The goal isn’t to be the smartest person in the room. It’s to leave the room more capable than you found it.</p>
    </div>
  );
}

function MiscView() {
  return (
    <div className="view">
      <div className="viewHeader"><div><span className="kicker">misc/</span><h2>Unsorted, but important.</h2></div></div>
      <div className="miscBoard">
        <div className="sticky s1"><b>📻 amateur radio</b><span>because apparently normal hobbies were unavailable</span></div>
        <div className="sticky s2"><b>🏴 Glasgow</b><span>field studies in cybercrime · 2024</span></div>
        <div className="sticky s3"><b>☕ community</b><span>I will turn a technical topic into a coffee chat if given enough time</span></div>
        <div className="sticky s4"><b>🛰 current bias</b><span>ownership &gt; titles<br />people &gt; logos<br />shipping &gt; talking</span></div>
      </div>
      <div className="terminal">
        <div className="terminalTop"><i /><i /><i /><span>ernest@workbench:~</span></div>
        <div className="terminalBody"><span>$ whoami</span><b>builder / teammate / professional debugger of “it works on my machine”</b><span>$ status</span><b>still curious</b><span className="cursor">$ █</span></div>
      </div>
    </div>
  );
}

export default function App() {
  const [folder, setFolder] = useState<FolderKey>('home');
  const [time, setTime] = useState('');
  const title = useMemo(() => folder === 'home' ? '~ / ernest-wong' : `~ / ernest-wong / ${folder}`, [folder]);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit' }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const renderView = () => {
    if (folder === 'work') return <WorkView />;
    if (folder === 'builds') return <BuildsView />;
    if (folder === 'space') return <SpaceView />;
    if (folder === 'people') return <PeopleView />;
    if (folder === 'misc') return <MiscView />;
    return <HomeView onOpen={setFolder} />;
  };

  return (
    <main className="desktop">
      <div className="wallpaperShape shapeA" /><div className="wallpaperShape shapeB" /><div className="wallpaperShape shapeC" />
      <div className="menuBar">
        <button className="menuName" onClick={() => setFolder('home')}>EW</button>
        <span className="menuItem">File</span><span className="menuItem">Build</span><span className="menuItem">Ship</span>
        <div className="menuRight"><span>Vancouver</span><span>{time}</span></div>
      </div>

      <section className="explorerWindow">
        <header className="windowBar">
          <div className="traffic"><button onClick={() => setFolder('home')} aria-label="Home" /><i /><i /></div>
          <div className="windowTitle"><button onClick={() => setFolder('home')}>⌂</button><span>{title}</span></div>
          <a className="tinyResume" href={profile.resume} target="_blank">resume.pdf</a>
        </header>
        <div className="explorerBody">
          <aside className="sidebar">
            <div className="sideProfile"><div className="avatar">EW</div><div><strong>Ernest Wong</strong><span>software engineer</span></div></div>
            <span className="sideLabel">FAVORITES</span>
            <button className={folder === 'home' ? 'selected' : ''} onClick={() => setFolder('home')}><span>⌂</span>Home</button>
            {folders.map((item) => <button key={item.key} className={folder === item.key ? 'selected' : ''} onClick={() => setFolder(item.key)}><FolderIcon tone={item.tone} open={folder === item.key} />{item.label}</button>)}
            <span className="sideLabel">LINKS</span>
            <a href={profile.github} target="_blank" rel="noreferrer"><span>⌘</span>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>in</span>LinkedIn</a>
            <a href={`mailto:${profile.email}`}><span>@</span>Email</a>
            <div className="sidebarNote">available for<br /><b>ambitious problems</b><i /></div>
          </aside>
          <section className="contentPanel" key={folder}>{renderView()}</section>
        </div>
      </section>

      <nav className="dock" aria-label="Quick links">
        <button onClick={() => setFolder('home')} title="Home"><span className="dockAvatar">EW</span></button>
        <button onClick={() => setFolder('work')} title="Work"><FolderIcon tone="blue" /></button>
        <button onClick={() => setFolder('builds')} title="Builds"><FolderIcon tone="orange" /></button>
        <button onClick={() => setFolder('space')} title="Space"><span className="dockGlyph">✦</span></button>
        <i />
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub"><span className="dockGlyph">⌘</span></a>
        <a href={profile.resume} target="_blank" title="Résumé"><FileIcon type="pdf" /></a>
      </nav>
    </main>
  );
}
