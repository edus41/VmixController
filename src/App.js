import React, { useEffect } from 'react'
import ConectionTable from './Components/ConectionTableComp'
import ControlButtonFormComp from './Components/ControlButtonFormComp'
import ControlSegment from './Components/ControlSegment'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import KeyPressHandler from './Components/KeyboardButton'
import Header from './Components/Header'

export default function App() {
  const data = useSelector((state) => state.data)

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
          marginTop: '50px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '90vw',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '49%' }}>
            <ConectionTable />
          </Box>
          <Box sx={{ width: '49%' }}>
            <ControlButtonFormComp></ControlButtonFormComp>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '90vw',
          }}
        >
          <ControlSegment equipos={data.ips} buttons={data.buttons} />
          {/* <KeyPressHandler /> */}
        </Box>
      </Box>
    </Box>
  )
}
