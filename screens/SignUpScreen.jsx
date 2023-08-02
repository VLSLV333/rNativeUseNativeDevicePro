import { View, StyleSheet } from 'react-native';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import AuthenticationContent from '../components/Authentication/AuthenticationContent';

import LoadingOverlay from '../components/UI/LoadingOverlay';

import ErrorScreen from './ErrorScreen';

export default function SignUpScreen() {
  const errorMessage = useSelector(state => state.errorSlice.errorMessage)

  const [loading, setLoading] = useState(false);

  const signUpHandler = () => {
    setLoading(true)
    
    console.log('sign Up!')

    setLoading(false)
  }

  if (loading) {
    return <LoadingOverlay txt='Signing you up...' />;
  }

  if (errorMessage){
    return <ErrorScreen txt={errorMessage} />
  }

  return <AuthenticationContent isLogin={false} onAuthenticate={signUpHandler} />;
}
