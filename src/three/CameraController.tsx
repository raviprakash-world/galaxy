import { useEffect, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { scene, useStore } from '../store'
import { getBody } from '../data/planets'
import { getDeep } from '../data/deepspace'
import { deepPosition, SUN_MARKER } from './layout'
import { cameraApi } from './cameraApi'
import { objects } from './registry'
import { Q } from '../lib/device'

interface Goal {
  follow?: string // object id to keep looking at
  target: THREE.Vector3
  dist: number
  dir?: THREE.Vector3 // camera direction relative to the target; keeps the current one when omitted
  arriving: boolean
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z).normalize()
const _a = new THREE.Vector3()
const _b = new THREE.Vector3()

/** Where the camera should be for the current app state. */
function goalFor(size: { width: number; height: number }): Goal {
  const { view, selected, deepId } = useStore.getState()
  const aspect = size.width / size.height
  const portrait = aspect < 1
  if (view === 'hero') return { target: new THREE.Vector3(), dist: portrait ? 12.5 : 9, dir: v(0, 0.05, 1), arriving: true }
  if (view === 'galaxy') return { target: new THREE.Vector3(), dist: portrait ? 112 : 100, dir: v(0, 0.72, 0.69), arriving: true }
  if (view === 'deep') {
    const o = getDeep(deepId)
    if (o) {
      const p = deepPosition(o)
      return { follow: o.id, target: p, dist: o.size * 2.3 + 2, dir: _a.copy(p).negate().normalize().add(_b.set(0, 0.25, 0)).normalize().clone(), arriving: true }
    }
    return { target: new THREE.Vector3(), dist: portrait ? 150 : 96, dir: v(0, 0.55, 0.83), arriving: true }
  }
  const body = getBody(selected)
  if (body) {
    const p = objects.get(body.id)?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3()
    const s = _a.copy(p).setY(0).normalize()
    const dir = body.id === 'sun' ? v(0.3, 0.2, 1) : _b.copy(s).multiplyScalar(-0.5).addScaledVector(new THREE.Vector3(-s.z, 0, s.x), 0.8).add(new THREE.Vector3(0, 0.28, 0)).normalize().clone()
    const r = body.visual.radius * (body.visual.rings ? 1.75 : 1)
    const mult = view === 'planet' ? 3 : 4.2
    return { follow: body.id, target: p, dist: r * mult * (portrait ? 1.4 : 1), dir, arriving: true }
  }
  // Solar overview: fit Neptune's orbit to the screen.
  const fit = Math.min(112 / (0.414 * Math.min(aspect, 1.7)), Q.mobile ? 340 : 200)
  return { target: new THREE.Vector3(), dist: fit, dir: v(0, 0.62, 0.78), arriving: true }
}

/** Where the camera starts when entering a scene, so arrival reads as a zoom. */
function entryFor(view: string) {
  if (view === 'galaxy') return { target: SUN_MARKER.clone(), dist: 3, dir: v(0, 0.3, 1) }
  if (view === 'hero') return { target: new THREE.Vector3(), dist: 34, dir: v(0, 0.05, 1) }
  if (view === 'deep') return { target: new THREE.Vector3(), dist: 300, dir: v(0, 0.55, 0.83) }
  return { target: new THREE.Vector3(), dist: 420, dir: v(0, 0.62, 0.78) }
}

export function CameraController() {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const goal = useRef<Goal | null>(null)
  const prevScene = useRef<string | null>(null)
  const offset = useRef({ x: 0, y: 0 })
  const { camera, size } = useThree()
  const view = useStore((s) => s.view)
  const selected = useStore((s) => s.selected)
  const deepId = useStore((s) => s.deepId)
  const resetTick = useStore((s) => s.resetTick)
  const reduced = useStore((s) => s.reduced)

  // Any change of what we're looking at sets a new goal. A new scene first snaps to its entry pose.
  useEffect(() => {
    const c = controls.current
    if (!c) return
    const sc = scene(view)
    if (prevScene.current !== sc) {
      const e = entryFor(view)
      c.target.copy(e.target)
      camera.position.copy(e.target).addScaledVector(e.dir, e.dist)
      c.update()
      prevScene.current = sc
    }
    goal.current = goalFor(size)
  }, [view, selected, deepId, resetTick, camera, size.width < 768]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cameraApi.fly = (target, dist) => { goal.current = { target: target.clone(), dist, arriving: true } }
    if (import.meta.env.DEV) Object.assign(window, { __gx: { camera, controls, goal, objects } }) // dev-only test handle
  }, [])

  useEffect(() => {
    const c = controls.current
    if (!c) return
    const stop = () => { const g = goal.current; if (g) { if (g.follow) g.arriving = false; else goal.current = null } }
    c.addEventListener('start', stop)
    return () => c.removeEventListener('start', stop)
  })

  useFrame((_, dt) => {
    const c = controls.current
    if (!c) return
    dt = Math.min(dt, 0.35)
    const st = useStore.getState()
    const k = 1 - Math.exp(-dt * (reduced ? 12 : 2.6))

    // Shift the projection centre so the subject sits in the free part of the screen, away from panels.
    const mobile = size.width < 768
    let dx = 0, dy = 0
    if (view === 'hero') mobile ? (dy = 0.17) : (dx = 0.22)
    else if (selected || deepId) mobile ? (dy = -0.2) : (dx = -0.14)
    const o = offset.current
    o.x += (dx * size.width - o.x) * k
    o.y += (dy * size.height - o.y) * k
    if (Math.abs(o.x) + Math.abs(o.y) > 0.5) camera.setViewOffset(size.width, size.height, -o.x, -o.y, size.width, size.height)
    else if ((camera as THREE.PerspectiveCamera).view?.enabled) (camera as THREE.PerspectiveCamera).clearViewOffset()

    // Leaving a scale: pull back while the screen fades.
    if (st.fade?.on) {
      _a.copy(camera.position).sub(c.target)
      _a.multiplyScalar(1 + dt * (reduced ? 0 : 0.9))
      camera.position.copy(c.target).add(_a)
    }

    const g = goal.current
    if (g) {
      const obj = g.follow ? objects.get(g.follow) : undefined
      const tgt = obj ? obj.getWorldPosition(_b) : g.target
      if (g.arriving) {
        _a.copy(camera.position).sub(c.target)
        let len = _a.length()
        _a.normalize()
        if (g.dir) _a.lerp(g.dir, k).normalize()
        len += (g.dist - len) * k
        c.target.lerp(tgt, k)
        camera.position.copy(c.target).addScaledVector(_a, len)
        if (c.target.distanceTo(tgt) < 0.02 * g.dist && Math.abs(len - g.dist) < 0.02 * g.dist) {
          g.arriving = false
          if (!g.follow) goal.current = null
        }
      } else if (g.follow) {
        _a.copy(tgt).sub(c.target) // keep tracking a moving target with the user's own offset
        c.target.add(_a)
        camera.position.add(_a)
      }
    }
    c.update()
  })

  const solo = !!(selected || deepId)
  const body = getBody(selected)
  const minD = view === 'hero' ? 5 : body ? body.visual.radius * 1.3 : view === 'galaxy' ? 1.5 : view === 'deep' ? 3 : 8
  const maxD = view === 'hero' ? 20 : view === 'galaxy' ? 220 : view === 'deep' ? 260 : 420
  return (
    <OrbitControls
      ref={controls} makeDefault enableDamping dampingFactor={0.08}
      rotateSpeed={0.55} zoomSpeed={0.8} panSpeed={0.7} screenSpacePanning
      enablePan={view !== 'hero' && !solo} minDistance={minD} maxDistance={maxD}
    />
  )
}
