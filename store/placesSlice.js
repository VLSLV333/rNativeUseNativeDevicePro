import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const placesSlice = createSlice({
  initialState,
  name: 'placesSlice',
  reducers: {
    addPlace: (state, { payload }) => {
      state.unshift({ ...payload });
    },
  },
});

export default placesSlice.reducer;

export const { addPlace } = placesSlice.actions;
