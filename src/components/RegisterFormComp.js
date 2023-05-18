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
          color: 1,
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

  const handleColorClick = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: index,
    }))
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '15px',
        }}
      >
        <TextField label="Nombre" name="name" size="small" value={formData.name} onChange={handleInputChange} required style={{ width: '30%', marginRight: '10px' }} />
        <TextField label="IP" name="ip" size="small" value={formData.ip} onChange={handleInputChange} required style={{ width: '30%', marginRight: '10px' }} />
        <TextField label="Port" name="port" size="small" value={formData.port} onChange={handleInputChange} required style={{ width: '20%', marginRight: '10px' }} />
        <ColorSelector colorIndex={formData.color} onColorSelect={handleColorClick} />
        {editIndex !== null ? (
          <Button variant="contained" onClick={handleUpdateItem} disabled={!isFormValid} style={{ width: '20%' }}>
            Actualizar
          </Button>
        ) : (
          <Button variant="contained" onClick={handleAddItem} disabled={!isFormValid} style={{ width: '20%' }}>
            Agregar
          </Button>
        )}
      </form>
    </div>
  )
}
