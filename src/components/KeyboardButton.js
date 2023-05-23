import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { vmixFetch } from '../Data/VmixFetch'

const KeyPressHandler = () => {
  const buttons = useSelector((state) => state.data.buttons)
  const equipos = useSelector((state) => state.data.ips)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (inputRef.current && inputRef.current.contains(event.target)) {
        return
      }
      const pressedKey = event.key.toLowerCase()
      const matchingButtons = buttons.filter((button) => button.shortcut.toLowerCase() === pressedKey)

      matchingButtons.map((button) => {
        vmixFetch(button, equipos)
      })
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [buttons, equipos])

  return <div ref={inputRef}></div>
}

export default KeyPressHandler
