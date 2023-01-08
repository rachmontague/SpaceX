import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  status: "idle"
};

export const fetchLaunches = createAsyncThunk("launches/fetchLaunches", async () => {
  const response = await fetch("https://api.spacexdata.com/v3/launches?limit=25");
  return response.json();
});

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    extraReducers: builder => {
      builder
        .addCase(fetchLaunches.pending, state => {
          state.status = "loading";
        })
        .addCase(fetchLaunches.fulfilled, (state, action) => {
          state.status = "idle";
          state.value += action.payload;
        });
    }
  }
});

export const {} = launchesSlice.actions;

export const selectLaunches = state => state.launches.value;

export default launchesSlice.reducer;
