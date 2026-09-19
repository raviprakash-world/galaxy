import { useStore } from '../store'

/** Full-screen scale transition with a caption ("Interstellar space…"). */
export function Fade() {
  const fade = useStore((s) => s.fade)
  const reduced = useStore((s) => s.reduced)
  return (
    <div className="fade" data-on={!!fade?.on} aria-hidden="true" style={reduced ? { transitionDuration: '0.15s' } : undefined}>
      {fade && <div key={fade.cap.title} style={{ animation: 'in 0.9s var(--ease)' }}><h3>{fade.cap.title}</h3><p>{fade.cap.sub}</p></div>}
    </div>
  )
}
