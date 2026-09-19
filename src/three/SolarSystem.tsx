import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BODIES, PLANETS } from '../data/planets'
import { useStore } from '../store'
import { Q } from '../lib/device'
import { CelestialObject } from './CelestialObject'
import { PlanetBody, SunBody } from './PlanetBody'

// Orbits and sizes are visually compressed (NOT to scale). Speeds use a compressed sqrt(period) law.
const omega = (days: number) => 0.09 * Math.sqrt(365.25 / days)
const SUN = new THREE.Vector3()

function OrbitRing({ radius, id }: { radius: number; id: string }) {
  const line = useRef<THREE.LineLoop>(null!)
  const geo = useMemo(() => {
    const pts = Array.from({ length: 256 }, (_, i) => new THREE.Vector3(Math.cos((i / 256) * 6.2832) * radius, 0, Math.sin((i / 256) * 6.2832) * radius))
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [radius])
  useFrame(() => {
    const s = useStore.getState()
    const m = line.current.material as THREE.LineBasicMaterial
    m.opacity += ((s.selected === id ? 0.5 : s.hovered === id ? 0.35 : 0.13) - m.opacity) * 0.15
  })
  return (
    <lineLoop ref={line} geometry={geo}>
      <lineBasicMaterial color="#8fa0ff" transparent opacity={0.13} depthWrite={false} />
    </lineLoop>
  )
}

function AsteroidBelt() {
  const geo = useMemo(() => {
    const n = Q.mobile ? 700 : 2200, p = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.2832, r = 29.5 + Math.random() * 8
      p.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.9, Math.sin(a) * r], i * 3)
    }
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p, 3))
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial size={1.8} sizeAttenuation={false} color="#9aa0ae" transparent opacity={0.6} depthWrite={false} />
    </points>
  )
}

export function SolarSystem() {
  const selected = useStore((s) => s.selected)
  const select = useStore((s) => s.select)
  const view = useStore((s) => s.view)
  const groups = useRef<Record<string, THREE.Group | null>>({})
  const t = useRef(0)

  // Place planets at their starting phase immediately so the first frame is already correct.
  useEffect(() => {
    PLANETS.forEach((p) => groups.current[p.id]?.position.set(Math.cos(p.visual.phase) * p.visual.orbit, 0, Math.sin(p.visual.phase) * p.visual.orbit))
  }, [])

  useFrame((_, dt) => {
    t.current += dt * (useStore.getState().reduced ? 0.1 : 1)
    PLANETS.forEach((p) => {
      const a = p.visual.phase + t.current * omega(p.visual.period)
      groups.current[p.id]?.position.set(Math.cos(a) * p.visual.orbit, 0, Math.sin(a) * p.visual.orbit)
    })
  })

  return (
    <>
      <CelestialObject id="sun" name="Sun" radius={BODIES[0].visual.radius} selected={selected === 'sun'} onSelect={select}>
        <SunBody radius={BODIES[0].visual.radius} />
      </CelestialObject>
      <AsteroidBelt />
      {PLANETS.map((p) => (
        <group key={p.id}>
          <OrbitRing radius={p.visual.orbit} id={p.id} />
          <CelestialObject
            ref={(g) => { groups.current[p.id] = g }}
            id={p.id} name={p.name} radius={p.visual.radius * (p.visual.rings ? 1.9 : 1)}
            selected={selected === p.id} onSelect={select}
          >
            <PlanetBody body={p} sun={SUN} parallax={view === 'planet' && selected === p.id} />
          </CelestialObject>
        </group>
      ))}
    </>
  )
}
