import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;