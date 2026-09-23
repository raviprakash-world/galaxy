import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { Q } from '../lib/device'
import { useStore } from '../store'
import { CameraController } from './CameraController'
import { PlanetScene } from './PlanetScene'
import { SolarSystem } from './SolarSystem'
import { Starfield } from './Starfield'

const GalaxyMap = lazy(() => import('./GalaxyMap').then((m) => ({ default: m.GalaxyMap })))
const DeepSpace = lazy(() => import('./DeepSpace').then((m) => ({ default: m.DeepSpace })))

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(e: unknown) { console.error('Scene failed', e); useStore.getState().set({ webglFailed: true }) }
  render() { return this.state.failed ? null : this.props.children }
}

/** Signals that real frames are being drawn, so the loading screen can lift. */
function Ready() {
  const [n, setN] = useState(0)
  useFrame(() => { if (n < 4) setN(n + 1); else if (n === 4) { setN(5); useStore.getState().set({ ready: true }) } })
  return null
}

function Contents() {
  const view = useStore((s) => s.view)
  return (
    <>
      <CameraController />
      <Starfield />
      {view === 'hero' && <PlanetScene />}
      {(view === 'solar' || view === 'planet') && <SolarSystem />}
      <Suspense fallback={null}>
        {view === 'galaxy' && <GalaxyMap />}
        {view === 'deep' && <DeepSpace />}
      </Suspense>
    </>
  )
}

export default function Scene() {
  const [dpr, setDpr] = useState(Q.dpr)
  useEffect(() => {
    const t = setTimeout(() => useStore.getState().set({ ready: true }), 6000) // never trap the user behind the loader
    return () => clearTimeout(t)
  }, [])
  return (
    <Boundary>
      <Canvas
        dpr={[1, dpr]} flat
        camera={{ fov: 45, near: 0.05, far: 3000, position: [0, 0.5, 34] }}
        gl={{ antialias: !Q.mobile, powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); useStore.getState().set({ webglFailed: true }) })}
        aria-label="Interactive 3D view of the universe" role="img"
      >
        <color attach="background" args={['#050509']} />
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Ready />
        <Contents />
      </Canvas>
    </Boundary>
  )
}
