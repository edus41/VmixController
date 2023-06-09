import React, { useState, useEffect } from 'react'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined'
import { Box } from '@mui/material'

export default function StatusChecker({ ip, port }) {
  const [responseTime, setResponseTime] = useState(undefined)
  const [color, setColor] = useState('green')

  useEffect(() => {
    const pingInterval = setInterval(() => {
      const startTime = performance.now()
      fetch(`http://${ip}:${port}/API`)
        .then((response) => {
          if (response.status === 200) {
            const endTime = performance.now()
            const ping = Math.round(endTime - startTime)
            setResponseTime(ping)
          } else {
            setResponseTime(0)
          }
        })
        .catch(() => {
          setResponseTime(0)
        })
    }, 2000)

    return () => {
      clearInterval(pingInterval)
    }
  }, [ip, port])

  useEffect(() => {
    if (responseTime > 80 && responseTime < 249) {
      setColor('#fd7b1c')
    } else if (responseTime > 250) {
      setColor('red')
    } else {
      setColor('green')
    }
  }, [responseTime])

  function formatResponseTime(time) {
    if (time === null) {
      return null
    }

    const limitedTime = Math.min(time, 999)

    const formattedTime = String(limitedTime).padStart(3, '0')
    return formattedTime
  }

  return (
    <div>
      {responseTime ? (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <PublicOutlinedIcon sx={{ color: color }} />
          <p style={{ color: color, margin: 0, padding: 2 }}>{formatResponseTime(responseTime)} ms</p>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <PublicOffOutlinedIcon color="error" />
        </Box>
      )}
    </div>
  )
}
