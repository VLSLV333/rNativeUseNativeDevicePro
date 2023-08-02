import { configureStore } from '@reduxjs/toolkit';

import placesSlice from './placesSlice';

import errorSlice from './errorSlice';

import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    placesSlice,
    errorSlice,
    authSlice
  },
});
