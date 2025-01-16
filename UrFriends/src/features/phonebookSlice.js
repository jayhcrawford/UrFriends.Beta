import { createSlice } from "@reduxjs/toolkit";

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState: {
    phonebook: null,
  },
  reducers: {
    populate: (state, action) => {
      state.phonebook = action.payload.phonebook
    },
    addPerson: (state, action) => {
      console.log(action.payload.tier)
    },

  },
});

export const { populate, addPerson } = phonebookSlice.actions;

export default phonebookSlice.reducer;
