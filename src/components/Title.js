import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { calculateGradientColor } from '../Data/Colors'

const Title = ({ text, color = '#1976D2', onClick }) => {
  const [color2, setcolor2] = useState('')

  useEffect(() => {
    setcolor2(calculateGradientColor(color))
  }, [text, color])

  return (
    <Button
      style={{
        background: `linear-gradient(135deg, ${color2} 0%, ${color} 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
        width: `100%`,
        color: '#fff',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default Title
