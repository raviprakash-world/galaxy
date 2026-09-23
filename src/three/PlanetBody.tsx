import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Body } from '../data/planets'
import { useStore } from '../store'
import { Q } from '../lib/device'
import { makeGlow, makeLandMask, makeOceanMask } from '../lib/painters'
import { atmoFrag, atmoVert, cloudFrag, planetFrag, planetVert, ringFrag, ringVert, sunFrag } from '../shaders/planet'

const sphere = new THREE.SphereGeometry(1, Q.segs, Q.segs / 2)
const ring = new THREE.RingGeometry(1.24, 2.27, 160, 1)
const defines = { OCT: Q.octaves }
let mask: THREE.Texture | null = null // built once, only when a textured world (Earth) is first shown
let glow: THREE.Texture | null = null

// Real Earth imagery (NASA-derived, see README "Assets"), loaded once and crossfaded in once ready.
// If any file 404s or the network is unavailable, earthTex.ready simply never flips and Earth stays procedural.
let dummyTex: THREE.Texture | null = null
const getDummy = () => (dummyTex ??= new THREE.CanvasTexture(document.createElement('canvas')))
const earthTex: { day: THREE.Texture | null; night: THREE.Texture | null; clouds: THREE.Texture | null; ocean: THREE.Texture | null; ready: boolean } =
  { day: null, night: null, clouds: null, ocean: null, ready: false }
let loadingEarthTex = false
function ensureEarthTextures() {
  if (loadingEarthTex || earthTex.ready) return
  loadingEarthTex = true
  const loader = new THREE.TextureLoader()
  let got = 0
  const onOne = () => { if (++got === 3) earthTex.ready = true }
  loader.load('/textures/earth/day.jpg', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    earthTex.day = t
    earthTex.ocean = makeOceanMask(t.image as HTMLImageElement)
    onOne()
  }, undefined, () => {})
  loader.load('/textures/earth/night.jpg', (t) => { t.colorSpace = THREE.SRGBColorSpace; earthTex.night = t; onOne() }, undefined, () => {})
  loader.load('/textures/earth/clouds.jpg', (t) => { earthTex.clouds = t; onOne() }, undefined, () => {})
}

interface Props {
  body: Body
  radius?: number
  sun: THREE.Vector3 // world position of the light
  spinScale?: number
  parallax?: boolean // tilt gently toward the pointer
  ambient?: number
}

const _q = new THREE.Quaternion()

/**
 * One reusable planet renderer: surface, optional cloud layer, atmosphere shell and rings.
 * Everything is shader-driven; layer visibility for Earth comes from the store.
 */
