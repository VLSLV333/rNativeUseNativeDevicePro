import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { View, StyleSheet } from 'react-native';

import AuthenticationContent from '../components/Authentication/AuthenticationContent';

import LoadingOverlay from '../components/UI/LoadingOverlay';

import ErrorScreen from './ErrorScreen';

import { loginUser } from '../util/authHandler';

import { setErrorMessage } from '../store/errorSlice';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const loginHandler = async () => {
    console.log('login now')
    // try {
    //   const { authId, refreshToken } = await loginUser(email, password);
    // } catch (e) {}
  };

  if (loading) {
    return <LoadingOverlay txt={'You are beeing loged in...'} />;
  }

  if (errorMessage) {
    return <ErrorScreen txt={errorMessage} />;
  }

  return <AuthenticationContent isLogin={true} onAuthenticate={loginHandler} />;
}
