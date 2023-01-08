import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  status: "idle"
};

export const fetchLaunches = createAsyncThunk("launches/fetchLaunches", async thunkAPI => {
  const response = await fetch("https://api.spacexdata.com/v3/launches?limit=25");
  const json = await response.json();
  return json;
});

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLaunches.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  }
});

export const {} = launchesSlice.actions;

export default launchesSlice.reducer;
