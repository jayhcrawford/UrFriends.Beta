import { createSlice } from "@reduxjs/toolkit";

export const expandedContactModalSlice = createSlice({
  name: "expandedContactModal",
  initialState: {
    visible: false,
    type: "no content",
    person: null,
    topic: null
  },
  reducers: {
    setVisibleExpandedContactModal: (state, action) => {
      if (Object.hasOwn(action.payload, "person")) {
        state.person = action.payload.person
      }
      if (Object.hasOwn(action.payload, "topic")) {
        state.topic = action.payload.topic
      }
      state.type = action.payload.modalContentType
      state.visible = true;
    },
    setHideExpandedContactModal: (state, action) => {
      state.visible = false;
      state.type = "no content"
      state.person = null;
      state.topic = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleExpandedContactModal, setHideExpandedContactModal } = expandedContactModalSlice.actions;

export default expandedContactModalSlice.reducer;
