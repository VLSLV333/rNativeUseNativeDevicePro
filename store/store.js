import { configureStore } from '@reduxjs/toolkit';

import placesSlice from './placesSlice';

export default configureStore({
  reducer: {
    placesSlice,
  },
});
