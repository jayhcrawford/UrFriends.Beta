import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "expandedContactModal",
  initialState: {
    visible: false,
    type: "no content",
    person: null,
    topic: null
  },
  reducers: {
    setVisibleModal: (state, action) => {
      if (Object.hasOwn(action.payload, "person")) {
        state.person = action.payload.person
      }
      if (Object.hasOwn(action.payload, "topic")) {
        state.topic = action.payload.topic
      }
      state.type = action.payload.modalContentType
      state.visible = true;
    },
    hideModal: (state, action) => {
      state.visible = false;
      state.type = "no content"
      state.person = null;
      state.topic = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
