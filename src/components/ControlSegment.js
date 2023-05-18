import React from 'react'
import ControlComp from './ControlComp'

const ControlSegment = ({ equipos, buttons }) => {
  const filter = (name) => {
    const matchingButtons = buttons.filter((button) => button.equipo.name === name)
    return matchingButtons
  }

  return (
    <div>
      {buttons.length === 0 ? null : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filter('All').length > 0 ? <ControlComp name="General" buttons={filter('All')} /> : null}

          {equipos.map((equipo, index) => (filter(equipo.name).length > 0 ? <ControlComp key={index} name={equipo.name} color={equipo.color} buttons={filter(equipo.name)} /> : null))}
        </div>
      )}
    </div>
  )
}

export default ControlSegment
