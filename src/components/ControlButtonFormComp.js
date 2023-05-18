import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Title from './Title'
import ColorSelector from './ColorSelector'
import { registerButton, editButton, setButtonIndex } from '../redux/dataSlice'
import { keys } from '../Data/Keys'
import { vmix } from '../Data/VmixFunc'
import { colors } from '../Data/Colors'

export default function ControlButtonFormComp() {
  const dispatch = useDispatch()
  const equipos = useSelector((state) => state.data.ips)
  const buttons = useSelector((state) => state.data.buttons)
  const editIndex = useSelector((state) => state.data.buttonIndex)

  const initialFormState = useMemo(() => {
    return editIndex !== null
      ? buttons[editIndex]
      : {
          name: '',
          shortcut: 'Ninguna',
          func: 'PlayPause',
          value: '',
          input: '',
          duration: '',
          channel: '',
          equipo: { name: 'All' },
          color: 0,
        }
  }, [editIndex, buttons])

  const [formData, setFormData] = useState(initialFormState)

  const [indexVmix, setindexVmix] = useState(0)
  const [isFormValid, setIsFormValid] = useState(true)

  useEffect(() => {
    setFormData(initialFormState)
  }, [editIndex, initialFormState])

  useEffect(() => {
    setindexVmix(vmix.name.indexOf(formData.func))
    const { name, shortcut, func, value, input, duration, channel, color } = formData
    setIsFormValid(true)
  }, [formData])

  const handleColorClick = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: index,
    }))
  }

  const handleAddItem = () => {
    if (!isFormValid) {
      return
    }
    dispatch(registerButton({ ...formData }))
    setFormData(initialFormState)
  }

  const handleUpdateItem = () => {
    dispatch(
      editButton({
        index: editIndex,
        updatedButton: { ...formData },
      })
    )
    setFormData(initialFormState)
  }

  const handleCancelItem = () => {
    dispatch(setButtonIndex(null))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const shouldShowField = (fieldName) => {
    if (indexVmix === -1) {
      return false
    }
    const functionParameters = vmix.parameters[indexVmix]
    return functionParameters.includes(fieldName)
  }

  const handleChange = (equipo) => {
    setFormData({ ...formData, equipo })
  }

  const handleChange2 = () => {
    setFormData({ ...formData, equipo: { name: 'All' } })
  }

  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Title text="Añadir Funcion" color="#1976D2" />
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField label="Nombre" name="name" size="small" sx={{ width: '100%' }} value={formData.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Shortcut</InputLabel>
                <Select label="Shortcut" name="shortcut" size="small" defaultValue="Ninguna" sx={{ width: '100%' }} value={formData.shortcut} onChange={handleInputChange}>
                  <MenuItem value="Ninguna">
                    <em>Ninguna</em>
                  </MenuItem>
                  {keys.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Funcion</InputLabel>
                <Select label="Funcion" name="func" size="small" defaultValue="PlayPause" sx={{ width: '100%' }} value={formData.func} onChange={handleInputChange}>
                  {vmix.name.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              >
                {vmix.description[indexVmix] === '' ? 'https://www.vmix.com/help25/index.htm?DeveloperAPI.html' : vmix.description[indexVmix]}
              </Box>
            </Grid>

            <Grid item xs={3}>
              <TextField label="Value" name="value" value={formData.value} size="small" onChange={handleInputChange} disabled={!shouldShowField('Value')} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Input" name="input" value={formData.input} size="small" onChange={handleInputChange} disabled={!shouldShowField('Input')} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Channel" name="channel" value={formData.channel} size="small" onChange={handleInputChange} disabled={!shouldShowField('Channel')} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Duration" name="duration" value={formData.duration} size="small" onChange={handleInputChange} disabled={!shouldShowField('Duration')} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <FormControlLabel
                  control={<Checkbox checked={formData.equipo.name === 'All'} onChange={handleChange2} />}
                  label={
                    <h5
                      style={{
                        backgroundColor: colors[0],
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '10px',
                        margin: '0',
                        color: '#ffffff',
                      }}
                    >
                      GENERAL
                    </h5>
                  }
                />
                {equipos.map((equipo, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox checked={formData.equipo.name === equipo.name} onChange={() => handleChange(equipo)} />}
                    label={
                      <h5
                        style={{
                          backgroundColor: colors[equipo.color],
                          display: 'inline-block',
                          padding: '4px 8px',
                          borderRadius: '10px',
                          margin: '0',
                          color: '#ffffff',
                        }}
                      >
                        {equipo.name}
                      </h5>
                    }
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={4}>
              <ColorSelector colorIndex={formData.color} onColorSelect={handleColorClick} />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {editIndex !== null ? (
                <div>
                  <Button variant="contained" onClick={handleUpdateItem} disabled={!isFormValid} color="primary">
                    Actualizar
                  </Button>
                  <Button variant="contained" color="error" onClick={handleCancelItem} disabled={!isFormValid} style={{ marginLeft: 10 }}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button variant="contained" color="primary" onClick={handleAddItem} disabled={!isFormValid}>
                  Agregar
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
