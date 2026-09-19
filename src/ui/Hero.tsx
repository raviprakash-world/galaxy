import { useStore } from '../store'
import { byId, ENTRIES } from '../data/search'

const day = Math.floor(Date.now() / 864e5)
export const todaysPick = () => ENTRIES[day % ENTRIES.length]

export function Hero() {
  const { go, startJourney, set } = useStore.getState()
  const pick = todaysPick()
  return (
    <>
      <section className="hero" aria-labelledby="title">
        <h1 id="title">GALAXY</h1>
        <div className="eyebrow tagline">A little window into the universe</div>
        <p>Explore planets, systems, stars and distant worlds.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => void startJourney()}>Explore the universe</button>
          <button className="btn" onClick={() => void go({ view: 'solar' })}>Explore Solar System</button>
        </div>
      </section>
      <div className="hero-bottom" style={{ position: 'fixed', zIndex: 25, left: 'calc(var(--pad) + 10px)', bottom: 'calc(var(--pad) + 8px)', display: 'flex', gap: 28, alignItems: 'flex-end', flexWrap: 'wrap', maxWidth: '60vw' }}>
        <div><div className="label">Today’s discovery</div>
          <button className="link" style={{ marginTop: 6 }} onClick={() => set({ panel: 'discover' })}>{byId(pick.id)?.name} →</button></div>
        <div><div className="label">Object</div>
          <button className="link" style={{ marginTop: 6 }} onClick={() => void go({ view: 'planet', selected: 'earth' })}>Inspect Earth →</button></div>
      </div>
    </>
  )
}
