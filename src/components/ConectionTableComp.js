//ConectionTableComp.js
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import StatusChecker from './StatusChecker'
import DeleteIcon from '@mui/icons-material/Delete'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIP, setIpIndex } from '../redux/dataSlice'
import RegisterForm from './RegisterFormComp'
import Title from './Title'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { colors } from '../Data/Colors'
import { calculateGradientColor } from '../Data/Colors'

const IpTable = ({ equipo, index }) => {
  const dispatch = useDispatch()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1, borderRadius: 2, bgcolor: '#f7f7f8', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', padding: 1, paddingRight: 0 }}>
      <Box sx={{ borderRight: 2, borderColor: '#AAAAAA', width: '40%' }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${calculateGradientColor(colors[equipo.color])} 0%, ${colors[equipo.color]} 100%)`,
            padding: '4px 8px',
            border: `1px solid ${equipo.color}`,
            borderRadius: 2,
            margin: 0,
            marginRight: 1,
            paddingLeft: 2,
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
          component="h4"
        >
          <span>{equipo.name}</span>
        </Box>
      </Box>
      <Box sx={{ borderRight: 2, borderColor: '#AAAAAA', width: '40%' }}>
        <Box
          sx={{
            padding: '4px 8px',
            margin: 0,
            color: '#444444',
            textAlign: 'center',
          }}
          fontSize={15}
          fontWeight={'bold'}
        >
          {equipo.ip} : {equipo.port}
        </Box>
      </Box>
      <Box sx={{ borderRight: 2, borderColor: '#AAAAAA', display: 'flex', justifyContent: 'flex-start', width: '20%' }}>
        <Box
          sx={{
            padding: '4px 8px',
            border: `1px solid ${equipo.color}`,
            borderRadius: 2,
            margin: 0,
            color: '#444444',
            width: '100%',
          }}
          fontSize={13}
        >
          <StatusChecker ip={equipo.ip} port={equipo.port} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '20%' }}>
        <Box sx={{ margin: 0, width: '100%', textAlign: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button variant="outlined" size="small" onClick={() => dispatch(setIpIndex(index))}>
              <EditIcon fontSize="small" />
            </Button>
            <Button color="error" variant="outlined" size="small" onClick={() => dispatch(deleteIP(index))}>
              <DeleteIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}

export default function ConectionTable() {
  const equipos = useSelector((state) => state.data.ips)
  const [showDiv, setShowDiv] = useState(true)
  const [height, setHeight] = useState(0)

  const handleTitleClick = () => {
    setShowDiv(!showDiv)
  }

  useEffect(() => {
    const controlSegmentElement = document.getElementById('addFunc')
    if (controlSegmentElement) {
      const heightData = controlSegmentElement.offsetHeight
      setHeight(heightData)
    }
  }, [])

  return (
    <Card id="conCard" sx={{ display: 'flex', minWidth: '700px', minHeight: `${showDiv ? height + 'px' : 'auto'}` }}>
      <CardContent sx={{ display: 'flex', width: '100%', minWidth: '650px', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Title text="Conexiones" color={colors[0]} onClick={handleTitleClick} />
        {showDiv && (
          <Box id="test" sx={{ flex: 'auto', marginTop: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              {equipos.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, minHeight: '160px', fontStyle: 'italic' }}>Sin Equipos Disponibles</Box>
              ) : (
                <Box>
                  {equipos.map((equipo, index) => (
                    <IpTable key={index} equipo={equipo} index={index} />
                  ))}
                </Box>
              )}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <RegisterForm />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
