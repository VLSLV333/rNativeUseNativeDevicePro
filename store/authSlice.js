import AsyncStorage from "@react-native-async-storage/async-storage";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  refreshToken: null,
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    authenticate: (state, { payload }) => {
      state.isAuthenticated = true;
      state.token = payload.token;
      state.refreshToken = payload?.refreshToken;
      AsyncStorage.setItem("token", payload.token);
      AsyncStorage.setItem("tokenForRefresh", payload.refreshToken);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("expireTime");
      AsyncStorage.removeItem("tokenForRefresh");
    },
    renewToken: (state, { payload }) => {
      state.isAuthenticated = true;
      state.token = payload.token;
      state.refreshToken = payload.latestRefreshToken;
      AsyncStorage.setItem("token", payload.token);
      AsyncStorage.setItem("tokenForRefresh", payload.latestRefreshToken);
    },
  },
});

export const { authenticate, logOut, renewToken } = authSlice.actions;

export default authSlice.reducer;
