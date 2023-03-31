import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    needRefresh: false
  },
  reducers: {
    tryRefresh: (state) => {
      state.needRefresh = !state.needRefresh;
    }
  }
});

// Action creators are generated for each case reducer function
export const { tryRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;