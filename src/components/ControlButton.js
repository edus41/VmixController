import React from 'react'
import { colors } from '../Data/Colors'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ButtonGroup from '@mui/material/ButtonGroup'
import { deleteButton, setButtonIndex } from '../redux/dataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { vmixFetch } from '../Data/VmixFetch'

const ControlButton = ({ button }) => {
  const dispatch = useDispatch()
  const equipos = useSelector((state) => state.data.ips)

  return (
    <div style={{ display: 'flex', maxWidth: '90vw', flexWrap: 'wrap', justifyContent: 'center' }}>
      {button.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <p style={{ fontSize: 'smaller', fontStyle: 'italic' }}>Sin Controles</p>
        </div>
      ) : (
        <div id="2" style={{ minWidth: '100px', width: '148px', aspectRatio: '1/1', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
          <Button
            variant="contained"
            style={{ width: '100%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, backgroundColor: colors[button.color] }}
            onClick={() => vmixFetch(button, equipos)}
          >
            <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{button.name}</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, textAlign: 'left', paddingLeft: '8px', paddingBottom: '2px', fontSize: '80%' }}>key: {button.shortcut}</div>
          </Button>
          <div style={{ marginTop: '5px', height: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button variant="outlined" size="small" onClick={() => dispatch(setButtonIndex(button.index))}>
                <EditIcon fontSize="small" />
              </Button>
              <Button color="error" variant="outlined" size="small" onClick={() => dispatch(deleteButton(button.index))}>
                <DeleteIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlButton
