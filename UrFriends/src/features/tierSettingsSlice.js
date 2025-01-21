import { createSlice } from "@reduxjs/toolkit";

export const tierSettingsModal = createSlice({
  name: "tierSettingsModal",
  initialState: {
    visible: false,
  },
  reducers: {
    setVisibleTierSettingsModal: (state, action) => {
      state.visible = true;
    },
    setHideTierSettingsModal: (state, action) => {
      state.visible = false;
    },
  },
});

export const { setHideTierSettingsModal, setVisibleTierSettingsModal } =
tierSettingsModal.actions;

export default tierSettingsModal.reducer;
