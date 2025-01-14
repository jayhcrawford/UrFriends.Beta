import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice'

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
})
