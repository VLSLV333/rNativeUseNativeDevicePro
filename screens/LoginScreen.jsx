import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthenticationContent from "../components/Authentication/AuthenticationContent";

import LoadingOverlay from "../components/UI/LoadingOverlay";

import ErrorScreen from "./ErrorScreen";

import { loginUser } from "../util/authHandler";

import { setErrorMessage } from "../store/errorSlice";
import { authenticate } from "../store/authSlice";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const loginHandler = async (email, password) => {
    setLoading(true);
    try {
      const { authId: token, refreshToken } = await loginUser(email, password);

      const timeWhenTokenExpiresMiliseconds = new Date(
        new Date().getTime() + 57 * 60 * 1000
      )
        .getTime()
        .toString();
      AsyncStorage.setItem("expireTime", timeWhenTokenExpiresMiliseconds);

      dispatch(authenticate({ token, refreshToken }));
    } catch (e) {
      console.log(e)
      if (e.response.data.error.message === 'EMAIL_NOT_FOUND') {
        dispatch(
          setErrorMessage(
            'This email is not yet registered. Please, check email or create new user:)'
          )
        );
      } else if (e.response.data.error.message === 'INVALID_PASSWORD') {
        dispatch(
          setErrorMessage('You have provided wrong password. Please, try again or change it:)')
        );
      } else {
        dispatch(setErrorMessage('Something went wrong. Please, try again later:)'));
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay txt={"You are beeing loged in..."} />;
  }

  if (errorMessage) {
    return <ErrorScreen txt={errorMessage} />;
  }

  return <AuthenticationContent isLogin={true} onAuthenticate={loginHandler} />;
}
