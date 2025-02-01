import { createSlice } from "@reduxjs/toolkit";

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState: {
    phonebook: null,
  },
  reducers: {
    populatePhonebook: (state, action) => {
      state.phonebook = action.payload;
    },
    updatePhonebook: (state, action) => {
      state.user = null;
    },
  },
});

export const { updatePhonebook, populatePhonebook } = phonebookSlice.actions;

export default phonebookSlice.reducer;
