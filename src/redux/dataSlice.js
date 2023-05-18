import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ips: [
    { name: 'Vmix N°1', ip: '192.168.1.42', port: '8088', color: 2 },
    { name: 'Vmix N°2', ip: '192.168.1.52', port: '8088', color: 4 },
  ],
  ipIndex: null,
  buttons: [
    {
      name: 'Play / Pause',
      shortcut: 'Enter',
      func: 'PlayPause',
      value: '',
      input: '',
      duration: '',
      channel: '',
      equipo: { name: 'All' },
      color: 0,
      index: 0,
    },
  ],
  buttonIndex: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : initialState,
  reducers: {
    registerIP: (state, action) => {
      const newPC = action.payload
      state.ips.push(newPC)
      state.ipIndex = null
      state.buttonIndex = null
    },
    editIP: (state, action) => {
      const { index, updatedPC } = action.payload
      state.ips[index] = updatedPC
      state.ipIndex = null
      state.buttonIndex = null
    },
    deleteIP: (state, action) => {
      const index = action.payload
      state.ips.splice(index, 1)
      state.ipIndex = null
      state.buttonIndex = null
    },
    setIpIndex: (state, action) => {
      const index = action.payload
      state.ipIndex = index
    },
    registerButton: (state, action) => {
      const newButton = { ...action.payload, index: state.buttons.length }
      state.buttons.push(newButton)
      state.ipIndex = null
      state.buttonIndex = null
    },
    editButton: (state, action) => {
      const { index, updatedButton } = action.payload
      state.buttons[index] = updatedButton
      state.ipIndex = null
      state.buttonIndex = null
    },
    deleteButton: (state, action) => {
      const index = action.payload
      state.buttons.splice(index, 1)
      state.ipIndex = null
      state.buttonIndex = null

      for (let i = index; i < state.buttons.length; i++) {
        state.buttons[i].index = i
      }
    },
    setButtonIndex: (state, action) => {
      const index = action.payload
      state.buttonIndex = index
    },
    setData: (state, action) => {
      state = action.payload
      state.ipIndex = null
      state.buttonIndex = null
    },
  },
})

export const { registerIP, editIP, deleteIP, setIpIndex, registerButton, editButton, deleteButton, setButtonIndex, setData } = dataSlice.actions
export default dataSlice.reducer
