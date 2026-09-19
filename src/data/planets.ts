// Content for the Sun and the eight planets.
// Sources: NASA Planetary Fact Sheet (nssdc.gsfc.nasa.gov/planetary/factsheet), NASA Solar System Exploration
// (science.nasa.gov/solar-system), ESA. Moon counts follow the IAU Minor Planet Center as of 2025 and keep growing.

export interface Body {
  id: string
  name: string
  tagline: string
  type: string
  distance: string // from the Sun (from Earth for the Sun itself)
  diameter: string
  orbitalPeriod: string
  dayLength: string
  moons: string
  temperature: string
  description: string
  facts: string[]
  overview: string
  composition: string
  atmosphere: string
  moonsInfo: string
  exploration: string
  // Render params. Sizes/orbits are visual, NOT to scale.
  visual: {
    kind: number // shader mode, see shaders/planet.ts
    radius: number
    orbit: number
    period: number // Earth days, drives compressed orbital speed
    tilt: number // axial tilt in degrees
    spin: number // rad/s, negative = retrograde
    color: string // 2D fallback / marker colour
    atmo?: [number, number, number]
    rings?: boolean
    phase: number
  }
}

export const BODIES: Body[] = [
  {
    id: 'sun', name: 'Sun', tagline: 'Our star', type: 'G-type main-sequence star',
    distance: '149.6 million km from Earth', diameter: '1,391,400 km', orbitalPeriod: '~230 million years around the galaxy',
    dayLength: '~25 Earth days (equator)', moons: '—', temperature: '5,500°C surface · 15 million °C core',
    description: 'A middle-aged star holding 99.86% of the Solar System’s mass and powering everything on Earth.',
    facts: [
      'Sunlight takes about 8 minutes 20 seconds to reach Earth.',
      'About 1.3 million Earths could fit inside the Sun.',
      'NASA’s Parker Solar Probe has flown within 6.1 million km of its surface.',
    ],
    overview: 'The Sun formed about 4.6 billion years ago from a collapsing cloud of gas and dust, and has roughly another 5 billion years of hydrogen fuel left.',
    composition: 'About 73% hydrogen and 25% helium by mass, with traces of oxygen, carbon, neon and iron.',
    atmosphere: 'Its visible surface is the photosphere. Above it lie the chromosphere and the corona, a million-degree halo seen during total eclipses.',
    moonsInfo: 'The Sun is orbited by eight planets, five dwarf planets, and countless asteroids and comets.',
    exploration: 'SOHO, Solar Dynamics Observatory, Parker Solar Probe and ESA/NASA Solar Orbiter study the Sun up close and from afar.',
    visual: { kind: 99, radius: 4.6, orbit: 0, period: 1, tilt: 7, spin: 0.02, color: '#ffb347', phase: 0 },
  },
  {
    id: 'mercury', name: 'Mercury', tagline: 'The swift planet', type: 'Terrestrial planet',
    distance: '57.9 million km', diameter: '4,879 km', orbitalPeriod: '88 Earth days',
    dayLength: '176 Earth days (sunrise to sunrise)', moons: '0', temperature: '167°C average (−180 to 430°C)',
    description: 'A small, cratered world that races around the Sun and swings between scorching days and freezing nights.',
    facts: [
      'One Mercury day (sunrise to sunrise) lasts about 176 Earth days, twice as long as its 88-day year.',
      'Permanently shadowed craters at its poles hold water ice, despite the heat.',
      'It is only slightly larger than Earth’s Moon.',
    ],
    overview: 'The smallest planet and the closest to the Sun, Mercury has almost no atmosphere to hold heat, so its temperature swings are extreme.',
    composition: 'A huge iron core makes up roughly 85% of the planet’s radius, wrapped in a thin rocky mantle and crust.',
    atmosphere: 'Only a thin exosphere of atoms blasted off the surface by sunlight and the solar wind.',
    moonsInfo: 'Mercury has no moons.',
    exploration: 'Mariner 10 (1974–75) and MESSENGER (orbited 2011–2015) visited. ESA/JAXA’s BepiColombo, launched in 2018, is due to enter orbit in late 2026.',
    visual: { kind: 6, radius: 0.55, orbit: 9, period: 88, tilt: 0, spin: 0.01, color: '#9a938a', phase: 0.6 },
  },
  {
    id: 'venus', name: 'Venus', tagline: 'The veiled world', type: 'Terrestrial planet',
    distance: '108.2 million km', diameter: '12,104 km', orbitalPeriod: '224.7 Earth days',
    dayLength: '243 Earth days (retrograde)', moons: '0', temperature: '464°C surface',
    description: 'Earth’s near-twin in size, wrapped in acid clouds and hot enough to melt lead.',
    facts: [
      'Venus is the hottest planet, even though Mercury is closer to the Sun.',
      'It spins backwards, and one day there (243 Earth days) is longer than its year (225).',
      'Surface pressure is about 92 times Earth’s, similar to 900 m deep in the ocean.',
    ],
    overview: 'A runaway greenhouse effect turned Venus into the hottest planet in the Solar System. Its surface is hidden beneath unbroken cloud.',
    composition: 'Rocky and similar in size to Earth, with a metallic core and a surface of volcanic plains and highlands.',
    atmosphere: 'About 96.5% carbon dioxide, with clouds of sulphuric acid. Surface pressure is roughly 92 bar.',
    moonsInfo: 'Venus has no moons.',
    exploration: 'Venera 7 made the first soft landing on another planet (1970). NASA’s Magellan mapped it with radar. NASA’s DAVINCI and VERITAS and ESA’s EnVision are planned for the 2030s.',
    visual: { kind: 5, radius: 0.95, orbit: 14, period: 224.7, tilt: 177, spin: -0.005, color: '#e3c58f', atmo: [1.0, 0.82, 0.5], phase: 2.1 },
  },
  {
    id: 'earth', name: 'Earth', tagline: 'The pale blue dot', type: 'Terrestrial planet',
    distance: '149.6 million km (1 AU)', diameter: '12,742 km', orbitalPeriod: '365.25 days',
    dayLength: '24 hours', moons: '1', temperature: '15°C average',
    description: 'The only world known to host life, with liquid oceans, a protective atmosphere and a magnetic field.',
    facts: [
      'About 71% of Earth’s surface is covered by water.',
      'Earth’s Moon is slowly drifting away, about 3.8 cm each year.',
      'Earth is the densest planet in the Solar System.',
    ],
    overview: 'Earth sits in the Sun’s habitable zone, where liquid water can persist on the surface. Life appeared here more than 3.5 billion years ago.',
    composition: 'An iron-nickel core (liquid outer, solid inner), a thick silicate mantle and a thin crust broken into moving tectonic plates.',
    atmosphere: 'About 78% nitrogen, 21% oxygen and 1% argon, plus water vapour and trace gases. It shields life from radiation and moderates temperature.',
    moonsInfo: 'The Moon (3,475 km across) stabilises Earth’s tilt and drives ocean tides.',
    exploration: 'Studied continuously from orbit by satellites such as Landsat and Sentinel, and from the International Space Station.',
    visual: { kind: 0, radius: 1, orbit: 19.5, period: 365.25, tilt: 23.4, spin: 0.06, color: '#3f7fd0', atmo: [0.35, 0.6, 1.0], phase: 3.9 },
  },
  {
    id: 'mars', name: 'Mars', tagline: 'The Red Planet', type: 'Terrestrial planet',
    distance: '227.9 million km', diameter: '6,779 km', orbitalPeriod: '687 Earth days',
    dayLength: '24 h 37 min', moons: '2 (Phobos, Deimos)', temperature: '−63°C average',
    description: 'A cold desert world shaped by ancient volcanoes, impact craters and powerful dust storms.',
    facts: [
      'Mars holds Olympus Mons, the largest known volcano in the Solar System, about 22 km high.',
      'Valles Marineris is a canyon system roughly 4,000 km long.',
      'Ancient river valleys show that liquid water once flowed on its surface.',
    ],
    overview: 'Mars was once warmer and wetter. Today it is a frozen desert, but rovers keep finding evidence of an ancient, more habitable past.',
    composition: 'A rocky mantle and crust rich in iron oxide, which gives the surface its rust colour, around a metallic core.',
    atmosphere: 'A thin atmosphere, about 95% carbon dioxide, with a surface pressure under 1% of Earth’s.',
    moonsInfo: 'Phobos and Deimos are small, irregular moons, possibly captured asteroids. Phobos is slowly spiralling inward.',
    exploration: 'Landers and rovers include Viking, Curiosity (2012) and Perseverance (2021). The Ingenuity helicopter made 72 flights before its mission ended in 2024.',
    visual: { kind: 7, radius: 0.75, orbit: 25, period: 687, tilt: 25.2, spin: 0.058, color: '#c1653a', atmo: [0.9, 0.55, 0.4], phase: 5.2 },
  },
  {
    id: 'jupiter', name: 'Jupiter', tagline: 'The giant', type: 'Gas giant',
    distance: '778.5 million km', diameter: '142,984 km (equatorial)', orbitalPeriod: '11.9 Earth years',
    dayLength: '9 h 56 min', moons: '95+ confirmed', temperature: '−108°C at cloud tops',
    description: 'The largest planet, a swirling world of storms with a mass greater than all other planets combined.',
    facts: [
      'The Great Red Spot is a storm wider than Earth that has been observed for over 150 years.',
      'Jupiter’s mass is about 2.5 times that of all the other planets combined.',
      'Ganymede, its largest moon, is bigger than Mercury.',
    ],
    overview: 'Jupiter has no solid surface. Its banded clouds are stretched by a day only 10 hours long, one of the fastest spins of any planet.',
    composition: 'About 90% hydrogen and 10% helium by volume, likely with a dense core of heavy elements beneath a layer of metallic hydrogen.',
    atmosphere: 'Bands of ammonia and water clouds, with winds over 400 km/h. The Great Red Spot is a persistent anticyclone.',
    moonsInfo: 'The four Galilean moons: Io (most volcanic body known), Europa (subsurface ocean), Ganymede (largest moon) and Callisto.',
    exploration: 'Visited by Pioneer, Voyager, Galileo and New Horizons. Juno has orbited since 2016. Europa Clipper (launched 2024) and ESA’s JUICE (2023) are on their way.',
    visual: { kind: 1, radius: 2.7, orbit: 41, period: 4333, tilt: 3.1, spin: 0.14, color: '#d9b48f', atmo: [0.8, 0.65, 0.5], phase: 1.0 },
  },
  {
    id: 'saturn', name: 'Saturn', tagline: 'Lord of the rings', type: 'Gas giant',
    distance: '1.43 billion km', diameter: '120,536 km (equatorial)', orbitalPeriod: '29.5 Earth years',
    dayLength: '10 h 42 min', moons: '274 confirmed (2025)', temperature: '−139°C at cloud tops',
    description: 'A pale golden giant encircled by the most spectacular ring system in the Solar System.',
    facts: [
      'Saturn is less dense than water, so in a big enough bath it would float.',
      'Its rings are mostly water ice, yet are often only about 10 metres thick.',
      'A hexagon-shaped jet stream circles its north pole.',
    ],
    overview: 'Saturn’s rings span up to about 282,000 km but are extraordinarily thin. Their bright, icy particles range from grains of dust to boulders.',
    composition: 'Mostly hydrogen and helium, with a dense core of heavier elements. It is the least dense planet.',
    atmosphere: 'Pale bands of ammonia clouds with fast equatorial winds reaching about 1,800 km/h.',
    moonsInfo: 'Titan has a thick nitrogen atmosphere and methane lakes. Enceladus vents water from a hidden ocean.',
    exploration: 'Cassini–Huygens orbited from 2004 to 2017 and landed the Huygens probe on Titan. NASA’s Dragonfly rotorcraft is planned to reach Titan in the mid-2030s.',
    visual: { kind: 2, radius: 2.3, orbit: 57, period: 10747, tilt: 26.7, spin: 0.13, color: '#e6d3a3', atmo: [0.9, 0.8, 0.55], rings: true, phase: 4.4 },
  },
  {
    id: 'uranus', name: 'Uranus', tagline: 'The sideways planet', type: 'Ice giant',
    distance: '2.87 billion km', diameter: '51,118 km', orbitalPeriod: '84 Earth years',
    dayLength: '17 h 14 min (retrograde)', moons: '29', temperature: '−197°C at cloud tops',
    description: 'A pale cyan ice giant that rolls around the Sun tilted on its side.',
    facts: [
      'Uranus is tilted about 98°, so each pole gets roughly 42 years of continuous sunlight, then 42 of darkness.',
      'It was the first planet discovered with a telescope, by William Herschel in 1781.',
      'Only one spacecraft, Voyager 2 in 1986, has ever visited.',
    ],
    overview: 'Uranus is an “ice giant”: rich in water, ammonia and methane ices. Methane in its upper atmosphere absorbs red light and gives the planet its blue-green colour.',
    composition: 'A small rocky core beneath a deep mantle of hot, dense water, ammonia and methane ices, under a hydrogen–helium atmosphere.',
    atmosphere: 'Hydrogen, helium and about 2% methane. It has the coldest planetary atmosphere measured, below −220°C.',
    moonsInfo: 'Named for characters from Shakespeare and Pope. The largest are Titania, Oberon, Umbriel, Ariel and Miranda.',
    exploration: 'Voyager 2 flew past in January 1986. A Uranus orbiter and probe is the top-priority flagship mission in the 2022 US planetary decadal survey.',
    visual: { kind: 3, radius: 1.6, orbit: 73, period: 30687, tilt: 97.8, spin: -0.09, color: '#9fd8dc', atmo: [0.55, 0.85, 0.9], phase: 0.3 },
  },
  {
    id: 'neptune', name: 'Neptune', tagline: 'The distant blue', type: 'Ice giant',
    distance: '4.50 billion km', diameter: '49,528 km', orbitalPeriod: '164.8 Earth years',
    dayLength: '16 h 6 min', moons: '16', temperature: '−201°C at cloud tops',
    description: 'A dark, cold and windy ice giant, the most distant planet from the Sun.',
    facts: [
      'Neptune’s winds reach about 2,000 km/h, the fastest in the Solar System.',
      'It was found in 1846 by mathematical prediction before it was seen through a telescope.',
      'Its moon Triton orbits backwards and is likely a captured Kuiper Belt object.',
    ],
    overview: 'Neptune radiates more heat than it receives from the Sun, which powers its violent weather even in the dim far reaches of the Solar System.',
    composition: 'Similar to Uranus: an icy mantle of water, ammonia and methane around a rocky core, under a hydrogen–helium atmosphere.',
    atmosphere: 'Hydrogen, helium and methane. Methane absorbs red light, and an as-yet-unidentified component gives Neptune a deeper blue than Uranus.',
    moonsInfo: 'Triton, the largest moon, has nitrogen geysers and a retrograde orbit that is slowly decaying.',
    exploration: 'Only Voyager 2 has visited, in August 1989. The Hubble and James Webb telescopes now monitor its storms and rings.',
    visual: { kind: 4, radius: 1.55, orbit: 87, period: 60190, tilt: 28.3, spin: 0.09, color: '#4a6fe0', atmo: [0.3, 0.5, 1.0], phase: 2.7 },
  },
]

export const PLANETS = BODIES.filter((b) => b.id !== 'sun')
export const getBody = (id: string | null) => BODIES.find((b) => b.id === id)