export function PlanetBody({ body, radius, sun, spinScale = 1, parallax = false, ambient = 0.025 }: Props) {
  const v = body.visual
  const r = radius ?? v.radius
  const isEarth = body.id === 'earth'
  const wrapper = useRef<THREE.Group>(null!)
  const tilt = useRef<THREE.Group>(null!)
  const surface = useRef<THREE.Mesh>(null!)
  const clouds = useRef<THREE.Mesh>(null)
  const atmo = useRef<THREE.Mesh>(null)
  const ringMesh = useRef<THREE.Mesh>(null)

  const u = useMemo(() => {
    if (isEarth && !mask) mask = makeLandMask()
    if (isEarth) ensureEarthTextures()
    const dummy = getDummy()
    const shared = {
      uSun: { value: sun }, uCenter: { value: new THREE.Vector3() }, uTime: { value: 0 }, uRingN: { value: new THREE.Vector3(0, 1, 0) },
      uRadius: { value: r }, uDayNight: { value: 1 }, uTexOn: { value: isEarth && earthTex.ready ? 1 : 0 },
    }
    return {
      planet: {
        ...shared, uKind: { value: v.kind }, uMask: { value: mask }, uAmbient: { value: ambient },
        uAtmo: { value: new THREE.Vector3(...(v.atmo ?? [0, 0, 0])) }, uAtmoAmt: { value: v.atmo ? (isEarth ? 0.9 : 0.55) : 0 },
        uRing: { value: v.rings ? 1 : 0 }, uFocus: { value: 0 }, uLights: { value: 1 }, uAtmoOn: { value: 1 },
        uDayMap: { value: earthTex.day ?? dummy }, uNightMap: { value: earthTex.night ?? dummy }, uOceanMap: { value: earthTex.ocean ?? dummy },
      },
      cloud: { ...shared, uCloudMap: { value: earthTex.clouds ?? dummy } },
      atmo: { uSun: shared.uSun, uCenter: shared.uCenter, uDayNight: shared.uDayNight, uColor: { value: new THREE.Vector3(...(v.atmo ?? [0, 0, 0])) }, uInner: { value: 1 / 1.06 }, uStrength: { value: isEarth ? 1.0 : 0.8 } },
      ring: { uSun: shared.uSun, uCenter: shared.uCenter, uRingN: shared.uRingN, uRadius: shared.uRadius },
    }
  }, [body.id, sun, r]) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ pointer }, dt) => {
    const st = useStore.getState()
    const slow = (st.reduced ? 0.15 : 1) * spinScale
    u.planet.uTime.value += dt * (st.reduced ? 0.15 : 1)
    u.cloud.uTime.value = u.planet.uTime.value
    surface.current.rotation.y += dt * v.spin * slow
    if (clouds.current) clouds.current.rotation.y += dt * v.spin * slow * 0.25
    if (ringMesh.current) ringMesh.current.rotation.z += dt * 0.01 * slow
    tilt.current.getWorldPosition(u.planet.uCenter.value)
    if (v.rings) {
      tilt.current.getWorldQuaternion(_q)
      u.planet.uRingN.value.set(0, 1, 0).applyQuaternion(_q)
    }
    const live = parallax && !st.reduced
    wrapper.current.rotation.x += ((live ? -pointer.y * 0.16 : 0) - wrapper.current.rotation.x) * 0.05
    wrapper.current.rotation.y += ((live ? pointer.x * 0.2 : 0) - wrapper.current.rotation.y) * 0.05
    if (isEarth) {
      const e = st.earth
      u.planet.uFocus.value = e.focus === 'land' ? 1 : e.focus === 'ocean' ? 2 : 0
      u.planet.uLights.value = e.lights ? 1 : 0
      u.planet.uDayNight.value = e.daynight ? 1 : 0
      u.planet.uAtmoOn.value = e.atmosphere ? 1 : 0
      if (clouds.current) clouds.current.visible = e.clouds
      if (atmo.current) atmo.current.visible = e.atmosphere
      // Real imagery just finished loading: point the uniforms at it and crossfade in.
      if (earthTex.ready && u.planet.uDayMap.value !== earthTex.day) {
        u.planet.uDayMap.value = earthTex.day!; u.planet.uNightMap.value = earthTex.night!; u.planet.uOceanMap.value = earthTex.ocean!
        u.cloud.uCloudMap.value = earthTex.clouds!
      }
      u.planet.uTexOn.value += ((earthTex.ready ? 1 : 0) - u.planet.uTexOn.value) * (st.reduced ? 1 : Math.min(dt * 1.5, 1))
    }
  })

  return (
    <group ref={wrapper}>
      <group ref={tilt} rotation={[0, 0, THREE.MathUtils.degToRad(v.tilt)]}>
        <mesh ref={surface} geometry={sphere} scale={r} rotation={[0, isEarth ? -1.9 : v.phase, 0]}>
          <shaderMaterial vertexShader={planetVert} fragmentShader={planetFrag} uniforms={u.planet} defines={defines} />
        </mesh>
        {isEarth && (
          <mesh ref={clouds} geometry={sphere} scale={r * 1.012} rotation={[0, -1.9, 0]}>
            <shaderMaterial vertexShader={planetVert} fragmentShader={cloudFrag} uniforms={u.cloud} defines={defines} transparent depthWrite={false} />
          </mesh>
        )}
        {v.atmo && (
          <mesh ref={atmo} geometry={sphere} scale={r * 1.06}>
            <shaderMaterial vertexShader={atmoVert} fragmentShader={atmoFrag} uniforms={u.atmo} side={THREE.BackSide} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        )}
        {v.rings && (
          <mesh ref={ringMesh} geometry={ring} scale={r} rotation={[-Math.PI / 2, 0, 0]}>
            <shaderMaterial vertexShader={ringVert} fragmentShader={ringFrag} uniforms={u.ring} defines={defines} transparent depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </group>
  )
}

/** The Sun: animated granulation with a soft corona sprite. */
export function SunBody({ radius }: { radius: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  const map = useMemo(() => (glow ??= makeGlow([[0, 'rgba(255,240,200,1)'], [0.12, 'rgba(255,190,110,.55)'], [0.35, 'rgba(255,140,60,.16)'], [1, 'rgba(255,120,40,0)']], 256)), [])
  useFrame((_, dt) => {
    const st = useStore.getState()
    uniforms.uTime.value += dt * (st.reduced ? 0.15 : 1)
    mesh.current.rotation.y += dt * 0.02 * (st.reduced ? 0.15 : 1)
  })
  return (
    <group>
      <mesh ref={mesh} geometry={sphere} scale={radius}>
        <shaderMaterial vertexShader={planetVert} fragmentShader={sunFrag} uniforms={uniforms} defines={defines} />
      </mesh>
      <sprite scale={[radius * 9, radius * 9, 1]}>
        <spriteMaterial map={map} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.85} />
      </sprite>
    </group>
  )
}
