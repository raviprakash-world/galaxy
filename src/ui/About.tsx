import { useEffect, useRef } from 'react'
import { useStore } from '../store'

export function About() {
  const close = () => useStore.getState().set({ panel: null })
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && close()} style={{ paddingTop: '9vh' }}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label="About GALAXY" style={{ overflowY: 'auto', maxHeight: '84vh' }}>
        <div style={{ padding: '26px 28px 8px' }}>
          <div className="label">About</div>
          <h2 style={{ margin: '6px 0 12px', fontWeight: 200, fontSize: 32, letterSpacing: '0.2em' }}>GALAXY</h2>
          <p style={{ color: '#c8cddb', margin: 0 }}>A little window into the universe. Everything here is rendered live in WebGL: planets are lit by a real light source, and the camera flies between scales, from Earth to the Solar System, the Milky Way and beyond.</p>
        </div>
        <div className="grid2" style={{ padding: '18px 28px', gap: 22 }}>
          <div><div className="label">Controls</div><p className="value" style={{ margin: '6px 0 0', color: 'var(--dim)' }}>Drag to rotate. Scroll or pinch to zoom. Right-drag or two fingers to pan. Select any label to fly to it.</p></div>
          <div><div className="label">Keyboard</div><p className="value" style={{ margin: '6px 0 0', color: 'var(--dim)' }}>Tab to reach any object. Ctrl/⌘ + K or / to search. ← → to cycle planets. Esc to go back.</p></div>
          <div className="wide"><div className="label">Data</div><p className="value" style={{ margin: '6px 0 0', color: 'var(--dim)' }}>Measurements come from the NASA Planetary Fact Sheet and NASA, ESA, ESO and Hubble/Webb science releases, and are rounded. Moon counts change as new ones are confirmed.</p></div>
          <div className="wide"><div className="label">Limitations</div>
            <p className="value" style={{ margin: '6px 0 0', color: 'var(--dim)' }}>Planet surfaces, deep-space illustrations and the Milky Way are procedural, not photographs. Earth’s continents come from simplified outlines. The Solar System view is not to scale. The Milky Way uses a simplified four-arm model. Deep-space objects sit in their true sky directions on a logarithmic distance scale.</p></div>
        </div>
        <div style={{ padding: '0 28px 24px' }}><button ref={ref} className="btn small" onClick={close}>Close</button></div>
      </div>
    </div>
  )
}
