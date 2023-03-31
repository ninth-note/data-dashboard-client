import { createSlice } from "@reduxjs/toolkit";

export const footerSlice = createSlice({
  name: "footer",
  initialState: {
    showFooter: true
  },
  reducers: {
    toggleFooter: (state) => {
      state.showFooter = !state.showFooter;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleFooter } = footerSlice.actions;

export default footerSlice.reducer;