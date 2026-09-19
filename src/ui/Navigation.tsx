import { useState } from 'react'
import { useStore } from '../store'
import { MenuIcon, CloseIcon, SearchIcon, SoundOff, SoundOn, SparkIcon } from './icons'

export function Navigation() {
  const view = useStore((s) => s.view)
  const panel = useStore((s) => s.panel)
  const muted = useStore((s) => s.muted)
  const { go, set, toggleSound } = useStore.getState()
  const [open, setOpen] = useState(false)

  const items: { label: string; current: boolean; act: () => void }[] = [
    { label: 'Explore', current: view === 'hero' && !panel, act: () => void go({ view: 'hero' }) },
    { label: 'Solar System', current: (view === 'solar' || view === 'planet') && panel !== 'planets', act: () => void go({ view: 'solar' }) },
    { label: 'Planets', current: panel === 'planets', act: () => { if (view !== 'solar' && view !== 'planet') void go({ view: 'solar' }).then(() => set({ panel: 'planets' })); else set({ panel: 'planets' }) } },
    { label: 'Deep Space', current: view === 'galaxy' || view === 'deep', act: () => void go({ view: 'deep' }) },
    { label: 'About', current: panel === 'about', act: () => set({ panel: 'about' }) },
  ]
  const run = (a: () => void) => { setOpen(false); a() }

  return (
    <header className="topbar">
      <button className="wordmark" onClick={() => go({ view: 'hero' })} aria-label="GALAXY, home">GALAXY</button>
      <nav className="nav" aria-label="Primary">
        {items.map((i) => <button key={i.label} aria-current={i.current ? 'page' : undefined} onClick={i.act}>{i.label}</button>)}
      </nav>
      <div className="tools">
        <button className="tool" onClick={() => set({ panel: 'search' })} aria-label="Search the universe (Ctrl or Cmd + K)"><SearchIcon /><span className="t">Search</span><span className="kbd">⌘K</span></button>
        <button className="tool" onClick={() => set({ panel: 'discover' })} aria-label="Discover something" aria-pressed={panel === 'discover'}><SparkIcon /><span className="t">Discover</span></button>
        <button className="tool" onClick={toggleSound} aria-label={muted ? 'Turn ambient sound on' : 'Mute ambient sound'} aria-pressed={!muted}>{muted ? <SoundOff /> : <SoundOn />}</button>
        <button className="tool menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><MenuIcon /></button>
      </div>
      {open && (
        <div className="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="tool" style={{ position: 'absolute', top: 12, right: 14 }} onClick={() => setOpen(false)} aria-label="Close menu"><CloseIcon /></button>
          {items.map((i) => <button key={i.label} className="item" aria-current={i.current ? 'page' : undefined} onClick={() => run(i.act)}>{i.label}</button>)}
          <button className="item" onClick={() => run(() => set({ panel: 'search' }))}>Search</button>
          <button className="item" onClick={() => run(() => set({ panel: 'discover' }))}>Discover</button>
        </div>
      )}
    </header>
  )
}
