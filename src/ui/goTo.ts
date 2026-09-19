import { useStore } from '../store'
import type { Entry } from '../data/search'

/** Smoothly navigate to any catalogue entry (search results, discoveries). */
export function goTo(e: Entry) {
  const { go } = useStore.getState()
  if (e.dest === 'body') return go({ view: 'solar', selected: e.id })
  if (e.dest === 'galaxy') return go({ view: 'galaxy' })
  return go({ view: 'deep', deepId: e.id })
}
