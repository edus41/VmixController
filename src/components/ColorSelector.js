import React from 'react'
import { colors } from '../Data/Colors'

export default function ColorSelector({ colorIndex, onColorSelect }) {
  const handleColorClick = (index) => {
    onColorSelect(index)
  }

  return (
    <div style={{ display: 'flex', marginRight: 10 }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
            borderRadius: '50%',
            height: '18px',
            aspectRatio: '1/1',
            margin: '5px',
            border: `2px solid ${colorIndex === index ? 'white' : 'transparent'}`,
            cursor: 'pointer',
          }}
          onClick={() => handleColorClick(index)}
        ></div>
      ))}
    </div>
  )
}
