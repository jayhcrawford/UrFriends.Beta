import { createSlice } from "@reduxjs/toolkit";

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState: {
    phonebook: null,
    tiers: null
  },
  reducers: {
    populatePhonebook: (state, action) => {
      state.phonebook = action.payload;
    },
    populateTiers: (state, action) => {
      state.tiers = action.payload;
    },
  },
});

export const { populatePhonebook, populateTiers } = phonebookSlice.actions;

export default phonebookSlice.reducer;
