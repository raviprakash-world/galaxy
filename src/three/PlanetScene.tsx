import { useMemo } from 'react'
import * as THREE from 'three'
import { getBody } from '../data/planets'
import { makeGlow } from '../lib/painters'
import { PlanetBody } from './PlanetBody'

/** A single lit world on its own, used for the hero. The Sun is a distant light with a soft flare. */
export function PlanetScene({ id = 'earth', radius = 2.35 }: { id?: string; radius?: number }) {
  const body = getBody(id)!
  const sun = useMemo(() => new THREE.Vector3(-22, 6, 6), [])
  const flare = useMemo(() => makeGlow([[0, 'rgba(255,248,235,1)'], [0.05, 'rgba(255,230,190,.8)'], [0.25, 'rgba(160,190,255,.16)'], [1, 'rgba(120,150,255,0)']], 256), [])
  return (
    <>
      <PlanetBody body={body} radius={radius} sun={sun} spinScale={0.35} parallax ambient={0.03} />
      <sprite position={sun} scale={[26, 26, 1]}>
        <spriteMaterial map={flare} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.9} />
      </sprite>
    </>
  )
}
