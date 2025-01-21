import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice'
import sideMenuReducer from '../features/sideMenuSlice'
import loginReducer from '../features/loginSlice'
import newPersonReducer from '../features/newPersonModalSlice'
import reachOutReducer from '../features/reachOutModalSlice'
import tierSettingsReducer from '../features/tierSettingsSlice'


export default configureStore({
  reducer: {
    modal: modalReducer,
    sideMenu: sideMenuReducer,
    login: loginReducer,
    newPersonModal: newPersonReducer,
    reachOutModal: reachOutReducer,
    tierSettingsModal: tierSettingsReducer

  },
})
