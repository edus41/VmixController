import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "Test", ip: "1.1.1.1", port: "8088" },
  { name: "Test", ip: "1.2.1.1", port: "8088" },
];

export const sessionSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    registerPC: (state, action) => {
      const newPC = action.payload;
      state.push(newPC);
    },
    editPC: (state, action) => {
      const { index, updatedPC } = action.payload;
      state[index] = updatedPC;
    },
    deletePC: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { registerPC, editPC, deletePC } = sessionSlice.actions;
export default sessionSlice.reducer;
