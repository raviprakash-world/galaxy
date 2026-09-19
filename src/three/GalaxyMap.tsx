import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { Q } from '../lib/device'
import { makeGlow } from '../lib/painters'
import { useStore } from '../store'
import { cameraApi } from './cameraApi'
import { arm, SUN_MARKER } from './layout'

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 0.5

const vert = /* glsl */ `
attribute float aSize; attribute vec3 aColor;
uniform float uTime; uniform float uPx; uniform float uMax; uniform float uGain;
varying vec3 vC;
void main(){
  vec3 p = position;
  float r = length(p.xz);
  float a = uTime*.35/(1.+r*.09); // differential rotation: inner stars orbit faster
  float c = cos(a), s = sin(a);
  p.xz = mat2(c,-s,s,c)*p.xz;
  vec4 mv = modelViewMatrix*vec4(p,1.);
  gl_PointSize = clamp(aSize*uPx*(230./-mv.z), 1., uMax*uPx);
  gl_Position = projectionMatrix*mv;
  vC = aColor*uGain;
}`
const frag = /* glsl */ `
varying vec3 vC;
void main(){ float d = length(gl_PointCoord-.5); float a = smoothstep(.5,0.,d); gl_FragColor = vec4(vC*a*a, 1.); }`

/** Stars (or, with `haze`, big soft blobs that fill in the arms) sampled from a log-spiral model with a bar and bulge. */
function build(n: number, haze: boolean) {
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n)
  const c = new THREE.Color()
  for (let i = 0; i < n; i++) {
    let x: number, y: number, z: number, hue: [number, number, number]
    if (!haze && Math.random() < 0.2) { // central bulge and bar
      const s = 2.2 + Math.random() * 1.2
      const bx = gauss() * s * 1.9, bz = gauss() * s * 0.8, ang = 0.47
      x = bx * Math.cos(ang) - bz * Math.sin(ang); z = bx * Math.sin(ang) + bz * Math.cos(ang); y = gauss() * s * 0.55
      hue = [1, 0.82 + Math.random() * 0.1, 0.55 + Math.random() * 0.15]
    } else {
      const r = 3 + 47 * Math.pow(Math.random(), haze ? 1.2 : 1.5)
      const inArm = haze || Math.random() < 0.78
      const th = inArm ? arm(r, (Math.random() * 4) | 0) + gauss() * (0.09 + 0.003 * r) : Math.random() * 6.2832
      x = Math.cos(th) * r; z = Math.sin(th) * r; y = gauss() * (0.25 + 0.5 * Math.exp(-r / 12))
      const t = Math.min(r / 40, 1)
      hue = inArm ? (!haze && Math.random() < 0.06 ? [1, 0.5, 0.72] : [0.6 + t * 0.2, 0.72 + t * 0.12, 1]) : [1, 0.86, 0.66]
    }
    pos.set([x, y, z], i * 3)
    c.setRGB(hue[0], hue[1], hue[2])
    const b = 0.5 + Math.random() * 0.5
    col.set([c.r * b, c.g * b, c.b * b], i * 3)
    size[i] = haze ? 14 + Math.random() * 16 : 1.2 + Math.pow(Math.random(), 3) * 2.6
  }
  return new THREE.BufferGeometry()
    .setAttribute('position', new THREE.BufferAttribute(pos, 3))
    .setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    .setAttribute('aSize', new THREE.BufferAttribute(size, 1))
}

export function GalaxyMap() {
  const { gl } = useThree()
  const geo = useMemo(() => build(Q.galaxy, false), [])
  const hazeGeo = useMemo(() => build(Q.mobile ? 1200 : 3500, true), [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPx: { value: 1 }, uMax: { value: 7 }, uGain: { value: 1.5 } }), [])
  const hazeU = useMemo(() => ({ uTime: uniforms.uTime, uPx: uniforms.uPx, uMax: { value: 90 }, uGain: { value: 0.07 } }), [uniforms])
  const core = useMemo(() => makeGlow([[0, 'rgba(255,236,200,1)'], [0.2, 'rgba(255,200,130,.45)'], [1, 'rgba(255,170,90,0)']]), [])
  const haze = useMemo(() => makeGlow([[0, 'rgba(150,170,255,.5)'], [0.5, 'rgba(110,130,230,.16)'], [1, 'rgba(90,100,200,0)']]), [])

  useFrame((_, dt) => {
    uniforms.uTime.value += dt * (useStore.getState().reduced ? 0.1 : 1)
    uniforms.uPx.value = gl.getPixelRatio()
  })

  const zoomToSun = () => {
    const st = useStore.getState()
    cameraApi.fly(SUN_MARKER, 2.2)
    setTimeout(() => void st.go({ view: 'solar' }), st.reduced ? 100 : 1500)
  }

  return (
    <>
      <points geometry={geo} frustumCulled={false}>
        <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points geometry={hazeGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={hazeU} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <sprite scale={[16, 16, 1]}><spriteMaterial map={core} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.9} /></sprite>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial map={haze} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.35} />
      </mesh>
      <Html position={[0, 0, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div className="tag" style={{ transform: 'translateY(34px)' }}>GALACTIC CENTRE<br /><span>SAGITTARIUS A* · ~26,000 LY</span></div>
      </Html>
      <group position={SUN_MARKER}>
        <Html center zIndexRange={[20, 0]}>
          <button type="button" className="you-are-here" onClick={zoomToSun} aria-label="You are here: Solar System. Zoom in to the Solar System">
            <span className="pulse" />
            <span className="txt">YOU ARE HERE<b>SOLAR SYSTEM</b></span>
          </button>
        </Html>
      </group>
    </>
  )
}
