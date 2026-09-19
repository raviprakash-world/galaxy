const mobile =
  typeof matchMedia !== 'undefined' && (matchMedia('(pointer: coarse)').matches || innerWidth < 768)

/** Quality tier, decided once at load. Mobile gets fewer particles, fewer noise octaves and a lower pixel ratio. */
export const Q = {
  mobile,
  dpr: mobile ? 1.5 : 2,
  segs: mobile ? 64 : 128,
  octaves: mobile ? 3 : 5,
  stars: mobile ? 2500 : 6000,
  galaxy: mobile ? 14000 : 50000,
}

export function hasWebGL() {
  if (location.search.includes('nowebgl')) return false // lets you preview the 2D fallback
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
