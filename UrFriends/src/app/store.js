import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice'
import sideMenuReducer from '../features/sideMenuSlice'

export default configureStore({
  reducer: {
    modal: modalReducer,
    sideMenu: sideMenuReducer
  },
})
