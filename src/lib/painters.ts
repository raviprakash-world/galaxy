// Canvas-2D procedural imagery: the Earth land mask, glow sprites, deep-space object visuals and 2D planet discs.
// These are illustrative renderings, not photographs. See README ("Assets").
import * as THREE from 'three'
import type { Kind } from '../data/deepspace'
import type { Body } from '../data/planets'

/* ---------- Earth land mask (hand-simplified continent outlines, lon/lat) ---------- */
const LAND: number[][] = [
  // North America
  [-168,65,-162,70,-156,71,-141,69.5,-128,70,-115,68,-100,68,-95,68,-94,60,-92,57,-85,55,-82,52,-79,51,-78,56,-77,60,-73,62,-70,60,-64,60,-60,55,-56,52,-59,48,-64,47,-66,44,-70,43,-70,41.5,-74,40,-76,37,-76,35,-80,32,-81,29,-80,25.5,-82,26,-83,29,-85,30,-89,30,-91,29,-94,29.5,-97,27,-97.5,22,-96,19,-94,18,-91,18.5,-90,21,-87,21.5,-88,17,-88,15.8,-84,15.5,-83,11,-81,9,-79,9.5,-77.5,8.5,-78,7,-80,7.5,-82,8,-85,10,-87,13,-91,14,-94,16,-97,16,-101,17.5,-105,20,-106,23,-109,26,-112,29,-114.7,31.5,-112.5,28,-110,23,-112,25,-115,28.5,-117,32.5,-120.5,34.5,-122.5,37.5,-124,40.5,-124,46,-124.5,48,-123,49,-127,51,-130,55,-134,58,-138,59,-144,60,-150,59.5,-152,58,-158,57,-162,55,-165,54.5,-160,58.5,-162,60,-165,62,-166,64],
  // Greenland, Baffin, Ellesmere, Victoria
  [-73,78,-60,82,-30,83.5,-20,80,-18,76,-22,70,-32,68,-42,61,-48,60.5,-53,66,-55,70,-62,76],
  [-80,73.5,-72,71.5,-67,69,-62,66.5,-65,63,-72,63.5,-78,64.5,-74,67.5,-82,70],
  [-90,77,-78,76,-72,78.5,-62,82,-80,83,-92,81],
  [-118,71.5,-105,73,-100,70,-105,68.7,-115,69],
  // South America
  [-77.5,8.5,-75,11,-72,12,-71,11,-68,10.5,-63,10.7,-61,9,-58,7,-54,5.5,-51,4,-50,0,-48,-1,-44,-2.5,-40,-3,-35,-5.5,-35,-9,-37,-12,-39,-14,-39,-18,-41,-22,-44,-23,-48,-26,-49,-29,-53,-33.5,-57,-35,-57,-38,-62,-39,-65,-41,-64.5,-43,-67,-46,-66,-48,-69,-51,-68.5,-53.5,-66,-55,-71,-54.5,-74,-52,-75,-48,-74,-42,-73,-37,-71.5,-30,-70.5,-24,-70,-18,-75,-15,-77,-12,-79.5,-7,-81,-5,-80,-2,-80,0,-78,2,-77.5,4,-77,7],
  // Africa + Madagascar
  [-9.5,35,-6,35.8,-2,35,3,36.8,10,37.2,11,34,15,32.5,20,32,19,30.3,24,32,29,31,32,31.2,32.5,29.5,34,27,36,22,38,18,39.5,15.5,43,12.5,44,10.5,51,11.8,51,10.4,48,5,44,1,41,-2,39,-5,39.5,-8,40.5,-11,40.5,-15,37,-18,35,-20,35.5,-24,33,-26,32.5,-28.5,30,-31,27,-33.5,22,-34,19,-34.5,18,-32,15,-27,14.5,-22,12,-17,13.5,-12,12,-6,9,-1,9.5,3.5,6,4.3,2,6.2,-3,5,-7.5,4.4,-11,6.5,-13.5,9.5,-16.5,12.5,-17,14.7,-16.5,19,-17,21,-15,24,-13,27.5,-10,29.5,-9.5,32],
  [49,-12,50.5,-15.5,47,-25,44,-24.5,43.5,-21,44.5,-16,47,-15],
  // Eurasia
  [-9,37,-9,43,-1.5,43.5,-1.2,46,-4.5,48.5,-1.5,49.5,2,51,4,52,8,54,8.5,57.5,10.5,57,10,54.5,14,54,19,54.5,21,57,24,58,28,59.5,23,60,21.5,61,25,65,22,65.8,17.5,62,19,60,16.5,57,12.5,56,11,59,8,58,5.5,59,5,62,10,64,14,67,19,70,25,71,31,70,33,69,41,67,36,65.5,40,64.5,44,66,44,68,54,68.5,60,69,68,69,66,71,73,72,80,73,87,75,100,77,105,77.5,113,74,128,73,140,72.5,152,71,160,70,170,70,180,69,180,65,178,62,170,60,163,60,160,54,156,51,155.5,56,158,58.5,155,59.5,142,59,137,54,141,52,140,48,135,43.5,131,42.5,129.5,41,128,39,129.5,36,126.5,34.5,126,37.5,125,39.5,121.5,40.5,121,38.8,118,39,119,37.5,122.5,37,120,35,121.5,31.5,122,29.5,120,26,117,23.5,114,22.3,110,21,108,21.5,106.5,19,109,15,109,12,107,10.5,105,8.6,105,10,102.5,12,100.5,13.5,99.5,10,100.5,7,103,5,103.5,1.5,101.5,2.5,100,6,98.5,8,98.3,12,97.5,16.5,94.5,16,94,19,92,21,90.5,22.5,87,21.5,85,19.5,82,16.5,80,15,80,10,78,8.3,76,10,74.5,15,73,20,72.7,21,70.5,20.8,69,22.5,67,24.8,62,25,57,25.7,56.5,27,52,27.5,50,30,48,30,48.5,29.5,50,26.5,51.5,24.5,54,24,56.4,26.3,56.8,24.5,58.7,23.5,59.8,22.5,58,20,55,17,52,16,48,14,45,12.8,43.3,13,42.8,16,40,20,37,25,35,28,34.8,29.5,34.2,31.3,35.5,33,36,35.8,32.5,36.2,30,36.3,27.5,37,26.5,39.5,26,40.5,24,40,23,38,21,38,19.5,40,19,42,16,43.5,14.5,45,13.7,45.7,12.3,45.3,12.5,44,14,42.5,16,41.9,18.5,40,17,40.5,16.5,39,15.7,38,15,40,12,42,10,44,8,44.3,6,43,3.5,43.3,3,42,-0.3,39.5,0,38.5,-2,36.7,-5.5,36],
  // Islands
  [-5.5,50,1.5,51,1.7,52.8,0,53.5,-2,55.8,-2,57.6,-3.5,58.6,-5,58.5,-6,56.5,-5,55,-3,54.8,-3,53.5,-4.5,52.8,-5,51.7,-3,51.4],
  [-10,52,-6,52.2,-6,54.5,-8,55.2,-10,54],
  [-24,65.5,-22,66.4,-15,66.3,-13.5,65,-18,63.5,-22,63.8],
  [130.8,33.8,135,34.5,140,35.5,141.5,38,142,40.5,140,41,139.5,38,136.5,37,133,35.5,130.8,34],
  [140,42,141.5,45.4,145.5,43.3,143,42],
  [129.7,33,131.8,33.3,131.4,31.2,130.2,31.2],
  [95.3,5.5,98,4,104,-1,106,-3,105.8,-5.8,102,-4,98,0],
  [105.3,-6.8,108,-6.3,114.5,-7.8,114,-8.7,106,-7.5],
  [109,1.5,111,1.8,113,3.3,117,7,119,5,118,1,117.5,-1,116,-4,114,-3.5,111,-3,109.5,-1.5],
  [119.5,-5,120.5,1,124.5,1.5,121,-1,123,-4,121,-5],
  [131,-1,134,-1,138,-1.8,145,-4.5,147.5,-6,150,-10.3,147,-10,143.5,-8.5,141,-9.2,138,-8.3,137.5,-5,133.5,-4],
  [120.5,18.5,122.2,18.5,122,14,124,13,121,13.6,120.5,16],
  [122,7,126.5,7,126,9.5,123.5,8.5],
  [79.8,9.5,81.8,7.5,80.5,6,79.8,7.5],
  // Australia, Tasmania, New Zealand
  [114,-22,114,-26,115,-31,115,-34,118,-35,123,-34,126,-32.5,131,-31.5,134,-32.5,137.5,-33,138.5,-35.5,140,-38,144,-38.5,147,-39,150,-37.5,152.5,-32,153.5,-28,153,-25,150.5,-22.5,146.5,-19,145.5,-15,143.5,-14,142.5,-10.7,141.5,-13,141.5,-17,139,-17.5,136,-15,137,-12,135,-12,132,-11.3,130,-12.3,129,-15,126,-14,123,-17,122,-18,120,-20,117,-20.7],
  [145,-40.8,148.3,-41,148,-43,146.5,-43.6,145,-42],
  [172.7,-34.5,175,-37,178,-37.7,176,-40,174.8,-41.5,174,-39.3,173,-35.5],
  [172.7,-40.5,174.3,-41.7,172.7,-43.7,170.5,-46,166.5,-46,168,-44,171,-42.5],
]
const WATER: number[][] = [
  [28,41.5,31,41.2,36,41.8,41.5,41.5,41.5,43,38,44.5,37.5,46.5,34,45.8,33,44.5,31,46.5,30,45.3,28.7,44,28,42.5], // Black Sea
  [47,45,51,47,53,45,51,42,53.5,40,54,37,51,36.7,49,38.5,48.5,41.5,47,43], // Caspian
]

