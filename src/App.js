import React, { useEffect, useRef } from 'react'
import ConectionTable from './Components/ConectionTableComp'
import ControlButtonFormComp from './Components/ControlButtonFormComp'
import ControlSegment from './Components/ControlSegment'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import Header from './Components/Header'
import { vmixFetch } from './Data/VmixFetch'

export default function App() {
  const data = useSelector((state) => state.data)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (inputRef.current && inputRef.current.contains(event.target)) {
        return
      }
      const pressedKey = event.key.toLowerCase()
      const matchingButtons = data.buttons && data.buttons.filter((button) => button.shortcut.toLowerCase() === pressedKey)
      matchingButtons.map((button) => {
        vmixFetch(button, data.ips)
      })
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [data])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return (
    <div ref={inputRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f8', height: '100vh' }}>
      <Header />
      <Box id="FunctionSegment" sx={{ display: 'flex', flexDirection: 'column', width: '80%', minWidth: '1400px' }}>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '49%' }}>
            <ConectionTable />
          </Box>
          <Box sx={{ width: '49%' }}>
            <ControlButtonFormComp />
          </Box>
        </Box>
      </Box>
      <Box id="ControlSegment" sx={{ display: 'flex', flexDirection: 'column', width: '80%', minWidth: '1400px', height: '100%' }}>
        <ControlSegment equipos={data.ips} buttons={data.buttons} />
      </Box>
    </div>
  )
}
