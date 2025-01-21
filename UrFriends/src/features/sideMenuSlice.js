import { createSlice } from '@reduxjs/toolkit'

export const sideMenuSlice = createSlice({
  name: 'modal',
  initialState: {
    visible: false
 },
  reducers: {
    showSideMenu: (state, action) => {
      state.visible = true;
    },
    hideSideMenu: (state, action) => {
      state.visible = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { hideSideMenu, showSideMenu } = sideMenuSlice.actions

export default sideMenuSlice.reducer
