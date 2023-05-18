import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ControlButtonComp from './ControlButtonComp'
import Title from './Title'
import { colors } from '../Data/Colors'

const ControlComp = ({ name, color, buttons }) => {
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Title text={name} color={colors[color]} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginLeft: 14,
            marginTop: 15,
            marginBottom: 0,
          }}
        >
          {buttons.map((button, index) => (button !== null ? <ControlButtonComp key={index} index={button.index} button={button} /> : null))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ControlComp
