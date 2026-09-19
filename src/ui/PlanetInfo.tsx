import { useState } from 'react'
import { useStore } from '../store'
import type { Body } from '../data/planets'
import { Panel, Stat } from './Panel'

/** Compact readout shown when a body is selected in the Solar System. */
export function PlanetInfo({ body }: { body: Body }) {
  const { select, go } = useStore.getState()
  const [i, setI] = useState(0)
  const sun = body.id === 'sun'
  return (
    <Panel
      label={`${body.name} information`} onClose={() => select(null)}
      foot={<><button className="btn small primary" onClick={() => void go({ view: 'planet', selected: body.id })}>Open {sun ? 'star' : 'planet'} data</button><button className="btn small ghost" onClick={() => setI((i + 1) % body.facts.length)}>Next fact</button></>}
    >
      <div className="label">{sun ? 'Star' : 'Planet'}</div>
      <h2>{body.name}</h2>
      <div className="sub">{body.tagline}</div>
      <p className="desc">{body.description}</p>
      <div className="grid2">
        <Stat k="Type" v={body.type} wide />
        <Stat k={sun ? 'Distance from Earth' : 'Distance from Sun'} v={body.distance} wide />
        <Stat k="Diameter" v={body.diameter} />
        <Stat k={sun ? 'Galactic orbit' : 'Year'} v={body.orbitalPeriod} />
        <Stat k="Day" v={body.dayLength} />
        <Stat k="Moons" v={body.moons} />
        <Stat k="Temperature" v={body.temperature} wide />
      </div>
      <div className="fact" key={i}><span className="label">Fact</span>{body.facts[i]}</div>
    </Panel>
  )
}
