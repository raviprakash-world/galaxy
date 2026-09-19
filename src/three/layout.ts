import * as THREE from 'three'
import type { DeepObject } from '../data/deepspace'

// ---- Milky Way: 1 unit = 1,000 light-years; disc ~100,000 ly across, Sun ~26,000 ly from the centre.
const PITCH = Math.tan((12 * Math.PI) / 180)
export const arm = (r: number, k: number) => (k * Math.PI) / 2 + Math.log(r / 4) / PITCH

// Place the Sun midway between two arms, on the side facing the default camera.
const sunAngle = (() => {
  const base = arm(26, 0) + Math.PI / 4
  let best = base, bd = 9
  for (let k = -12; k <= 12; k++) {
    const a = base + (k * Math.PI) / 2
    const d = Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2)))
    if (d < bd) { bd = d; best = a }
  }
  return best
})()
export const SUN_MARKER = new THREE.Vector3(Math.cos(sunAngle) * 26, 0, Math.sin(sunAngle) * 26)

// ---- Deep space: real sky direction (RA/Dec), logarithmic distance.
export const logRadius = (ly: number) => 5 + 7.4 * Math.log10(ly)
const cache = new Map<string, THREE.Vector3>()
export function deepPosition(o: DeepObject) {
  let p = cache.get(o.id)
  if (!p) {
    const ra = ((o.ra[0] + o.ra[1] / 60) * 15 * Math.PI) / 180
    const neg = o.dec[0] < 0
    const dec = ((neg ? -1 : 1) * (Math.abs(o.dec[0]) + o.dec[1] / 60) * Math.PI) / 180
    p = new THREE.Vector3(Math.cos(dec) * Math.cos(ra), Math.sin(dec), -Math.cos(dec) * Math.sin(ra)).multiplyScalar(logRadius(o.ly))
    cache.set(o.id, p)
  }
  return p
}
