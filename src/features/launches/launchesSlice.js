import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false
};

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {}
});

// Action creators are generated for each case reducer function
export const {} = launchesSlice.actions;

export default launchesSlice.reducer;
