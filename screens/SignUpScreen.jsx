import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthenticationContent from "../components/Authentication/AuthenticationContent";

import LoadingOverlay from "../components/UI/LoadingOverlay";

import ErrorScreen from "./ErrorScreen";

import { setErrorMessage } from "../store/errorSlice";

import { createUser } from "../util/authHandler";

import { authenticate } from "../store/authSlice";

export default function SignUpScreen() {
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const [loading, setLoading] = useState(false);

  const signUpHandler = async (email, password) => {
    setLoading(true);
    try {
      const { authId: token, refreshToken } = await createUser(email, password);

      const timeWhenTokenExpiresMiliseconds = new Date(
        new Date().getTime() + 57 * 60 * 1000
      )
        .getTime()
        .toString();

      AsyncStorage.setItem("expireTime", timeWhenTokenExpiresMiliseconds);

      dispatch(authenticate({ token, refreshToken }));
    } catch (e) {
      if (e.response.data.error.message === "EMAIL_EXISTS") {
        dispatch(
          setErrorMessage(
            "This email is already registered. Please, just login using it:)"
          )
        );
      } else if (
        e.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER"
      ) {
        dispatch(setErrorMessage("Too many attempts. Please, try again later:)"));
      } else if (e.response.data.error.message === "INVALID_EMAIL") {
        dispatch(setErrorMessage("Please, provide real email:)"));
      } else {
        dispatch(setErrorMessage("Something went wrong. Please, try again later:)"));
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay txt="Signing you up..." />;
  }

  if (errorMessage) {
    return <ErrorScreen txt={errorMessage} />;
  }

  return (
    <AuthenticationContent isLogin={false} onAuthenticate={signUpHandler} />
  );
}
