import { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import AuthenticationInput from './AuthenticationInput';

import MyButton from '../UI/MyButton';

export default function AuthenticationForm({ isLogin, onAuthenticate }) {
  let firstTouchEmail = true;
  let firstTouchRepeatEmail = true;
  let firstTouchPassword = true;
  let firstTouchRepeatPassword = true;

  const [emailInput, setEmailInput] = useState('');
  const [repeatEmailInput, setEepeatEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [repeatPasswordInput, setRepeatPasswordInput] = useState('');

  let emailRegex = new RegExp('^.+@.{2,}.[a-z]+$', 'i');
  let emailIsValid = emailRegex.test(emailInput.trim());
  let passwordIsValid = passwordInput.trim().length > 6;
  let repeatEmailIsValid = emailInput === repeatEmailInput;
  let repeatPasswordIsValid = passwordInput === repeatPasswordInput;

  const [inputsValid, setInputsValid] = useState({
    emailValid: true,
    repearEmailValid: true,
    passwordValid: true,
    repeatPasswordValid: true,
  });

  const emailInputHandler = (e) => {
    setEmailInput(e);
    console.log('here 2')
    if (!firstTouchEmail) {
      console.log('here')
      emailIsValid = emailRegex.test(e.trim());
      setInputsValid((state) => ({
        ...state,
        emailValid: emailIsValid
      }));
    }
  };

  const formButtonHandler = () => {
    if (isLogin) {
      repeatEmailIsValid = true;
      repeatPasswordIsValid = true;
    }

    if (!repeatEmailIsValid) {
      firstTouchRepeatEmail = false;
      setInputsValid((state) => ({ ...state, repearEmailValid: false }));
    } else if (repeatEmailIsValid) {
      setInputsValid((state) => ({ ...state, repearEmailValid: true }));
    }
    if (!repeatPasswordIsValid) {
      firstTouchRepeatPassword = false;
      setInputsValid((state) => ({ ...state, repeatPasswordValid: false }));
    } else if (repeatPasswordIsValid) {
      setInputsValid((state) => ({ ...state, repeatPasswordValid: true }));
    }
    if (!emailIsValid) {
      console.log('here 3')
      firstTouchEmail = false;
      setInputsValid((state) => ({
        ...state,
        emailValid: false,
        repearEmailValid: false,
      }));
    } else if (emailIsValid) {
      setInputsValid((state) => ({ ...state, emailValid: true }));
    }
    if (!passwordIsValid) {
      firstTouchPassword = false;
      setInputsValid((state) => ({
        ...state,
        passwordValid: false,
        repeatPasswordValid: false,
      }));
    } else if (passwordIsValid) {
      setInputsValid((state) => ({ ...state, passwordValid: true }));
    }

    if (
      emailIsValid &&
      passwordIsValid &&
      repeatEmailIsValid &&
      repeatPasswordIsValid
    ) {
      firstTouchEmail = true;
      firstTouchRepeatEmail = true;
      firstTouchPassword = true;
      firstTouchRepeatPassword = true;
      onAuthenticate();
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputsContainer}>
        <AuthenticationInput
          inpValue={emailInput}
          keyboardtype="email-address"
          label="Email"
          placeholder="email"
          onInputChange={emailInputHandler}
          isInvalid={!inputsValid.emailValid}
        />
        {!isLogin && (
          <AuthenticationInput
            keyboardtype="email-address"
            label="Repeat email"
            placeholder="repeat email"
            inpValue={repeatEmailInput}
            onInputChange={setEepeatEmailInput}
            isInvalid={!inputsValid.repearEmailValid}
          />
        )}
        <AuthenticationInput
          label="Password"
          placeholder="password"
          secure
          inpValue={passwordInput}
          onInputChange={setPasswordInput}
          keyboardtype={'default'}
          isInvalid={!inputsValid.passwordValid}
        />
        {!isLogin && (
          <AuthenticationInput
            label="Repeat password"
            placeholder="repeat password"
            secure
            inpValue={repeatPasswordInput}
            onInputChange={setRepeatPasswordInput}
            keyboardtype={'default'}
            isInvalid={!inputsValid.repeatPasswordValid}
          />
        )}
      </View>
      <View style={styles.btnContainer}>
        <MyButton
          onPress={formButtonHandler}
          containerStyles={styles.btnPassedStyles}
        >
          {isLogin ? 'Log in' : 'Sign up'}
        </MyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
  inputsContainer: {
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  btnPassedStyles: {
    width: 140,
  },
});