function drawPoly(ctx: CanvasRenderingContext2D, pts: number[], W: number, H: number) {
  ctx.beginPath()
  for (let i = 0; i < pts.length; i += 2) {
    const x = ((pts[i] + 180) / 360) * W, y = ((90 - pts[i + 1]) / 180) * H
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

/** Softened land/sea mask; the Earth shader adds fractal coastlines and detail on top. */
export function makeLandMask() {
  const W = 1024, H = 512
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#fff'
  LAND.forEach((p) => drawPoly(ctx, p, W, H))
  ctx.fillStyle = '#000'
  WATER.forEach((p) => drawPoly(ctx, p, W, H))
  ctx.fillStyle = '#fff' // Antarctica
  ctx.fillRect(0, ((90 + 71) / 180) * H, W, H)
  // Area-average down to 256x128, then one down/up pass for extra softness (ctx.filter is unavailable in Safari).
  const out = document.createElement('canvas'); out.width = 256; out.height = 128
  const o = out.getContext('2d')!
  o.imageSmoothingQuality = 'high'
  o.drawImage(c, 0, 0, 256, 128)
  const tmp = document.createElement('canvas'); tmp.width = 128; tmp.height = 64
  const t = tmp.getContext('2d')!
  t.imageSmoothingQuality = 'high'
  t.drawImage(out, 0, 0, 128, 64)
  o.clearRect(0, 0, 256, 128)
  o.drawImage(tmp, 0, 0, 256, 128)
  const tex = new THREE.CanvasTexture(out)
  tex.wrapS = THREE.RepeatWrapping
  tex.generateMipmaps = false
  tex.minFilter = tex.magFilter = THREE.LinearFilter
  return tex
}

/** Ocean/land mask derived from the real day-map image: blue-dominant, darker pixels read as ocean. */
export function makeOceanMask(img: HTMLImageElement) {
  const W = 512, H = 256
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.drawImage(img, 0, 0, W, H)
  const { data } = ctx.getImageData(0, 0, W, H)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const ocean = b > r + 8 && b > g - 6 && r + g + b < 420
    data[i] = data[i + 1] = data[i + 2] = ocean ? 255 : 0
  }
  ctx.putImageData(new ImageData(data, W, H), 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  tex.generateMipmaps = false
  tex.minFilter = tex.magFilter = THREE.LinearFilter
  return tex
}

/* ---------- glow sprite ---------- */
export function makeGlow(stops: [number, string][], size = 256) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  stops.forEach(([o, col]) => g.addColorStop(o, col))
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ---------- deep-space object visuals ---------- */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)
const blob = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, a: number) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, col.replace('A', String(a))); g.addColorStop(1, col.replace('A', '0'))
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
}
const stars = (ctx: CanvasRenderingContext2D, R: () => number, S: number, n: number) => {
  for (let i = 0; i < n; i++) {
    const x = R() * S, y = R() * S, a = 0.2 + R() * 0.7
    ctx.fillStyle = `rgba(255,255,255,${a})`
    ctx.beginPath(); ctx.arc(x, y, 0.4 + R() * (R() < 0.05 ? 1.8 : 0.8), 0, 7); ctx.fill()
  }
}
const spikes = (ctx: CanvasRenderingContext2D, x: number, y: number, len: number, col: string) => {
  ctx.strokeStyle = col; ctx.lineWidth = 1
  for (const a of [0, Math.PI / 2]) {
    const g = ctx.createLinearGradient(x - Math.cos(a) * len, y - Math.sin(a) * len, x + Math.cos(a) * len, y + Math.sin(a) * len)
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, col); g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.strokeStyle = g
    ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * len, y - Math.sin(a) * len); ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); ctx.stroke()
  }
}

