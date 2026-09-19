import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Q } from '../lib/device'
import { useStore } from '../store'
import { skyFrag, skyVert, starFrag, starVert } from '../shaders/planet'

const PALETTE = [[0.7, 0.8, 1], [0.85, 0.9, 1], [1, 1, 1], [1, 0.93, 0.8], [1, 0.8, 0.6]]

/** Deep-space backdrop: a faint nebula sky and thousands of stars, glued to the camera like a skybox. */
export function Starfield() {
  const group = useRef<THREE.Group>(null!)
  const { camera, gl } = useThree()
  const geo = useMemo(() => {
    const n = Q.stars, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n), phase = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u)
      pos.set([s * Math.cos(a) * 500, u * 500, s * Math.sin(a) * 500], i * 3)
      const c = PALETTE[(Math.random() * PALETTE.length) | 0], b = 0.5 + Math.random() * 0.5
      col.set([c[0] * b, c[1] * b, c[2] * b], i * 3)
      size[i] = 1.3 + Math.pow(Math.random(), 6) * 3.4
      phase[i] = Math.random() * 6.28
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
    return g
  }, [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPx: { value: Math.min(devicePixelRatio, Q.dpr) }, uTw: { value: 1 } }), [])

  useFrame(({ pointer }, dt) => {
    const reduced = useStore.getState().reduced
    uniforms.uTime.value += dt
    uniforms.uTw.value = reduced ? 0 : 1
    uniforms.uPx.value = gl.getPixelRatio()
    group.current.position.copy(camera.position)
    if (!reduced) { // very slow drift plus a touch of pointer parallax
      group.current.rotation.y += dt * 0.0025
      group.current.rotation.x += (pointer.y * 0.012 - group.current.rotation.x) * 0.02
    }
  })

  return (
    <group ref={group}>
      <mesh renderOrder={-10} frustumCulled={false}>
        <sphereGeometry args={[900, 32, 16]} />
        <shaderMaterial vertexShader={skyVert} fragmentShader={skyFrag} defines={{ OCT: Q.mobile ? 3 : 4 }} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <points geometry={geo} frustumCulled={false} renderOrder={-9}>
        <shaderMaterial vertexShader={starVert} fragmentShader={starFrag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}
