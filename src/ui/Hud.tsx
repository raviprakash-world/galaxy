import { useStore, type View } from '../store'
import { getBody } from '../data/planets'
import { PLANETS } from '../data/planets'
import { fmtDec, fmtRA, getDeep } from '../data/deepspace'

const Meta = ({ k, v }: { k: string; v: string }) => (<div><div className="label">{k}</div><div className="value" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 12 }}>{v}</div></div>)

function readout(view: View, selected: string | null, deepId: string | null): [string, string][] {
  const b = getBody(selected), d = getDeep(deepId)
  if (view === 'hero') return [['Distance', '149.6M km from Sun'], ['System', 'Solar System'], ['Class', 'G-type star']]
  if (b) return [['Distance', b.id === 'sun' ? '149.6M km from Earth' : b.distance], ['System', 'Solar System'], ['Class', b.type]]
  if (view === 'solar' || view === 'planet') return [['System', 'Solar System'], ['Class', 'G-type star'], ['Objects', '1 star · 8 planets']]
  if (view === 'galaxy') return [['Coordinates', 'RA 17h 45m · DEC −29°'], ['Size', '~100,000 light-years'], ['Class', 'Barred spiral']]
  if (d) return [['Coordinates', `${fmtRA(d)} · ${fmtDec(d)}`], ['Distance', d.distance], ['Class', d.category]]
  return [['Frame', 'Sky directions (RA/Dec)'], ['Distance', 'Logarithmic scale'], ['Origin', 'Solar System']]
}

export function Hud() {
  const view = useStore((s) => s.view)
  const selected = useStore((s) => s.selected)
  const deepId = useStore((s) => s.deepId)
  const journey = useStore((s) => s.journey)
  const { go, reset, select, stopJourney } = useStore.getState()
  const rows = readout(view, selected, deepId)
  const scale: { v: View; label: string; sub: string; on: boolean }[] = [
    { v: 'hero', label: 'Earth', sub: '12,742 km', on: view === 'hero' },
    { v: 'solar', label: 'Solar System', sub: '9 billion km', on: view === 'solar' || view === 'planet' },
    { v: 'galaxy', label: 'Milky Way', sub: '100,000 ly', on: view === 'galaxy' },
    { v: 'deep', label: 'Deep Space', sub: 'Beyond our galaxy', on: view === 'deep' },
  ]
  const hint = view === 'hero' ? 'Drag to rotate' : 'Drag · rotate   Scroll · zoom   Right-drag · pan'
  return (
    <>
      <div className="frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="vignette" aria-hidden="true" />
      {view !== 'hero' && (
        <div className="hud-bl" aria-label="Object data" role="group">
          {rows.map(([k, v]) => <Meta key={k} k={k} v={v} />)}
        </div>
      )}
      {view !== 'hero' && view !== 'planet' && <nav className="rail" aria-label="Scale of the universe">
        <span className="rail-line" />
        {scale.map((s) => (
          <button key={s.v} aria-current={s.on} onClick={() => void go({ view: s.v })}>
            <span className="pip" /><span>{s.label}<small>{s.sub}</small></span>
          </button>
        ))}
      </nav>}
      {(view === 'solar' || view === 'planet') && (
        <div className="dock" role="toolbar" aria-label="Focus a body">
          {[getBody('sun')!, ...PLANETS].map((p) => (
            <button key={p.id} className="chip" aria-pressed={selected === p.id} onClick={() => (selected === p.id ? select(null) : select(p.id))}>{p.name}</button>
          ))}
        </div>
      )}
      <div className="hud-br">
        {(view === 'solar' || view === 'planet') && <div className="badge"><b>Not to scale</b> · sizes, distances &amp; speeds compressed</div>}
        {view === 'deep' && <div className="badge"><b>Not to scale</b> · real directions, log distance</div>}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {view === 'planet' && <button className="btn small ghost" onClick={() => useStore.getState().set({ view: 'solar' })}>← Solar System</button>}
          {view !== 'hero' && <button className="btn small ghost" onClick={reset}>Reset view</button>}
          {(view === 'solar' || view === 'planet') && <button className="btn small ghost" onClick={() => void go({ view: 'galaxy' })}>Leave Solar System ↗</button>}
          {view === 'galaxy' && <button className="btn small ghost" onClick={() => void go({ view: 'deep' })}>Beyond the Milky Way ↗</button>}
        </div>
        <div className="hint">{hint}</div>
      </div>
      {journey && (
        <div className="journey">
          <span className="hint">Scale journey</span>
          <button className="btn small ghost" onClick={stopJourney}>Skip</button>
        </div>
      )}
    </>
  )
}
