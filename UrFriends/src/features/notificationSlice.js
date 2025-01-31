import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    visible: false,
  },
  reducers: {
    setNotification: (state, action) => {
      state.visible = true;
    },
    hideNotification: (state, action) => {
      state.visible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
