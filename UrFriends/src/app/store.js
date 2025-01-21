import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice'
import sideMenuReducer from '../features/sideMenuSlice'
import loginReducer from '../features/loginSlice'
import phonebookReducer from '../features/phonebookSlice'
import newPersonReducer from '../features/newPersonModalSlice'
import reachOutReducer from '../features/reachOutModalSlice'


export default configureStore({
  reducer: {
    modal: modalReducer,
    sideMenu: sideMenuReducer,
    login: loginReducer,
    phonebook: phonebookReducer,
    newPersonModal: newPersonReducer,
    reachOutModal: reachOutReducer
  },
})
