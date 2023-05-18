//ConectionTableComp.js
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PingComponent from './PingComp'
import DeleteIcon from '@mui/icons-material/Delete'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIP, setIpIndex } from '../redux/dataSlice'
import RegisterForm from './RegisterFormComp'
import Title from './Title'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { colors } from '../Data/Colors'

export default function ConectionTable() {
  const dispatch = useDispatch()
  const equipos = useSelector((state) => state.data.ips)

  return (
    <Card style={{ marginTop: '20px', height: '356px' }}>
      <CardContent>
        <Title text="Conexiones" color="#1976D2" />
        <div
          style={{
            padding: '10px',
          }}
        >
          {equipos.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#f2f2f2',
                padding: '10px',
                borderRadius: '10px',
                fontStyle: 'italic',
                color: 'gray',
              }}
            >
              <p>SIN EQUIPOS</p>
            </div>
          ) : (
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          width: '20%',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      >
                        Nombre
                      </TableCell>
                      <TableCell
                        style={{
                          width: '10%',
                          textAlign: 'center',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      >
                        IP
                      </TableCell>
                      <TableCell
                        style={{
                          width: '10%',
                          textAlign: 'center',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      >
                        Port
                      </TableCell>
                      <TableCell
                        style={{
                          width: '12%',
                          textAlign: 'center',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      >
                        Estado
                      </TableCell>
                      <TableCell
                        style={{
                          width: '10%',
                          textAlign: 'center',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      >
                        Ping
                      </TableCell>
                      <TableCell
                        style={{
                          width: '20%',
                          textAlign: 'center',
                          backgroundColor: '#f5f5f5',
                          borderBottom: '1px solid gray',
                        }}
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {equipos.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <h4
                            style={{
                              backgroundColor: colors[item.color],
                              display: 'inline-block',
                              padding: '4px 8px',
                              border: `1px solid ${item.color}`,
                              borderRadius: '10px',
                              margin: '0',
                              color: '#ffffff',
                            }}
                          >
                            {item.name}
                          </h4>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: 'center' }}>{item.ip}</TableCell>
                        <TableCell style={{ width: '10%', textAlign: 'center' }}>{item.port}</TableCell>
                        <TableCell style={{ width: '10%', textAlign: 'center' }}>
                          <PingComponent ip={item.ip} port={item.port} />
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: 'center' }}>
                          <PingComponent ip={item.ip} port={item.port} mode="ping" />
                        </TableCell>

                        <TableCell style={{ width: '20%', textAlign: 'center' }}>
                          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button variant="outlined" size="small" onClick={() => dispatch(setIpIndex(index))}>
                              <EditIcon fontSize="small" />
                            </Button>
                            <Button color="error" variant="outlined" size="small" onClick={() => dispatch(deleteIP(index))}>
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          <RegisterForm />
        </div>
      </CardContent>
    </Card>
  )
}
