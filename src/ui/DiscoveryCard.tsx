import { useState } from 'react'
import { useStore } from '../store'
import { ENTRIES, type Entry } from '../data/search'
import { Panel, Stat } from './Panel'
import { Visual } from './Visual'
import { todaysPick } from './Hero'
import { goTo } from './goTo'

const pickFact = (e: Entry) => e.facts[Math.floor(Math.random() * e.facts.length)]

/** "Today's discovery", then an endless supply of others. */
export function DiscoveryCard() {
  const set = useStore.getState().set
  const [entry, setEntry] = useState(todaysPick)
  const [fact, setFact] = useState(() => todaysPick().facts[0])
  const [first, setFirst] = useState(true)
  const another = () => {
    let n: Entry
    do n = ENTRIES[Math.floor(Math.random() * ENTRIES.length)]; while (n.id === entry.id)
    setEntry(n); setFact(pickFact(n)); setFirst(false)
  }
  return (
    <Panel
      label="Discovery" onClose={() => set({ panel: null })}
      foot={<><button className="btn small primary" onClick={another}>Discover something else</button><button className="btn small ghost" onClick={() => goTo(entry)}>View in space</button></>}
    >
      <div className="label" style={{ color: 'var(--accent)' }}>{first ? 'Today’s discovery' : 'Discovery'}</div>
      <div key={entry.id} style={{ animation: 'in .6s var(--ease)' }}>
        <h2 style={{ fontSize: entry.name.length > 14 ? 26 : 34 }}>{entry.name}</h2>
        <div style={{ margin: '14px 0' }}><Visual id={entry.id} label={`Illustration of ${entry.name}`} /></div>
        <div className="label" style={{ marginTop: -6, marginBottom: 12, fontSize: 9 }}>Procedural illustration</div>
        <p className="desc" style={{ margin: '0 0 16px', fontSize: 15, fontStyle: 'italic' }}>“{entry.description}”</p>
        <div className="grid2"><Stat k="Type" v={entry.type} /><Stat k="Distance" v={entry.distance} /></div>
        <div className="fact"><span className="label">Did you know</span>{fact}</div>
      </div>
    </Panel>
  )
}
