import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useStore } from './store'
import { hasWebGL } from './lib/device'
import { PLANETS, BODIES, getBody } from './data/planets'
import { Navigation } from './ui/Navigation'
import { Hero } from './ui/Hero'
import { Hud } from './ui/Hud'
import { Loader } from './ui/Loader'
import { Fade } from './ui/Fade'
import { PlanetInfo } from './ui/PlanetInfo'
import { PlanetData, EarthLayers } from './ui/PlanetData'
import { PlanetCard } from './ui/PlanetCard'
import { DeepPanel, GalaxyInfo } from './ui/DeepPanel'
import { DiscoveryCard } from './ui/DiscoveryCard'
import { SearchOverlay } from './ui/SearchOverlay'
import { About } from './ui/About'
import { Fallback2D } from './ui/Fallback2D'
import { Panel } from './ui/Panel'

const Scene = lazy(() => import('./three/Scene'))
const webgl = hasWebGL()

function PlanetsIndex() {
  const { select, set } = useStore.getState()
  return (
    <Panel label="Planets" onClose={() => set({ panel: null })}>
      <div className="label">The Solar System</div>
      <h2 style={{ fontSize: 30 }}>Planets</h2>
      <p className="desc">Eight planets orbit the Sun. Select one to fly there.</p>
      {PLANETS.map((p) => <PlanetCard key={p.id} body={p} onPick={(id) => { set({ panel: null }); select(id) }} />)}
    </Panel>
  )
}

export default function App() {
  const view = useStore((s) => s.view)
  const selected = useStore((s) => s.selected)
  const panel = useStore((s) => s.panel)
  const hovered = useStore((s) => s.hovered)
  const reduced = useStore((s) => s.reduced)
  const failed = useStore((s) => s.webglFailed)
  const [sceneLoaded, setSceneLoaded] = useState(false)
  const body = getBody(selected)

  useEffect(() => { document.documentElement.dataset.reduced = String(reduced) }, [reduced])
  useEffect(() => { document.body.style.cursor = hovered ? 'pointer' : '' }, [hovered])
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => useStore.getState().set({ reduced: mq.matches })
    mq.addEventListener('change', on)
    void import('./three/Scene').then(() => setSceneLoaded(true))
    return () => mq.removeEventListener('change', on)
  }, [])

  // Global keyboard: search, back, and cycling through planets.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA'
      const st = useStore.getState()
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); st.set({ panel: 'search' }) }
      else if (e.key === 'Escape') st.back()
      else if (!typing && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && st.selected && t.getAttribute('role') !== 'tab') {
        const list = BODIES, i = list.findIndex((b) => b.id === st.selected)
        st.select(list[(i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length].id)
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  if (!webgl) return <Fallback2D />

  const modal = panel === 'search' || panel === 'about'
  const inSolar = view === 'solar' || view === 'planet'
  const announce = failed ? 'Celestial visualization unavailable' : body ? `${body.name} selected` : view

  return (
    <>
      <div inert={modal || undefined}>
        <main aria-label="Interactive 3D view of the universe" style={{ position: 'fixed', inset: 0 }}>
          {view !== 'hero' && <h1 className="sr-only">GALAXY, a little window into the universe</h1>}
          <Suspense fallback={null}><Scene /></Suspense>
        </main>
        <Navigation />
        <Hud />
        {view === 'hero' && !panel && <Hero />}
        {failed && (
          <div className="notice" role="alert">
            <h3>Celestial visualization unavailable</h3>
            <p>The 3D view could not be drawn on this device. Information panels still work.</p>
            <button className="btn small" onClick={() => location.reload()}>Try again</button>
          </div>
        )}
        {view === 'planet' && body?.id === 'earth' && !panel && <EarthLayers />}
        <AnimatePresence mode="wait">
          {panel === 'discover' ? <DiscoveryCard key="d" />
            : panel === 'planets' ? <PlanetsIndex key="p" />
            : inSolar && body ? (view === 'planet' ? <PlanetData key={`pd-${body.id}`} body={body} /> : <PlanetInfo key={`pi-${body.id}`} body={body} />)
            : view === 'galaxy' ? <GalaxyInfo key="g" />
            : view === 'deep' ? <DeepPanel key="dp" />
            : null}
        </AnimatePresence>
        <div className="sr-only" aria-live="polite">{announce}</div>
      </div>
      {panel === 'search' && <SearchOverlay />}
      {panel === 'about' && <About />}
      <Fade />
      <Loader sceneLoaded={sceneLoaded} />
    </>
  )
}
