import { View, StyleSheet, ScrollView, Text } from 'react-native';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorScreen from './ErrorScreen';

import { setErrorMessage } from '../store/errorSlice';

import AuthenticationInput from '../components/Authentication/AuthenticationInput';

import MyButton from '../components/UI/MyButton';

import requestResetPassEmail from '../util/passResetEmail';

export default function ChangePassScreen({ navigation }) {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const [emailForPassChange, setEmailForPassChange] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailSent200, setEmailSent200] = useState(false);

  const changePassBtnHandler = async () => {
    let emailRegex = new RegExp('^.+@.+.[a-z]{2,}$', 'i');
    let emailIsValid = emailRegex.test(emailForPassChange.trim());

    if (!emailIsValid) {
      setEmailValid(false);
      return;
    }
    setLoading(true);
    setEmailValid(true);

    const requestAnswer = await requestResetPassEmail(emailForPassChange);

    if (requestAnswer === 'EMAIL_NOT_FOUND') {
      dispatch(
        setErrorMessage(
          'Account with this email does not exist. Please, check it and try again!'
        )
      );
    } else if (requestAnswer === 'INVALID_EMAIL') {
      dispatch(
        setErrorMessage(
          'This email seems incorrect. Please, check it and try again!'
        )
      );
    } else if (requestAnswer === 'error') {
      dispatch(
        setErrorMessage(
          'Something went wrong. Please, check email and try again!'
        )
      );
    } else if (requestAnswer === 'check your email') {
      setEmailSent200(true);
    }

    setLoading(false);
  };

  const loginAgainHandler = () => {
    navigation.navigate('LoginScreen');
  };

  if (errorMessage) {
    return <ErrorScreen txt={errorMessage} />;
  }

  if (loading) {
    return <LoadingOverlay txt="Sending reset email..." />;
  }

  if (emailSent200) {
    return (
      <View style={styles.rootContainerLoginAgain}>
        <Text style={styles.headingTextLoginAgain}>Check your email :)</Text>
        <Text style={styles.textLoginAgain}>
          Use link in your email to change password and login again using
          it.
        </Text>
        <MyButton onPress={loginAgainHandler}>{'Login again'}</MyButton>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <AuthenticationInput
          inpValue={emailForPassChange}
          onInputChange={setEmailForPassChange}
          label="Type your account's email"
          placeholder="Email"
          isInvalid={!emailValid}
          keyboardtype="email-address"
        />
        <View style={styles.btnContainer}>
          <MyButton
            onPress={changePassBtnHandler}
            containerStyles={styles.btnStyle}
          >
            {'Send'}
          </MyButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  btnStyle: {
    margin: 0,
    width: '50%',
  },
  rootContainerLoginAgain: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50%',
    paddingHorizontal: 25,
  },
  headingTextLoginAgain: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15,
  },
  textLoginAgain: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15
  }
});
