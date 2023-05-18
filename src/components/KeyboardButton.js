import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const KeyPressHandler = () => {
  const buttons = useSelector((state) => state.data.buttons)

  useEffect(() => {
    const handleKeyUp = (event) => {
      const pressedKey = event.key.toLowerCase()

      const matchingButtons = buttons.filter((button) => button.shortcut.toLowerCase() === pressedKey)
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [buttons])

  return <div></div>
}

export default KeyPressHandler
