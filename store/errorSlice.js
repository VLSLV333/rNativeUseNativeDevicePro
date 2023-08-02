import { createSlice } from '@reduxjs/toolkit';

initialState = { errorMessage: null };

const errorSlice = createSlice({
  initialState,
  name: 'errorSlice',
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
