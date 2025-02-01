import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "../features/modalSlice";
import sideMenuReducer from "../features/sideMenuSlice";
import loginReducer from "../features/loginSlice";
import tierSettingsReducer from "../features/tierSettingsSlice";
import notificationReducer from "../features/notificationSlice";

export default configureStore({
  reducer: {
    sideMenu: sideMenuReducer,
    login: loginReducer,
    tierSettingsModal: tierSettingsReducer,
    modal: modalReducer,
    notification: notificationReducer,
  },
});
