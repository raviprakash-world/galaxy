// Objects beyond the Solar System. Sources: NASA, ESA/Hubble, ESA/Webb, ESO, NASA Exoplanet Archive, CDS/SIMBAD.
// Distances are rounded, widely quoted values; many are still refined by new measurements.

export type Kind = 'blackhole' | 'galaxy' | 'nebula' | 'pillars' | 'pulsar' | 'remnant' | 'exo' | 'cluster' | 'star'

export interface DeepObject {
  id: string
  name: string
  kind: Kind
  category: string
  distance: string
  ly: number // light-years, used for the logarithmic layout
  ra: [number, number] // h, m
  dec: [number, number] // deg, arcmin (sign carried by deg; use sgn for -0)
  description: string
  facts: string[]
  context: string
  hue: string // 2D visual accent
  size: number // visual size in the deep-space map
}

export const DEEP: DeepObject[] = [
  {
    id: 'sgr-a', name: 'Sagittarius A*', kind: 'blackhole', category: 'Black hole',
    distance: '~26,000 light-years', ly: 26000, ra: [17, 45], dec: [-29, 0],
    description: 'The supermassive black hole at the centre of our Milky Way, about 4 million times the mass of the Sun.',
    facts: [
      'Its mass is about 4.3 million Suns, packed inside a region smaller than Mercury’s orbit.',
      'The Event Horizon Telescope published the first image of it in 2022.',
      'The star S2 circles it in about 16 years, letting astronomers weigh the black hole.',
    ],
    context: 'Tracking stars orbiting Sagittarius A* earned Reinhard Genzel and Andrea Ghez a share of the 2020 Nobel Prize in Physics. The bright ring in the image is hot gas glowing as it spirals in; the black hole itself is not directly visible.',
    hue: '#ffb26b', size: 5.5,
  },
  {
    id: 'andromeda', name: 'Andromeda Galaxy', kind: 'galaxy', category: 'Galaxy',
    distance: '~2.5 million light-years', ly: 2.5e6, ra: [0, 42], dec: [41, 16],
    description: 'The nearest large galaxy to the Milky Way, and the most distant object easily visible to the naked eye.',
    facts: [
      'It contains roughly a trillion stars.',
      'It is approaching the Milky Way at about 110 km/s.',
      'Edwin Hubble’s measurements of Cepheid stars in Andromeda (1923–24) proved that other galaxies exist beyond our own.',
    ],
    context: 'A 2025 study of Hubble and Gaia data put the chance of an Andromeda–Milky Way merger within the next 10 billion years at roughly 50%. Earlier estimates suggested a near-certain collision in about 4–5 billion years.',
    hue: '#9fb4ff', size: 9,
  },
  {
    id: 'orion-nebula', name: 'Orion Nebula', kind: 'nebula', category: 'Nebula',
    distance: '~1,350 light-years', ly: 1350, ra: [5, 35], dec: [-5, 23],
    description: 'A glowing stellar nursery in Orion’s sword, visible to the naked eye as a fuzzy star.',
    facts: [
      'It is about 24 light-years across.',
      'The light comes mostly from the Trapezium, a tight group of young, hot stars a few million years old.',
      'Hubble found dozens of protoplanetary discs inside it, young stars still building planets.',
    ],
    context: 'As the closest large star-forming region to Earth, the Orion Nebula is a natural laboratory for how stars and planetary systems are born.',
    hue: '#ff8fb0', size: 6.5,
  },
  {
    id: 'pillars', name: 'Pillars of Creation', kind: 'pillars', category: 'Nebula',
    distance: '~6,500 light-years', ly: 6500, ra: [18, 18], dec: [-13, 50],
    description: 'Towering columns of cold gas and dust in the Eagle Nebula, where new stars are forming inside.',
    facts: [
      'The tallest pillar is around 4 to 5 light-years long.',
      'Hubble’s 1995 image made them famous. Webb revisited them in infrared in 2022.',
      'Ultraviolet light from nearby massive stars is slowly eroding them.',
    ],
    context: 'The pillars are part of the Eagle Nebula (Messier 16). The dense fingertips are shielded from radiation, so stars can form within them.',
    hue: '#e0a070', size: 5,
  },
  {
    id: 'crab-pulsar', name: 'Crab Pulsar', kind: 'pulsar', category: 'Neutron star',
    distance: '~6,500 light-years', ly: 6500, ra: [5, 34], dec: [22, 0],
    description: 'A rapidly spinning neutron star at the heart of the Crab Nebula, left over from a supernova recorded in 1054.',
    facts: [
      'It rotates about 30 times per second.',
      'It is only about 20 km across, yet heavier than the Sun.',
      'Chinese astronomers recorded the supernova that created it in 1054 CE.',
    ],
    context: 'A neutron star is the collapsed core of a massive star. Pulsars emit beams of radiation that sweep past Earth like a lighthouse as they spin.',
    hue: '#7fd0ff', size: 4.5,
  },
  {
    id: 'cas-a', name: 'Cassiopeia A', kind: 'remnant', category: 'Supernova remnant',
    distance: '~11,000 light-years', ly: 11000, ra: [23, 23], dec: [58, 49],
    description: 'The expanding debris of a massive star that exploded roughly 350 years ago as seen from Earth.',
    facts: [
      'The shell is about 10 light-years across.',
      'It is one of the brightest radio sources in the sky.',
      'A compact neutron star sits near its centre, found by the Chandra X-ray Observatory in 1999.',
    ],
    context: 'Webb’s 2023 image revealed a tangled, glowing shell of dust and gas that is enriching the galaxy with newly forged elements like oxygen and iron.',
    hue: '#ff6a8a', size: 5,
  },
  {
    id: 'trappist-1', name: 'TRAPPIST-1', kind: 'exo', category: 'Exoplanet system',
    distance: '~40 light-years', ly: 40, ra: [23, 6], dec: [-5, 2],
    description: 'Seven Earth-sized worlds orbit a nearby ultracool dwarf star.',
    facts: [
      'Three of the seven planets orbit in the star’s habitable zone.',
      'The entire system would fit inside Mercury’s orbit around the Sun.',
      'Webb observations of the innermost planets, b and c, show no sign of thick atmospheres so far.',
    ],
    context: 'The system was announced in 2017 after observations with the TRAPPIST telescope and NASA’s Spitzer. Because the star is small and dim, its planets are unusually good targets for studying atmospheres.',
    hue: '#ff7a5a', size: 4,
  },
  {
    id: 'proxima-b', name: 'Proxima Centauri b', kind: 'exo', category: 'Exoplanet',
    distance: '4.24 light-years', ly: 4.24, ra: [14, 29], dec: [-62, 40],
    description: 'The closest known exoplanet, orbiting our nearest neighbouring star in its habitable zone.',
    facts: [
      'It orbits Proxima Centauri once every 11.2 days.',
      'Its minimum mass is about 1.07 times that of Earth.',
      'Its host star is a flare star, so radiation at the planet’s surface could be harsh.',
    ],
    context: 'Discovered in 2016 through tiny wobbles in the star’s motion (radial velocity), by the ESO-led Pale Red Dot campaign. We do not yet know whether it has an atmosphere.',
    hue: '#ff8a70', size: 3.5,
  },
  {
    id: '51-peg-b', name: '51 Pegasi b', kind: 'exo', category: 'Exoplanet',
    distance: '~51 light-years', ly: 51, ra: [22, 57], dec: [20, 46],
    description: 'The first exoplanet found around a Sun-like star, a “hot Jupiter” orbiting scorchingly close to its star.',
    facts: [
      'It circles its star every 4.2 days.',
      'Its discoverers, Michel Mayor and Didier Queloz, won the 2019 Nobel Prize in Physics.',
      'It is also formally named Dimidium.',
    ],
    context: 'The 1995 discovery showed that planetary systems can look nothing like our own and opened the era of exoplanet science. Thousands are now confirmed.',
    hue: '#ffd27a', size: 3.5,
  },
  {
    id: 'pleiades', name: 'Pleiades', kind: 'cluster', category: 'Star cluster',
    distance: '~440 light-years', ly: 440, ra: [3, 47], dec: [24, 7],
    description: 'A young open cluster of hot blue stars, often called the Seven Sisters.',
    facts: [
      'It holds over 1,000 stars, but most people can see only six to nine with the naked eye.',
      'It is around 100 million years old, young compared with the Sun’s 4.6 billion.',
      'Many cultures have stories about it, including the Japanese name Subaru.',
    ],
    context: 'Open clusters form together from the same gas cloud, so their stars share an age and chemical make-up, making them ideal for testing theories of stellar evolution.',
    hue: '#8fb8ff', size: 5,
  },
  {
    id: 'betelgeuse', name: 'Betelgeuse', kind: 'star', category: 'Red supergiant',
    distance: '~550–650 light-years', ly: 600, ra: [5, 55], dec: [7, 24],
    description: 'A huge red supergiant in Orion, near the end of its life.',
    facts: [
      'It is roughly 700 to 1,000 times the Sun’s radius. Placed at the Sun’s position, it would swallow the orbits of Mercury, Venus, Earth and Mars.',
      'In 2019–2020 it dimmed dramatically, apparently after ejecting a cloud of dust.',
      'It will eventually explode as a supernova, but not likely within our lifetimes.',
    ],
    context: 'Betelgeuse is a pulsating variable star, so its brightness and even its size change over time.',
    hue: '#ff8a4a', size: 4.5,
  },
  {
    id: 'sirius', name: 'Sirius', kind: 'star', category: 'Star system',
    distance: '8.6 light-years', ly: 8.6, ra: [6, 45], dec: [-16, 43],
    description: 'The brightest star in Earth’s night sky, a blue-white star with a faint white-dwarf companion.',
    facts: [
      'Sirius is about 25 times more luminous than the Sun.',
      'Its companion, Sirius B, was the first white dwarf ever discovered.',
      'Ancient Egyptians tied its first dawn appearance to the annual flooding of the Nile.',
    ],
    context: 'Sirius A has about twice the Sun’s mass. It is one of our nearest stellar neighbours.',
    hue: '#cfe2ff', size: 4,
  },
]

export const getDeep = (id: string | null) => DEEP.find((d) => d.id === id)

const pad = (n: number) => String(Math.abs(n)).padStart(2, '0')
export const fmtRA = (o: DeepObject) => `RA ${o.ra[0]}h ${pad(o.ra[1])}m`
export const fmtDec = (o: DeepObject) => `DEC ${o.dec[0] < 0 || Object.is(o.dec[0], -0) ? '−' : '+'}${Math.abs(o.dec[0])}° ${pad(o.dec[1])}′`

export const MILKY_WAY = {
  id: 'milky-way', name: 'The Milky Way', category: 'Barred spiral galaxy', distance: 'We live inside it',
  description: 'Our home galaxy: a vast, rotating disc of a few hundred billion stars, gas and dust.',
  facts: [
    'It spans roughly 100,000 light-years, yet the Sun sits only about 26,000 light-years from the centre.',
    'The Solar System orbits the galactic centre once every ~230 million years.',
    'At its heart sits Sagittarius A*, a black hole about 4.3 million times the Sun’s mass.',
  ],
  context: 'The map shown is a simplified four-arm model. The real arm structure is still debated, with two major arms and several minor spurs; our Sun sits in a minor spur.',
}
