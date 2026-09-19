import { create } from 'zustand'
import { setSound, tick } from './lib/audio'

export type View = 'hero' | 'solar' | 'planet' | 'galaxy' | 'deep'
export type Panel = null | 'search' | 'planets' | 'about' | 'discover'
export interface Dest { view: View; selected?: string | null; deepId?: string | null }
interface Caption { title: string; sub: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const scene = (v: View) => (v === 'solar' || v === 'planet' ? 'solar' : v)

// Two-stage captions: the first shows while the view fades out, the second as the new scale is revealed.
const CAPTIONS: Record<View, Caption[]> = {
  hero: [{ title: 'EARTH', sub: 'Home · 12,742 km across' }],
  solar: [{ title: 'THE SOLAR SYSTEM', sub: 'About 9 billion km across, out to Neptune’s orbit' }],
  planet: [{ title: 'APPROACHING', sub: 'Closing in on the surface' }],
  galaxy: [
    { title: 'INTERSTELLAR SPACE', sub: 'The nearest star, Proxima Centauri, is 4.24 light-years away' },
    { title: 'THE MILKY WAY', sub: 'Roughly 100,000 light-years across' },
  ],
  deep: [
    { title: 'INTERGALACTIC SPACE', sub: 'The nearest large galaxy is 2.5 million light-years away' },
    { title: 'BEYOND OUR GALAXY', sub: 'Real sky directions · distances on a logarithmic scale' },
  ],
}

const reducedQuery = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)') : null

export interface EarthLayers { focus: 'none' | 'land' | 'ocean'; clouds: boolean; atmosphere: boolean; lights: boolean; daynight: boolean }

interface State {
  view: View
  selected: string | null // planet or sun id
  deepId: string | null
  panel: Panel
  hovered: string | null
  muted: boolean
  reduced: boolean
  ready: boolean
  webglFailed: boolean
  fade: { on: boolean; cap: Caption } | null
  resetTick: number
  journey: boolean
  earth: EarthLayers
  set: (p: Partial<State>) => void
  go: (d: Dest, fromJourney?: boolean) => Promise<void>
  select: (id: string | null) => void
  back: () => void
  reset: () => void
  toggleSound: () => void
  toggleEarth: (k: keyof EarthLayers, v?: EarthLayers['focus']) => void
  startJourney: () => Promise<void>
  stopJourney: () => void
}

let navId = 0
let journeyId = 0

export const useStore = create<State>((set, get) => ({
  view: 'hero', selected: null, deepId: null, panel: null, hovered: null,
  muted: true,
  reduced: (reducedQuery?.matches ?? false) || (typeof location !== 'undefined' && location.search.includes('reduced')),
  ready: false, webglFailed: false, fade: null, resetTick: 0, journey: false,
  earth: { focus: 'none', clouds: true, atmosphere: true, lights: true, daynight: true },
  set: (p) => set(p),

  async go(d, fromJourney) {
    if (!fromJourney) get().stopJourney() // any manual navigation cancels the guided journey
    const s = get()
    const id = ++navId
    const next = { view: d.view, selected: d.selected ?? null, deepId: d.deepId ?? null, panel: null as Panel }
    tick()
    if (scene(s.view) === scene(d.view)) return set(next) // same 3D scene: the camera just flies
    const caps = CAPTIONS[d.view]
    const quick = s.reduced
    set({ fade: { on: true, cap: caps[0] } })
    await sleep(quick ? 150 : caps.length > 1 ? 1700 : 900)
    if (id !== navId) return
    set({ ...next, fade: { on: true, cap: caps[caps.length - 1] } })
    await sleep(quick ? 100 : caps.length > 1 ? 1500 : 500)
    if (id !== navId) return
    set({ fade: { on: false, cap: caps[caps.length - 1] } })
  },

  select(id) {
    const s = get()
    if (id && s.view === 'hero') void s.go({ view: 'solar', selected: id })
    else set({ selected: id, view: id ? (s.view === 'planet' ? 'planet' : 'solar') : 'solar' })
    if (id) tick()
  },

  back() {
    const s = get()
    if (s.panel) return set({ panel: null })
    if (s.view === 'planet') set({ view: 'solar' })
    else if (s.selected) set({ selected: null })
    else if (s.deepId) set({ deepId: null })
  },

  reset: () => set((s) => ({ resetTick: s.resetTick + 1, selected: null, deepId: null, view: s.view === 'planet' ? 'solar' : s.view })),

  toggleSound() {
    const muted = !get().muted
    set({ muted })
    setSound(!muted)
  },

  toggleEarth(k, v) {
    set((s) => ({ earth: { ...s.earth, [k]: k === 'focus' ? (s.earth.focus === v ? 'none' : v) : !s.earth[k] } }))
  },

  async startJourney() {
    const id = ++journeyId
    set({ journey: true, panel: null })
    const steps: [Dest, number][] = [[{ view: 'solar' }, 4800], [{ view: 'galaxy' }, 6500], [{ view: 'deep' }, 0]]
    for (const [dest, wait] of steps) {
      await get().go(dest, true)
      if (id !== journeyId) return
      await sleep(get().reduced ? 1500 : wait)
      if (id !== journeyId) return
    }
    set({ journey: false })
  },
  stopJourney() {
    journeyId++
    set({ journey: false })
  },
}))

export { scene }
