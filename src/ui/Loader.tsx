import { useEffect, useState } from 'react'
import { useStore } from '../store'

const STAGES = ['Loading celestial data…', 'Loading planetary systems…', 'Establishing visual field…']

/** Short, honest loading screen: each stage ticks off when its real work is done. */
export function Loader({ sceneLoaded }: { sceneLoaded: boolean }) {
  const ready = useStore((s) => s.ready)
  const [minTime, setMinTime] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMinTime(true), 1300); return () => clearTimeout(t) }, [])
  const done = [true, sceneLoaded, ready]
  const finished = ready && minTime
  return (
    <div className="loader" data-done={finished} role="status" aria-live="polite" aria-hidden={finished}>
      <div>
        <h2>INITIALIZING GALAXY</h2>
        <ul>{STAGES.map((s, i) => <li key={s} data-done={done[i] && (i === 0 || minTime || i < 2)}><span>{s}</span><span>{done[i] ? '●' : '○'}</span></li>)}</ul>
        <div className="bar"><i style={{ transform: `scaleX(${(done.filter(Boolean).length) / 3})` }} /></div>
      </div>
    </div>
  )
}