export function paintObject(cv: HTMLCanvasElement, o: { id: string; kind: Kind; hue: string }, transparent = false) {
  const S = cv.width, C = S / 2, R = rng(hash(o.id)), ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, S, S)
  if (!transparent) { ctx.fillStyle = '#04050a'; ctx.fillRect(0, 0, S, S) }
  ctx.globalCompositeOperation = 'lighter'
  const k = S / 384

  switch (o.kind) {
    case 'galaxy': {
      ctx.save(); ctx.translate(C, C); ctx.rotate(-0.55); ctx.scale(1, 0.36)
      blob(ctx, 0, 0, 190 * k, 'rgba(120,140,220,A)', 0.35)
      for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 900; i++) {
        const t = Math.pow(R(), 0.8), r = t * 165 * k, a = arm * Math.PI + t * 5.4 + (R() - 0.5) * 0.45
        const warm = 1 - t
        blob(ctx, Math.cos(a) * r, Math.sin(a) * r, (2 + R() * 6) * k, warm > 0.6 ? 'rgba(255,225,180,A)' : R() < 0.15 ? 'rgba(255,150,190,A)' : 'rgba(170,195,255,A)', 0.18)
      }
      blob(ctx, 0, 0, 60 * k, 'rgba(255,235,200,A)', 0.9)
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = 'rgba(10,6,14,.45)'; ctx.lineWidth = 3 * k
      for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.ellipse(0, 0, (58 + i * 42) * k, (50 + i * 38) * k, 0.2 * i, 0.3, 4.2 + i); ctx.stroke() }
      ctx.restore(); break
    }
    case 'nebula': {
      for (let i = 0; i < 90; i++) {
        const a = R() * 7, r = Math.pow(R(), 0.7) * 130 * k
        const x = C + Math.cos(a) * r * 1.2, y = C + Math.sin(a) * r * 0.85
        blob(ctx, x, y, (25 + R() * 55) * k, R() < 0.6 ? 'rgba(255,110,150,A)' : R() < 0.5 ? 'rgba(110,150,255,A)' : 'rgba(255,170,90,A)', 0.09)
      }
      blob(ctx, C, C, 55 * k, 'rgba(255,240,230,A)', 0.85)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(8,4,10,.6)'
      ctx.beginPath(); ctx.moveTo(C - 130 * k, C + 20 * k); ctx.quadraticCurveTo(C - 30 * k, C + 40 * k, C - 5 * k, C + 90 * k); ctx.quadraticCurveTo(C - 60 * k, C + 60 * k, C - 130 * k, C + 20 * k); ctx.fill()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < 4; i++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(C + (R() - 0.5) * 14 * k, C + (R() - 0.5) * 14 * k, 1.8 * k, 0, 7); ctx.fill() }
      stars(ctx, R, S, 70); break
    }
    case 'pillars': {
      blob(ctx, C, C, 200 * k, 'rgba(40,120,120,A)', 0.35)
      blob(ctx, C * 0.6, C * 0.5, 130 * k, 'rgba(220,150,70,A)', 0.25)
      ctx.globalCompositeOperation = 'source-over'
      ;[[C - 90 * k, 0.9, 80], [C - 5 * k, 1.1, 66], [C + 85 * k, 0.65, 56]].forEach(([x, hh, w]) => {
        const top = S - 300 * k * hh, wd = w * k
        const g = ctx.createLinearGradient(0, top, 0, S)
        g.addColorStop(0, '#c98d55'); g.addColorStop(0.25, '#6d4530'); g.addColorStop(1, '#170d0a')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.moveTo(x - wd / 2, S)
        ctx.bezierCurveTo(x - wd * 0.55, top + 90 * k, x - wd * 0.3, top + 20 * k, x - wd * 0.1, top)
        ctx.bezierCurveTo(x + wd * 0.3, top - 15 * k, x + wd * 0.5, top + 60 * k, x + wd * 0.55, S); ctx.fill()
        blob(ctx, x, top + 6 * k, 34 * k, 'rgba(255,190,110,A)', 0.55)
      })
      ctx.globalCompositeOperation = 'lighter'
      stars(ctx, R, S, 60); break
    }
    case 'blackhole': {
      stars(ctx, R, S, 60)
      ctx.save(); ctx.translate(C, C); ctx.rotate(-0.25); ctx.scale(1, 0.32)
      for (let i = 0; i < 90; i++) {
        const t = i / 90, r = (72 + t * 105) * k
        ctx.strokeStyle = `rgba(255,${Math.round(230 - t * 150)},${Math.round(160 - t * 130)},${0.32 * (1 - t) + 0.02})`
        ctx.lineWidth = 2.2 * k
        const g = ctx.createLinearGradient(-r, 0, r, 0); g.addColorStop(0, `rgba(255,${Math.round(230 - t * 150)},120,.15)`); g.addColorStop(1, `rgba(255,${Math.round(240 - t * 150)},180,.75)`)
        ctx.strokeStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, r, r, 0, 0, 7); ctx.stroke()
      }
      ctx.restore()
      ctx.strokeStyle = 'rgba(255,215,160,.55)'; ctx.lineWidth = 3 * k // lensed light over the top and under the shadow
      ctx.beginPath(); ctx.arc(C, C, 66 * k, 3.5, 5.9); ctx.stroke()
      ctx.beginPath(); ctx.arc(C, C, 58 * k, 0.3, 2.9); ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(C, C, 56 * k, 0, 7); ctx.fill()
      ctx.strokeStyle = 'rgba(255,240,215,.8)'; ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.arc(C, C, 57 * k, 0, 7); ctx.stroke(); break
    }
    case 'pulsar': {
      for (let i = 0; i < 260; i++) {
        const a = R() * 7, r = Math.pow(R(), 0.6) * 120 * k
        ctx.strokeStyle = R() < 0.6 ? 'rgba(255,140,90,.22)' : 'rgba(110,190,255,.28)'; ctx.lineWidth = 0.8 * k
        const x = C + Math.cos(a) * r * 1.15, y = C + Math.sin(a) * r * 0.85
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (R() - 0.5) * 34 * k, y + (R() - 0.5) * 34 * k); ctx.stroke()
      }
      blob(ctx, C, C, 150 * k, 'rgba(90,150,255,A)', 0.14)
      ctx.save(); ctx.translate(C, C); ctx.rotate(-0.5)
      const bg = ctx.createLinearGradient(0, -170 * k, 0, 170 * k)
      bg.addColorStop(0, 'rgba(160,210,255,0)'); bg.addColorStop(0.5, 'rgba(200,230,255,.55)'); bg.addColorStop(1, 'rgba(160,210,255,0)')
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-18 * k, -170 * k); ctx.lineTo(18 * k, -170 * k); ctx.moveTo(0, 0); ctx.lineTo(-18 * k, 170 * k); ctx.lineTo(18 * k, 170 * k); ctx.fill()
      ctx.restore()
      blob(ctx, C, C, 40 * k, 'rgba(255,255,255,A)', 1); break
    }
    case 'remnant': {
      blob(ctx, C, C, 150 * k, 'rgba(255,90,120,A)', 0.16)
      for (let i = 0; i < 700; i++) {
        const a = R() * 7, r = (105 + (R() - 0.5) * 55 + Math.sin(a * 5) * 10) * k
        blob(ctx, C + Math.cos(a) * r, C + Math.sin(a) * r, (2 + R() * 7) * k, R() < 0.45 ? 'rgba(80,220,200,A)' : R() < 0.6 ? 'rgba(255,90,100,A)' : 'rgba(255,190,90,A)', 0.3)
      }
      blob(ctx, C, C, 12 * k, 'rgba(180,220,255,A)', 0.9)
      stars(ctx, R, S, 40); break
    }
    case 'exo': {
      const n = o.id === 'trappist-1' ? 7 : 1
      blob(ctx, C - 90 * k, C, 140 * k, hexA(o.hue), 0.28)
      blob(ctx, C - 90 * k, C, 42 * k, 'rgba(255,160,110,A)', 0.95)
      ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < n; i++) {
        const rx = (48 + i * (n > 1 ? 24 : 110)) * k, ry = rx * 0.28
        ctx.strokeStyle = 'rgba(160,180,255,.28)'; ctx.lineWidth = 1 * k
        ctx.beginPath(); ctx.ellipse(C - 90 * k, C, rx, ry, 0, 0, 7); ctx.stroke()
        const a = R() * 7, px = C - 90 * k + Math.cos(a) * rx, py = C + Math.sin(a) * ry
        const pr = (n > 1 ? 4 + R() * 3 : 14) * k
        const g = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, 0, px, py, pr)
        g.addColorStop(0, '#d9c8b0'); g.addColorStop(1, '#3a2c2a')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill()
      }
      ctx.globalCompositeOperation = 'lighter'
      stars(ctx, R, S, 40); break
    }
    case 'cluster': {
      blob(ctx, C, C, 190 * k, 'rgba(90,140,255,A)', 0.2)
      for (let i = 0; i < 6; i++) blob(ctx, C + (R() - 0.5) * 200 * k, C + (R() - 0.5) * 200 * k, (40 + R() * 60) * k, 'rgba(120,170,255,A)', 0.14)
      for (let i = 0; i < 90; i++) {
        const a = R() * 7, r = Math.pow(R(), 0.8) * 150 * k, x = C + Math.cos(a) * r, y = C + Math.sin(a) * r
        const big = R() < 0.14
        blob(ctx, x, y, (big ? 12 : 4) * k, 'rgba(190,215,255,A)', big ? 0.9 : 0.7)
        if (big) spikes(ctx, x, y, 22 * k, 'rgba(200,225,255,.7)')
      }
      break
    }
    default: { // star
      blob(ctx, C, C, 170 * k, hexA(o.hue), 0.32)
      blob(ctx, C, C, 60 * k, 'rgba(255,255,255,A)', 0.95)
      spikes(ctx, C, C, 150 * k, 'rgba(255,255,255,.75)')
      stars(ctx, R, S, 40)
    }
  }
  if (transparent) { // fade to nothing at the edge so sprites never show a box
    const g = ctx.createRadialGradient(C, C, S * 0.28, C, C, S / 2)
    g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = g; ctx.fillRect(0, 0, S, S)
  }
  ctx.globalCompositeOperation = 'source-over'
}
const hexA = (h: string) => {
  const n = parseInt(h.slice(1), 16)
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},A)`
}

/** Compact 2D planet disc used by the Discovery card and the no-WebGL fallback. */
export function paintPlanet(cv: HTMLCanvasElement, b: Body) {
  const S = cv.width, C = S / 2, r = S * (b.visual.rings ? 0.26 : 0.34), ctx = cv.getContext('2d')!, R = rng(hash(b.id))
  ctx.clearRect(0, 0, S, S)
  ctx.fillStyle = '#04050a'; ctx.fillRect(0, 0, S, S)
  stars(ctx, R, S, 50)
  const ring = (front: boolean) => {
    if (!b.visual.rings) return
    ctx.save(); ctx.translate(C, C); ctx.rotate(-0.35)
    for (let i = 0; i < 26; i++) {
      const rr = r * (1.25 + i * 0.04), a = i % 9 === 6 ? 0.05 : 0.35 + R() * 0.2
      ctx.strokeStyle = `rgba(226,205,165,${a})`; ctx.lineWidth = 3
      ctx.beginPath(); ctx.ellipse(0, 0, rr, rr * 0.28, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2); ctx.stroke()
    }
    ctx.restore()
  }
  ring(false)
  ctx.save(); ctx.beginPath(); ctx.arc(C, C, r, 0, 7); ctx.clip()
  ctx.fillStyle = b.visual.color; ctx.fillRect(0, 0, S, S)
  const banded = [1, 2, 3, 4, 5].includes(b.visual.kind)
  for (let y = C - r; y < C + r; y += 3) {
    const a = banded ? 0.12 + R() * 0.22 : 0.04 + R() * 0.1
    ctx.fillStyle = R() < 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`
    ctx.fillRect(C - r, y, r * 2, banded ? 3 + R() * 8 : 3)
  }
  const g = ctx.createRadialGradient(C - r * 0.45, C - r * 0.35, r * 0.1, C, C, r * 1.15)
  g.addColorStop(0, 'rgba(255,255,255,.12)'); g.addColorStop(0.55, 'rgba(0,0,0,.1)'); g.addColorStop(1, 'rgba(0,0,0,.85)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S)
  ctx.restore()
  ring(true)
}
