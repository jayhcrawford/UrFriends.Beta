import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
  },
  reducers: {
    loginDispatch: (state, action) => {
      state.user = action.payload;
    },
    logoutDispatch: (state, action) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutDispatch, loginDispatch } = loginSlice.actions;

export default loginSlice.reducer;
