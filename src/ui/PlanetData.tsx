import { useRef, useState, type KeyboardEvent } from 'react'
import { useStore, type EarthLayers as Layers } from '../store'
import type { Body } from '../data/planets'
import { Panel, Stat } from './Panel'

const TABS = ['Overview', 'Composition', 'Atmosphere', 'Moons', 'Exploration', 'Interesting facts'] as const

/** The dedicated "Planet Data" interface, shown while the camera is close to a body. */
export function PlanetData({ body }: { body: Body }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const list = useRef<HTMLDivElement>(null)
  const sun = body.id === 'sun'
  const keys = (e: KeyboardEvent) => {
    const i = TABS.indexOf(tab), d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = TABS[(i + d + TABS.length) % TABS.length]
    setTab(n)
    requestAnimationFrame(() => list.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus())
  }
  return (
    <Panel
      label={`${body.name} planet data`} onClose={() => useStore.getState().set({ view: 'solar' })}
      foot={<button className="btn small ghost" onClick={() => useStore.getState().set({ view: 'solar' })}>← Back to Solar System</button>}
    >
      <div className="label">{sun ? 'Star data' : 'Planet data'}</div>
      <h2>{body.name}</h2>
      <div className="sub">{body.tagline}</div>
      <div className="tabs" role="tablist" aria-label={`${body.name} data sections`} ref={list} onKeyDown={keys}>
        {TABS.map((t) => (
          <button key={t} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls="tabpanel" tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)}>{t.replace('Interesting facts', 'Facts')}</button>
        ))}
      </div>
      <div role="tabpanel" id="tabpanel" aria-labelledby={`tab-${tab}`} key={`${body.id}-${tab}`} style={{ animation: 'in .5s var(--ease)' }}>
        {tab === 'Overview' && (<>
          <p className="desc" style={{ marginTop: 0 }}>{body.overview}</p>
          <div className="grid2">
            <Stat k="Type" v={body.type} wide />
            <Stat k={sun ? 'From Earth' : 'From Sun'} v={body.distance} wide />
            <Stat k="Diameter" v={body.diameter} />
            <Stat k={sun ? 'Galactic orbit' : 'Year'} v={body.orbitalPeriod} />
            <Stat k="Day" v={body.dayLength} />
            <Stat k="Moons" v={body.moons} />
            <Stat k="Temperature" v={body.temperature} wide />
          </div>
        </>)}
        {tab === 'Composition' && <p className="desc" style={{ marginTop: 0 }}>{body.composition}</p>}
        {tab === 'Atmosphere' && <p className="desc" style={{ marginTop: 0 }}>{body.atmosphere}</p>}
        {tab === 'Moons' && <p className="desc" style={{ marginTop: 0 }}>{body.moonsInfo}</p>}
        {tab === 'Exploration' && <p className="desc" style={{ marginTop: 0 }}>{body.exploration}</p>}
        {tab === 'Interesting facts' && <ul className="facts">{body.facts.map((f) => <li key={f}>{f}</li>)}</ul>}
      </div>
    </Panel>
  )
}

const LAYERS: { key: keyof Layers; v?: Layers['focus']; label: string; note: string }[] = [
  { key: 'focus', v: 'land', label: 'Continents', note: 'Land covers about 29% of the surface. Highlighting coastlines.' },
  { key: 'focus', v: 'ocean', label: 'Oceans', note: 'Oceans cover about 71% of Earth and hold 97% of its water.' },
  { key: 'atmosphere', label: 'Atmosphere', note: 'A thin shell, mostly nitrogen and oxygen, scatters blue light.' },
  { key: 'clouds', label: 'Clouds', note: 'At any time, clouds cover roughly two-thirds of the planet.' },
  { key: 'lights', label: 'City lights', note: 'Human settlements glow on the night side.' },
  { key: 'daynight', label: 'Day / night', note: 'Off shows Earth evenly lit. On, the terminator marks where day ends.' },
]

/** Earth-only toggles for the surface, cloud, atmosphere and night-light layers. */
export function EarthLayers() {
  const e = useStore((s) => s.earth)
  const [note, setNote] = useState(LAYERS[5].note)
  const toggle = useStore.getState().toggleEarth
  return (
    <div className="layers" role="group" aria-label="Earth layers">
      <div className="label" style={{ marginBottom: 6 }}>Earth layers</div>
      {LAYERS.map((l) => {
        const on = l.key === 'focus' ? e.focus === l.v : e[l.key]
        return (
          <button key={l.label} aria-pressed={!!on} onClick={() => { toggle(l.key, l.v); setNote(l.note) }} onMouseEnter={() => setNote(l.note)} onFocus={() => setNote(l.note)}>
            <span className="box" />{l.label}
          </button>
        )
      })}
      <p>{note}</p>
    </div>
  )
}
