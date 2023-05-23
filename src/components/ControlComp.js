import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Title from './Title'
import { colors } from '../Data/Colors'
import ControlButton from './ControlButton'

const ControlComp = ({ name, color, buttons }) => {
  const [showDiv, setShowDiv] = useState(buttons.length > 0 ? true : false)
  const handleTitleClick = () => {
    setShowDiv(!showDiv)
  }

  return (
    <Card sx={{ marginTop: '10px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '200px', minHeight: showDiv ? `200px` : null }}>
        <Title text={name} color={colors[color]} onClick={handleTitleClick} />
        {showDiv ? (
          buttons.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <p style={{ fontSize: 'smaller', fontStyle: 'italic' }}>Sin Controles Disponibles</p>
            </div>
          ) : (
            <div style={{ display: 'flex', maxWidth: '90vw', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {buttons.map((button, index) => (
                <ControlButton key={index} button={button} cantidad={buttons.length} />
              ))}
            </div>
          )
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ControlComp
