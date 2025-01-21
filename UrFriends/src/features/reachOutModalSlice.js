import { createSlice } from "@reduxjs/toolkit";

export const reachOutModal = createSlice({
  name: "reachOutModal",
  initialState: {
    visible: false,
  },
  reducers: {
    setVisibleReachOutModal: (state, action) => {
      state.visible = true;
    },
    setHideReachOutModal: (state, action) => {
      state.visible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleReachOutModal, setHideReachOutModal } = reachOutModal.actions;

export default reachOutModal.reducer;
