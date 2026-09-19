// Optional ambient audio. Muted by default; nothing is created until the user turns sound on.
let ctx: AudioContext | null = null
let master: GainNode | null = null

function init() {
  ctx = new AudioContext()
  master = ctx.createGain()
  master.gain.value = 0
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 260
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.05
  lfoGain.gain.value = 90
  lfo.connect(lfoGain).connect(lp.frequency)
  lfo.start()
  for (const f of [55, 82.4, 110.6, 165.2]) {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sawtooth'
    o.frequency.value = f
    o.detune.value = (Math.random() - 0.5) * 14
    g.gain.value = 0.05 / (f / 55)
    o.connect(g).connect(lp)
    o.start()
  }
  lp.connect(master).connect(ctx.destination)
}

export function setSound(on: boolean) {
  if (on && !ctx) init()
  if (!ctx || !master) return
  if (on) void ctx.resume()
  master.gain.setTargetAtTime(on ? 0.6 : 0, ctx.currentTime, 0.6)
}

export function tick() {
  if (!ctx || !master || master.gain.value < 0.05) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.frequency.value = 880
  g.gain.setValueAtTime(0.03, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
  o.connect(g).connect(ctx.destination)
  o.start()
  o.stop(ctx.currentTime + 0.2)
}
