import { forwardRef, useEffect, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'
import { objects } from './registry'

interface Props {
  id: string
  name: string
  radius: number // world-space size of the clickable / label region
  children: ReactNode
  position?: [number, number, number]
  selected: boolean
  onSelect: (id: string) => void
}

const _p = new THREE.Vector3()

/**
 * Anything you can hover, click, focus and follow: registers itself for the camera,
 * adds a generous invisible hit area, and renders a keyboard-focusable label.
 */
export const CelestialObject = forwardRef<THREE.Group, Props>(function CelestialObject(
  { id, name, radius, children, position, selected, onSelect }, ref,
) {
  const group = useRef<THREE.Group>(null!)
  const label = useRef<HTMLDivElement>(null)
  const hovered = useStore((s) => s.hovered === id)
  const set = useStore((s) => s.set)

  useEffect(() => {
    objects.set(id, group.current)
    return () => { objects.delete(id) }
  }, [id])

  // Hide the label when the camera is close enough that the object itself is the label.
  useFrame(({ camera }) => {
    if (!label.current) return
    const near = camera.position.distanceTo(group.current.getWorldPosition(_p)) < radius * 6.5
    label.current.style.opacity = near ? '0' : ''
    label.current.style.pointerEvents = near ? 'none' : ''
  })

  return (
    <group
      ref={(g) => { group.current = g!; if (typeof ref === 'function') ref(g); else if (ref) ref.current = g }}
      position={position}
    >
      {children}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); set({ hovered: id }) }}
        onPointerOut={() => set({ hovered: null })}
        onClick={(e) => { e.stopPropagation(); onSelect(id) }}
      >
        <sphereGeometry args={[Math.max(radius * 1.25, 0.9), 12, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <Html center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
        <div ref={label} className="obj-label" data-hover={hovered} data-selected={selected}>
          <button type="button" onClick={() => onSelect(id)} aria-label={`Focus ${name}`} aria-pressed={selected}>
            <span className="obj-dot" />
            {name}
          </button>
        </div>
      </Html>
    </group>
  )
})
