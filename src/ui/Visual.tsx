import { useEffect, useRef } from 'react'
import { getBody } from '../data/planets'
import { getDeep } from '../data/deepspace'

/** 2D rendering of any catalogue object (Discovery card, no-WebGL fallback). Procedural, not a photograph. */
export function Visual({ id, label, square }: { id: string; label: string; square?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let live = true
    // The painters pull in three.js; load them only when a visual is actually shown.
    void import('../lib/painters').then(({ paintObject, paintPlanet }) => {
      if (!live) return
      const cv = ref.current!
      const body = getBody(id), deep = getDeep(id)
      if (body) paintPlanet(cv, body)
      else if (deep) paintObject(cv, deep)
      else paintObject(cv, { id, kind: 'galaxy', hue: '#9fb4ff' })
    })
    return () => { live = false }
  }, [id])
  return <canvas ref={ref} width={480} height={480} className="visual" style={square ? { height: 'auto', aspectRatio: '1' } : undefined} role="img" aria-label={label} />
}
