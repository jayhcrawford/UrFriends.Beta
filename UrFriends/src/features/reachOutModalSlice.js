import { createSlice } from "@reduxjs/toolkit";

export const reachOutModal = createSlice({
  name: "reachOutModal",
  initialState: {
    visible: false,
    person: null
  },
  reducers: {
    setVisibleReachOutModal: (state, action) => {
      state.visible = true;
    },
    setHideReachOutModal: (state, action) => {
      state.visible = false;
    },
    setPerson: (state, action) => {
      state.person = action.payload
    },
    resetPerson: (state, action) => {
      state.person = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setVisibleReachOutModal, setHideReachOutModal, setPerson, resetPerson } = reachOutModal.actions;

export default reachOutModal.reducer;
