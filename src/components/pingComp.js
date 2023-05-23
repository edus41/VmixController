import React, { useState, useEffect } from 'react'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined'
import { useDispatch } from 'react-redux'

function PingComponent({ ip, port }) {
  const dispatch = useDispatch()
  const [isPingSuccessful, setIsPingSuccessful] = useState(false)
  const [responseTime, setResponseTime] = useState(null)

  useEffect(() => {
    const pingInterval = setInterval(() => {
      const startTime = performance.now()
      fetch(`http://${ip}:${port}`)
        .then((response) => {
          const endTime = performance.now()
          const timeElapsed = endTime - startTime
          setResponseTime(Math.round(timeElapsed))

          if (response.status === 200) {
            setIsPingSuccessful(true)
          } else {
            setIsPingSuccessful(false)
          }
        })
        .catch((error) => {
          setIsPingSuccessful(false)
        })
    }, 1000)

    return () => {
      clearInterval(pingInterval)
    }
  }, [ip, port])

  const getStatusLabel = () => {
    if (isPingSuccessful) {
      return (
        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
          <PublicOutlinedIcon color="success" fontSize="small" />
          <p style={{ color: 'green', marginLeft: 5 }}>{responseTime} ms</p>
        </div>
      )
    } else {
      return <PublicOffOutlinedIcon color="error" />
    }
  }

  return <div>{getStatusLabel()}</div>
}

export default PingComponent
