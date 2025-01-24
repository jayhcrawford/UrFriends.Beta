import { createSlice } from "@reduxjs/toolkit";

export const expandedContactModalSlice = createSlice({
  name: "expandedContactModal",
  initialState: {
    visible: false,
    type: "no content"
  },
  reducers: {
    setVisibleExpandedContactModal: (state, action) => {
      state.type = action.payload.modalContentType
      state.visible = true;
    },
    setHideExpandedContactModal: (state, action) => {
      state.visible = false;
      state.type = "no content"
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleExpandedContactModal, setHideExpandedContactModal } = expandedContactModalSlice.actions;

export default expandedContactModalSlice.reducer;
