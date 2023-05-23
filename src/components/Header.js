import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../redux/dataSlice'
import Button from '@material-ui/core/Button'
import Logo from './Logo'

const SaveButton = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const saveDataToFile = () => {
    const jsonData = JSON.stringify(data)
    const blob = new Blob([jsonData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.txt'
    link.click()
  }

  return (
    <Button variant="contained" color="primary" size="small" onClick={saveDataToFile} style={{ backgroundColor: '#1976D2', color: '#FFFFFF', width: '100px' }}>
      Guardar
    </Button>
  )
}

const LoadButton = () => {
  const dispatch = useDispatch()
  const [fileName, setFileName] = useState('')

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      const fileContent = reader.result
      try {
        const parsedData = JSON.parse(fileContent)
        const confirmed = window.confirm('¿Estás seguro de cargar el archivo?')

        if (confirmed) {
          dispatch(setData(parsedData))
          localStorage.setItem('data', JSON.stringify(parsedData))
          window.location.reload() // Recargar la página
        }
      } catch (error) {
        console.error('Error al parsear el archivo:', error)
      } finally {
        setFileName('')
      }
    }

    reader.readAsText(file)
    setFileName(file.name)
  }

  return (
    <div>
      <input accept=".txt" id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span" size="small" style={{ backgroundColor: '#1976D2', color: '#FFFFFF', width: '100px' }}>
          Cargar
        </Button>
      </label>
      {fileName && <span style={{ marginLeft: 10 }}>{fileName}</span>}
    </div>
  )
}

const ResetButton = () => {
  const handleReset = () => {
    const confirmReset = window.confirm('¿Estás seguro de que deseas reiniciar? Se perderán todos los datos.')

    if (confirmReset) {
      localStorage.removeItem('data')
      window.location.reload()
    }
  }

  return (
    <Button variant="contained" color="primary" size="small" style={{ backgroundColor: '#1976D2', color: '#FFFFFF', width: '100px' }} onClick={handleReset}>
      Reset
    </Button>
  )
}

const Header = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '30px',
        justifyContent: 'space-between',
        background: 'linear-gradient(to right, #111111, #333333)',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
        <Logo />
        <h3 style={{ margin: 0, marginLeft: 15 }}>VmixController</h3>
      </div>
      <div style={{ display: 'flex', marginRight: 15 }}>
        <div style={{ marginLeft: 10 }}>
          <ResetButton />
        </div>
        <div style={{ marginLeft: 10 }}>
          <LoadButton />
        </div>
        <div style={{ marginLeft: 10 }}>
          <SaveButton />
        </div>
      </div>
    </div>
  )
}

export default Header
