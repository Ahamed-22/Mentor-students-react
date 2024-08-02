import { createSlice } from "@reduxjs/toolkit";

export const mentorsSlice = createSlice({
  name: "mentors",
  initialState: {
    isLoading: false,
    mentors: [],
  },
  reducers: {
    saveAllMentors: (state, action) => {
      return {
        ...state,
        mentors: action.payload.data,
      };
    },
  },
});

export const { saveAllMentors } = mentorsSlice.actions;
export default mentorsSlice.reducer;