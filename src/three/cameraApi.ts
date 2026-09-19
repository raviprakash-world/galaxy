import type { Vector3 } from 'three'

/** Imperative hook into CameraController for one-off flights (e.g. the galaxy's "you are here" marker). */
export const cameraApi: { fly: (target: Vector3, dist: number) => void } = { fly: () => {} }
