import type { Object3D } from 'three'

/** Scene objects by id, so the camera can find (and follow) whatever is selected. */
export const objects = new Map<string, Object3D>()
