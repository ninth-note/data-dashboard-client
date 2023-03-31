import { createSlice } from "@reduxjs/toolkit";

export const nameTagSlice = createSlice({
  name: "nametag",
  initialState: {
    showUser: false
  },
  reducers: {
    toggleNameTag: (state) => {
      state.showUser = !state.showUser;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleNameTag } = nameTagSlice.actions;

export default nameTagSlice.reducer;