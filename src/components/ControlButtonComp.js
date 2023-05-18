import React from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteButton, setButtonIndex } from '../redux/dataSlice'
import { colors } from '../Data/Colors'

const ControlButtonComp = ({ index, button }) => {
  const dispatch = useDispatch()
  const equipos = useSelector((state) => state.data.ips)

  async function handleClick() {
    const { func, value, input, duration, channel, equipo } = button

    if (equipo.name === 'All') {
      equipos.map(async (equipo, index) => {
        let queryString = `http://${equipo.ip}:${equipo.port}/API/?Function=${func}`

        if (input !== '') {
          console.log('equipo.input :>> ', input)
          queryString += `&Input=${input}`
        }

        if (duration !== '') {
          queryString += `&Duration=${duration}`
        }

        if (value !== '') {
          queryString += `&Value=${value}`
        }

        if (channel !== '') {
          queryString += `&Channel=${channel}`
        }

        await fetch(queryString)
          .then((response) => {
            console.log('response :>> ', response)
          })
          .catch((error) => {
            console.log('error :>> ', error)
          })
      })
    } else {
      const { ip, port } = equipo
      let queryString = `http://${ip}:${port}/API/?Function=${func}`

      if (input !== '') {
        queryString += `&Input=${input}`
      }

      if (duration !== '') {
        queryString += `&Duration=${duration}`
      }

      if (value !== '') {
        queryString += `&Value=${value}`
      }

      if (channel !== '') {
        queryString += `&Channel=${channel}`
      }

      await fetch(queryString)
        .then((response) => {
          console.log('response :>> ', response)
        })
        .catch((error) => {
          console.log('error :>> ', error)
        })
    }
  }

  return (
    <div
      style={{
        width: '155px',
        aspectRatio: '1/1',
        marginRight: 10,
      }}
    >
      <Button
        variant="contained"
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          backgroundColor: colors[button.color],
        }}
        onClick={handleClick}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {button.name}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            textAlign: 'left',
            paddingLeft: '8px',
            paddingBottom: '2px',
            fontSize: '80%',
          }}
        >
          key: {button.shortcut}
        </div>
      </Button>
      <div
        style={{
          marginTop: '5px',
          height: '20%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button variant="outlined" size="small" onClick={() => dispatch(setButtonIndex(index))}>
            <EditIcon fontSize="small" />
          </Button>
          <Button color="error" variant="outlined" size="small" onClick={() => dispatch(deleteButton(index))}>
            <DeleteIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default ControlButtonComp
