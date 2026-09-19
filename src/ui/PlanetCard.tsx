import type { Body } from '../data/planets'

/** One row of the Planets index. */
export function PlanetCard({ body, onPick }: { body: Body; onPick: (id: string) => void }) {
  return (
    <button className="list-row" onClick={() => onPick(body.id)}>
      <div className="n">{body.name} <span style={{ color: 'var(--faint)', fontWeight: 400, fontSize: 12 }}>· {body.tagline}</span></div>
      <div className="m"><span>{body.type}</span><span>{body.diameter.replace(' (equatorial)', '')}</span></div>
    </button>
  )
}
