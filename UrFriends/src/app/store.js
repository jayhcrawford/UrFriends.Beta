import { configureStore } from "@reduxjs/toolkit";

import sideMenuReducer from "../features/sideMenuSlice";
import loginReducer from "../features/loginSlice";
import tierSettingsReducer from "../features/tierSettingsSlice";
import expandedContactModalReducer from "../features/modalSlice";

export default configureStore({
  reducer: {
    sideMenu: sideMenuReducer,
    login: loginReducer,
    tierSettingsModal: tierSettingsReducer,
    expandContactModal: expandedContactModalReducer,
  },
});
