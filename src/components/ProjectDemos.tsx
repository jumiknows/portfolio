import { useState } from 'react'
import type { ProjectId } from '../content'

const releaseLogs = [
  ['ready for the maintenance window', 'checks are waiting', 'coffee is still warm'],
  ['preflight passed', 'database change checked', 'application healthy', 'release confirmed'],
  ['preflight passed', 'application returned 404', 'compared with UAT', 'config drift found', 'fixed and verified'],
]

function ReleaseDemo() {
  const [run, setRun] = useState(0)
  const lines = run === 0 ? releaseLogs[0] : releaseLogs[run % 2 ? 1 : 2]

  return (
    <div className="release-toy toy" aria-label="Interactive release drill">
      <div className="toy-bar"><span>release_drill.txt</span><i aria-hidden="true" /></div>
      <div className="environment-row" aria-hidden="true">
        <span>DEV</span><span>QA</span><span>UAT</span><b>PROD</b>
      </div>
      <div className="release-log" role="log" aria-live="polite">
        {lines.map((line, index) => (
          <p key={line}><span>{index === 0 ? '$' : '✓'}</span>{line}</p>
        ))}
      </div>
      <button type="button" onClick={() => setRun((value) => value + 1)}>
        {run === 0 ? 'Run a release drill' : 'Run it again'}
      </button>
      <small>The healthy path and the messy path alternate.</small>
    </div>
  )
}

function CleanListenDemo() {
  const [clean, setClean] = useState(false)

  return (
    <div className={`clean-toy toy ${clean ? 'is-clean' : ''}`} aria-label="Interactive CleanListen example">
      <div className="toy-bar"><span>{clean ? 'listening copy' : 'raw PDF extraction'}</span><i aria-hidden="true" /></div>
      <div className="paper-sample" aria-live="polite">
        <span className="pdf-noise">JOURNAL OF EXAMPLE RESEARCH / PAGE 7</span>
        <h4>3. Methods</h4>
        <p>We evaluate the proposed method on a held out set of research documents.</p>
        <span className="pdf-noise">Downloaded from publisher.example / © Example Publisher</span>
        <p>The classifier predicts whether each extracted line should be kept for listening.</p>
        <span className="pdf-noise">References 42 to 67 / Return to navigation</span>
      </div>
      <button type="button" aria-pressed={clean} onClick={() => setClean((value) => !value)}>
        {clean ? 'Bring the noise back' : 'Clean this page'}
      </button>
      <small>The paper stays. The page furniture goes.</small>
    </div>
  )
}

function FlightDemo() {
  const [ping, setPing] = useState(0)
  const message = ping === 0
    ? 'payload waiting for command'
    : ping % 2
      ? 'packet received / sensors nominal'
      : 'packet received / temperature updated'

  return (
    <div className="space-toy toy" aria-label="Interactive high altitude balloon telemetry example">
      <div className="toy-bar"><span>HAB / flight console</span><i aria-hidden="true" /></div>
      <div className="altitude-readout">
        <div><span>ALTITUDE</span><strong>29.8</strong><small>km</small></div>
        <div><span>SENSORS</span><strong>10</strong><small>online</small></div>
      </div>
      <div className="signal-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <p className="telemetry-message" role="status">{message}</p>
      <button type="button" onClick={() => setPing((value) => value + 1)}>Ping the payload</button>
      <small>A tiny stand in for a much less tidy radio link.</small>
    </div>
  )
}

export function ProjectDemo({ projectId }: { projectId: ProjectId }) {
  if (projectId === 'production') return <ReleaseDemo />
  if (projectId === 'cleanlisten') return <CleanListenDemo />
  return <FlightDemo />
}
