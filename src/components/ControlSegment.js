import React from 'react'
import ControlComp from './ControlComp'

const ControlSegment = ({ equipos, buttons }) => {
  const filter = (name) => {
    const matchingButtons = buttons.filter((button) => button.equipo.name === name)
    return matchingButtons
  }

  return (
    <div>
      <ControlComp name="General" buttons={filter('All')} />
      {equipos.map((equipo, index) => (
        <ControlComp key={index} name={equipo.name} color={equipo.color} buttons={filter(equipo.name)} />
      ))}
    </div>
  )
}

export default ControlSegment
