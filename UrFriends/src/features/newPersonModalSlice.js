import { createSlice } from "@reduxjs/toolkit";

export const newPersonModal = createSlice({
  name: "newPersonModal",
  initialState: {
    visible: false,
  },
  reducers: {
    setVisibleNewPersonModal: (state, action) => {
      state.visible = true;
    },
    setHideNewPersonModal: (state, action) => {
      state.visible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleNewPersonModal, setHideNewPersonModal } = newPersonModal.actions;

export default newPersonModal.reducer;
