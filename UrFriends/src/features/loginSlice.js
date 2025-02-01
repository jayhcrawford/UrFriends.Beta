import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    settings: null
  },
  reducers: {
    loginDispatch: (state, action) => {
      state.user = action.payload;
    },
    logoutDispatch: (state, action) => {
      state.user = null;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutDispatch, loginDispatch, setSettings } = loginSlice.actions;

export default loginSlice.reducer;
