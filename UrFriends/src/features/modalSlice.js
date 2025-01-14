import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false,
    content: null
  },
  reducers: {
    setVisible: (state, action) => {
      console.log(action)
      state.visible = true;
    },
    setHide: (state, action) => {
      state.visible = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVisible, setHide } = modalSlice.actions

export default modalSlice.reducer
