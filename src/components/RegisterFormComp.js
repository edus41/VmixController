//RegisterFormComp.js
import React, { useState, useEffect, useMemo } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerIP, editIP, setIpIndex } from '../redux/dataSlice'
import ColorSelector from './ColorSelector'

export default function RegisterForm() {
  const dispatch = useDispatch()
  const equipos = useSelector((state) => state.data.ips)
  const editIndex = useSelector((state) => state.data.ipIndex)

  const initialFormState = useMemo(() => {
    return editIndex !== null
      ? equipos[editIndex]
      : {
          name: '',
          ip: '',
          port: '',
          color: 0,
        }
  }, [editIndex, equipos])

  const [formData, setFormData] = useState(initialFormState)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setFormData(initialFormState)
  }, [editIndex, initialFormState])

  useEffect(() => {
    const { name, ip, port } = formData
    const isNameValid = name.trim() !== ''
    const isIpValid = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)
    const isIpNumbersValid = ip.split('.').every((num) => parseInt(num) <= 255)
    const isPortValid = /^\d+$/.test(port)
    const isPortNumbersValid = parseInt(port) <= 65535

    setIsFormValid(isNameValid && isIpValid && isPortValid && isIpNumbersValid && isPortNumbersValid)
  }, [formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleAddItem = () => {
    if (!isFormValid) {
      return
    }
    dispatch(registerIP(formData))
    setFormData(initialFormState)
  }

  const handleUpdateItem = () => {
    dispatch(editIP({ index: editIndex, updatedPC: formData }))
  }

  const handleCancelItem = () => {
    dispatch(setIpIndex(null))
  }

  const handleColorClick = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: index,
    }))
  }

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <TextField label="Nombre" name="name" size="small" value={formData.name} onChange={handleInputChange} required style={{ width: '45%', marginRight: '10px' }} />
          <TextField label="IP" name="ip" size="small" value={formData.ip} onChange={handleInputChange} required style={{ width: '35%', marginRight: '10px' }} />
          <TextField label="Port" name="port" size="small" value={formData.port} onChange={handleInputChange} required style={{ width: '20%' }} />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <ColorSelector colorIndex={formData.color} onColorSelect={handleColorClick} />
          {editIndex !== null ? (
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" onClick={handleUpdateItem} disabled={!isFormValid} color="primary">
                Actualizar
              </Button>
              <Button variant="contained" color="error" onClick={handleCancelItem} disabled={!isFormValid} style={{ marginLeft: 10 }}>
                Cancelar
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={handleAddItem} disabled={!isFormValid} style={{ width: '19.5%', marginTop: '10px' }}>
              Agregar
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
