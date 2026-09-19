import { useEffect, useRef, useState } from 'react'
import { search, ENTRIES, type Entry } from '../data/search'
import { useStore } from '../store'
import { goTo } from './goTo'

const SUGGEST = ['Earth', 'Mars', 'Jupiter', 'Saturn', 'Andromeda', 'Black hole', 'Nebula', 'Exoplanet']

export function SearchOverlay() {
  const set = useStore.getState().set
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const results: Entry[] = q.trim() ? search(q) : []
  const close = () => set({ panel: null })
  const pick = (e: Entry) => { close(); void goTo(e) }

  useEffect(() => { input.current?.focus() }, [])
  useEffect(() => setI(0), [q])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI((i + 1) % Math.max(results.length, 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((i - 1 + results.length) % Math.max(results.length, 1)) }
    else if (e.key === 'Enter' && results[i]) pick(results[i])
    else if (e.key === 'Escape') close()
  }

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label="Search the universe" onKeyDown={onKey}>
        <input
          ref={input} className="search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search planets, stars, galaxies…"
          role="combobox" aria-expanded={results.length > 0} aria-controls="results" aria-activedescendant={results[i] ? `r-${results[i].id}` : undefined} aria-autocomplete="list"
        />
        <div className="results" id="results" role="listbox" aria-label="Results">
          {results.map((r, n) => (
            <button key={r.id} id={`r-${r.id}`} role="option" aria-selected={n === i} className="result" onMouseEnter={() => setI(n)} onClick={() => pick(r)}>
              <div className="top"><span className="n">{r.name}</span><span className="label">{r.type}</span></div>
              <div className="label" style={{ marginTop: 3, fontWeight: 500 }}>{r.distance}</div>
              <div className="d">{r.description}</div>
            </button>
          ))}
          {!q.trim() && (
            <div style={{ padding: '18px 22px 22px' }}>
              <div className="label" style={{ marginBottom: 12 }}>Try</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{SUGGEST.map((s) => <button key={s} className="btn small ghost" onClick={() => setQ(s)}>{s}</button>)}</div>
              <div className="label" style={{ marginTop: 18 }}>{ENTRIES.length} objects · ↑↓ to move · Enter to fly · Esc to close</div>
            </div>
          )}
          {q.trim() && !results.length && <div style={{ padding: '20px 22px', color: 'var(--dim)' }}>Nothing out there matches “{q}”. Try “galaxy”, “star” or a planet’s name.</div>}
        </div>
      </div>
    </div>
  )
}
