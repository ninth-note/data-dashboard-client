import { createSlice } from "@reduxjs/toolkit";

const themes = ['earth', 'water'];

export const colorSlice = createSlice({
  name: "color",
  initialState: {
    currentColor: false, // Set to the first theme in the array
    currentThemeIndex: 0
  },
  reducers: {
    nextColor: (state) => {
      state.currentThemeIndex = (state.currentThemeIndex + 1) % themes.length;
    }
  }
});

// Action creators are generated for each case reducer function
export const { nextColor } = colorSlice.actions;

export default colorSlice.reducer;