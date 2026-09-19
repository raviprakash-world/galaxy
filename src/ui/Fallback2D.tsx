import { useState } from 'react'
import { ENTRIES } from '../data/search'
import { Visual } from './Visual'

/** No-WebGL experience: the same catalogue as a 2D atlas. */
export function Fallback2D() {
  const [id, setId] = useState('earth')
  const e = ENTRIES.find((x) => x.id === id)!
  return (
    <main style={{ position: 'fixed', inset: 0, overflow: 'auto', padding: '84px var(--pad) 32px', display: 'grid', gridTemplateColumns: 'minmax(180px, 260px) 1fr', gap: 32, alignItems: 'start' }} className="fallback">
      <header className="topbar"><span className="wordmark">GALAXY</span><span className="eyebrow">2D atlas</span></header>
      <div style={{ gridColumn: '1 / -1', color: 'var(--dim)', maxWidth: 640 }}>
        <div className="label" style={{ color: 'var(--accent)' }}>Celestial visualization unavailable</div>
        <p style={{ margin: '6px 0 0' }}>Your browser or device could not start WebGL, so the 3D universe cannot be shown. Everything is still here as a 2D atlas.</p>
      </div>
      <nav aria-label="Objects">
        {ENTRIES.map((x) => <button key={x.id} className="list-row" aria-current={x.id === id} onClick={() => setId(x.id)}><div className="n" style={{ color: x.id === id ? 'var(--fg)' : 'var(--dim)' }}>{x.name}</div><div className="m"><span>{x.type}</span></div></button>)}
      </nav>
      <article style={{ maxWidth: 560 }} aria-live="polite">
        <Visual id={e.id} label={`Illustration of ${e.name}`} square />
        <h1 style={{ fontWeight: 200, letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: 34, margin: '18px 0 4px' }}>{e.name}</h1>
        <div className="eyebrow">{e.type} · {e.distance}</div>
        <p style={{ color: '#c8cddb' }}>{e.description}</p>
        <ul className="facts">{e.facts.map((f) => <li key={f}>{f}</li>)}</ul>
      </article>
    </main>
  )
}
