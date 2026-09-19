import { BODIES } from './planets'
import { DEEP, MILKY_WAY } from './deepspace'

export interface Entry {
  id: string
  name: string
  type: string
  distance: string
  description: string
  facts: string[]
  dest: 'body' | 'deep' | 'galaxy'
  haystack: string
}

const kindAlias: Record<string, string> = {
  blackhole: 'black hole', galaxy: 'galaxy', nebula: 'nebula', pillars: 'nebula star forming',
  pulsar: 'neutron star pulsar', remnant: 'supernova remnant', exo: 'exoplanet planet',
  cluster: 'star cluster', star: 'star',
}

export const ENTRIES: Entry[] = [
  ...BODIES.map((b): Entry => ({
    id: b.id, name: b.name, type: b.type, distance: b.distance, description: b.description, facts: b.facts, dest: 'body',
    haystack: `${b.name} ${b.type} ${b.id === 'sun' ? 'star' : 'planet solar system'} ${b.tagline}`.toLowerCase(),
  })),
  {
    id: MILKY_WAY.id, name: MILKY_WAY.name, type: MILKY_WAY.category, distance: MILKY_WAY.distance,
    description: MILKY_WAY.description, facts: MILKY_WAY.facts, dest: 'galaxy',
    haystack: 'milky way galaxy home spiral',
  },
  ...DEEP.map((d): Entry => ({
    id: d.id, name: d.name, type: d.category, distance: d.distance, description: d.description, facts: d.facts, dest: 'deep',
    haystack: `${d.name} ${d.category} ${kindAlias[d.kind]}`.toLowerCase(),
  })),
]

export const byId = (id: string) => ENTRIES.find((e) => e.id === id)

export function search(q: string): Entry[] {
  const t = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!t.length) return []
  return ENTRIES.map((e) => {
    const name = e.name.toLowerCase()
    if (!t.every((w) => e.haystack.includes(w) || e.description.toLowerCase().includes(w))) return [e, -1] as const
    let s = 0
    for (const w of t) s += name.startsWith(w) ? 100 : name.includes(w) ? 60 : e.haystack.includes(w) ? 40 : 10
    return [e, s] as const
  })
    .filter(([, s]) => s >= 0)
    .sort((a, b) => b[1] - a[1])
    .map(([e]) => e)
    .slice(0, 8)
}
