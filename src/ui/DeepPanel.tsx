import { useState } from 'react'
import { DEEP, fmtDec, fmtRA, MILKY_WAY, type DeepObject } from '../data/deepspace'
import { useStore } from '../store'
import { Panel, Stat } from './Panel'

const narrow = () => innerWidth < 768

function Closed({ label, onOpen }: { label: string; onOpen: () => void }) {
  return <button className="btn small" style={{ position: 'fixed', zIndex: 35, right: 'calc(var(--pad) + 10px)', top: 76, background: 'rgba(9,11,18,.8)' }} onClick={onOpen}>{label}</button>
}

function Detail({ o }: { o: DeepObject }) {
  const set = useStore.getState().set
  return (
    <Panel label={`${o.name} information`} onClose={() => set({ deepId: null })} foot={<button className="btn small ghost" onClick={() => set({ deepId: null })}>← All objects</button>}>
      <div className="label">{o.category}</div>
      <h2 style={{ fontSize: o.name.length > 14 ? 28 : 36 }}>{o.name}</h2>
      <p className="desc">{o.description}</p>
      <div className="grid2">
        <Stat k="Distance from Earth" v={o.distance} wide />
        <Stat k="Right ascension" v={fmtRA(o).replace('RA ', '')} />
        <Stat k="Declination" v={fmtDec(o).replace('DEC ', '')} />
      </div>
      <ul className="facts" style={{ marginTop: 22 }}>{o.facts.map((f) => <li key={f}>{f}</li>)}</ul>
      <details className="more"><summary>Scientific context</summary><p>{o.context}</p></details>
    </Panel>
  )
}

/** Deep-space browser: all objects by category, or the detail view for the selected one. */
export function DeepPanel() {
  const deepId = useStore((s) => s.deepId)
  const set = useStore.getState().set
  const [open, setOpen] = useState(!narrow())
  const cur = DEEP.find((d) => d.id === deepId)
  if (cur) return <Detail o={cur} />
  if (!open) return <Closed label="Objects" onOpen={() => setOpen(true)} />
  const cats = [...new Set(DEEP.map((d) => d.category))]
  return (
    <Panel label="Deep space objects" onClose={() => setOpen(false)}>
      <div className="label">Beyond our solar system</div>
      <h2 style={{ fontSize: 30 }}>Deep space</h2>
      <p className="desc">Stars, nebulae, galaxies and worlds around other suns. Pick one to fly there.</p>
      {cats.map((c) => (
        <div key={c} style={{ marginBottom: 14 }}>
          <div className="label" style={{ margin: '10px 0 0' }}>{c}</div>
          {DEEP.filter((d) => d.category === c).map((d) => (
            <button key={d.id} className="list-row" onClick={() => set({ deepId: d.id })}>
              <div className="n">{d.name}</div><div className="m"><span>{d.distance}</span></div>
            </button>
          ))}
        </div>
      ))}
    </Panel>
  )
}

/** The Milky Way readout. */
export function GalaxyInfo() {
  const { go } = useStore.getState()
  const [open, setOpen] = useState(!narrow())
  if (!open) return <Closed label="The Milky Way" onOpen={() => setOpen(true)} />
  return (
    <Panel
      label="The Milky Way" onClose={() => setOpen(false)}
      foot={<><button className="btn small primary" onClick={() => void go({ view: 'deep' })}>Beyond the Milky Way</button><button className="btn small ghost" onClick={() => void go({ view: 'solar' })}>Solar System</button></>}
    >
      <div className="label">{MILKY_WAY.category}</div>
      <h2>Milky Way</h2>
      <div className="sub">Our galaxy</div>
      <p className="desc">{MILKY_WAY.description}</p>
      <div className="fact" style={{ marginTop: 0 }}><span className="label">You are here</span>Select the marker to zoom back in to the Solar System.</div>
      <ul className="facts" style={{ marginTop: 22 }}>{MILKY_WAY.facts.map((f) => <li key={f}>{f}</li>)}</ul>
      <details className="more"><summary>Scientific context</summary><p>{MILKY_WAY.context}</p></details>
    </Panel>
  )
}
