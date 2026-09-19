import { useEffect, useMemo } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { DEEP } from '../data/deepspace'
import { Q } from '../lib/device'
import { paintObject } from '../lib/painters'
import { useStore } from '../store'
import { CelestialObject } from './CelestialObject'
import { deepPosition, logRadius } from './layout'

const RINGS: [number, string][] = [[10, '10 LY'], [100, '100 LY'], [1e3, '1,000 LY'], [1e4, '10,000 LY'], [1e5, '100,000 LY'], [1e6, '1 MILLION LY']]

function Ring({ ly, label, n }: { ly: number; label: string; n: number }) {
  const r = logRadius(ly), a = 2.3 + n * 0.16 // stagger labels along a diagonal so they never stack
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(Array.from({ length: 128 }, (_, i) => new THREE.Vector3(Math.cos((i / 128) * 6.2832) * r, 0, Math.sin((i / 128) * 6.2832) * r))), [r])
  return (
    <group>
      <lineLoop geometry={geo}><lineBasicMaterial color="#8fa0ff" transparent opacity={0.09} depthWrite={false} /></lineLoop>
      <Html position={[Math.cos(a) * r, 0, Math.sin(a) * r]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}><div className="tag ring-tag">{label}</div></Html>
    </group>
  )
}

/** Objects placed by their real sky direction (RA/Dec) at a logarithmic distance. Not to scale. */
export function DeepSpace() {
  const deepId = useStore((s) => s.deepId)
  const set = useStore((s) => s.set)
  const maps = useMemo(() => {
    const out: Record<string, THREE.CanvasTexture> = {}
    for (const o of DEEP) {
      const cv = document.createElement('canvas'); cv.width = cv.height = Q.mobile ? 192 : 256
      paintObject(cv, o, true)
      const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace
      out[o.id] = t
    }
    return out
  }, [])
  useEffect(() => () => Object.values(maps).forEach((t) => t.dispose()), [maps])
  const select = (id: string) => set({ deepId: id })

  return (
    <>
      {RINGS.map(([ly, label], n) => <Ring key={ly} ly={ly} label={label} n={n} />)}
      <Html center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div className="tag" style={{ transform: 'translateY(22px)' }}>SOLAR SYSTEM<br /><span>YOU ARE HERE</span></div>
      </Html>
      <mesh><sphereGeometry args={[0.35, 12, 8]} /><meshBasicMaterial color="#e8ebf2" /></mesh>
      {DEEP.map((o) => (
        <CelestialObject key={o.id} id={o.id} name={o.name} radius={o.size * 0.9} position={deepPosition(o).toArray()} selected={deepId === o.id} onSelect={select}>
          <sprite scale={[o.size * 1.8, o.size * 1.8, 1]}>
            <spriteMaterial map={maps[o.id]} blending={THREE.AdditiveBlending} depthWrite={false} transparent />
          </sprite>
        </CelestialObject>
      ))}
    </>
  )
}
