//ios client id: 693412946887-7touancvigfond2k6p640t1pqgqq9jpl.apps.googleusercontent.com
// import ButtonWithLogo from '../UI/ButtonWithLogo';

import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet } from 'react-native';

import AuthenticationInput from './AuthenticationInput';

import MyButton from '../UI/MyButton';

export default function AuthenticationForm({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [emailInput, setEmailInput] = useState('');
  const [repeatEmailInput, setRepeatEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [repeatPasswordInput, setRepeatPasswordInput] = useState('');

  const [firstTouchEmail, setFirstTouchEmail] = useState(true);
  const [firstTouchRepeatEmail, setFirstTouchRepeatEmail] = useState(true);
  const [firstTouchPassword, setFirstTouchPassword] = useState(true);
  const [firstTouchRepeatPassword, setFirstTouchRepeatPassword] =
    useState(true);

  let emailRegex = new RegExp('^.+@.+.[a-z]{2,}$', 'i');
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
    if (!firstTouchEmail) {
      emailIsValid = emailRegex.test(e.trim());
      repeatEmailIsValid = e === repeatEmailInput && emailIsValid;
      setInputsValid((state) => ({
        ...state,
        emailValid: emailIsValid,
        repearEmailValid: repeatEmailIsValid,
      }));
    }
  };

  const repeatEmailInputHandler = (e) => {
    setRepeatEmailInput(e);
    if (!firstTouchRepeatEmail) {
      repeatEmailIsValid = emailInput === e && inputsValid.emailValid;
      setInputsValid((state) => ({
        ...state,
        repearEmailValid: repeatEmailIsValid,
      }));
    }
  };

  const passwordInputHandler = (e) => {
    setPasswordInput(e);
    if (!firstTouchPassword) {
      passwordIsValid = e.trim().length > 6;
      repeatPasswordIsValid = e === repeatPasswordInput && passwordIsValid;
      setInputsValid((state) => ({
        ...state,
        passwordValid: passwordIsValid,
        repeatPasswordValid: repeatPasswordIsValid,
      }));
    }
  };

  const repeatPasswordInputHandler = (e) => {
    setRepeatPasswordInput(e);
    if (!firstTouchRepeatPassword) {
      repeatPasswordIsValid = passwordInput === e && inputsValid.passwordValid;
      setInputsValid((state) => ({
        ...state,
        repeatPasswordValid: repeatPasswordIsValid,
      }));
    }
  };

  const formButtonHandler = () => {
    if (isLogin) {
      repeatEmailIsValid = true;
      repeatPasswordIsValid = true;
    }

    setFirstTouchEmail(false);
    setFirstTouchRepeatEmail(false);
    setFirstTouchPassword(false);
    setFirstTouchRepeatPassword(false);

    if (!repeatEmailIsValid) {
      setInputsValid((state) => ({ ...state, repearEmailValid: false }));
    } else if (repeatEmailIsValid) {
      setInputsValid((state) => ({ ...state, repearEmailValid: true }));
    }
    if (!repeatPasswordIsValid) {
      setInputsValid((state) => ({ ...state, repeatPasswordValid: false }));
    } else if (repeatPasswordIsValid) {
      setInputsValid((state) => ({ ...state, repeatPasswordValid: true }));
    }
    if (!emailIsValid) {
      setInputsValid((state) => ({
        ...state,
        emailValid: false,
        repearEmailValid: false,
      }));
    } else if (emailIsValid) {
      setInputsValid((state) => ({ ...state, emailValid: true }));
    }
    if (!passwordIsValid) {
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
      setFirstTouchEmail(false);
      setFirstTouchRepeatEmail(false);
      setFirstTouchPassword(false);
      setFirstTouchRepeatPassword(false);
      onAuthenticate(emailInput, passwordInput);
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
            onInputChange={repeatEmailInputHandler}
            isInvalid={!inputsValid.repearEmailValid}
            contextMenuHidden={true}
          />
        )}
        <AuthenticationInput
          label="Password"
          placeholder="password"
          secure
          inpValue={passwordInput}
          onInputChange={passwordInputHandler}
          keyboardtype={'default'}
          isInvalid={!inputsValid.passwordValid}
        />
        {!isLogin && (
          <AuthenticationInput
            label="Repeat password"
            placeholder="repeat password"
            secure
            inpValue={repeatPasswordInput}
            onInputChange={repeatPasswordInputHandler}
            keyboardtype={'default'}
            isInvalid={!inputsValid.repeatPasswordValid}
            contextMenuHidden={true}
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
        {isLogin && (
          <MyButton
            onPress={() => navigation.navigate('ChangePassScreen')}
            containerStyles={styles.changePassBtnStyle}
          >
            {'Forgot password'}
          </MyButton>
        )}
      </View>
      {/* {isLogin && <View style={styles.logoBtnContainer}>
        <ButtonWithLogo
          logo={require('../../assets/googleLogo.webp')}
          onPress={() => console.log('clicked')}
          txt={'Log in using Google'}
          btnContainer={styles.googleBtn}
        />
      </View>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 20,
  },
  inputsContainer: {},
  btnContainer: {
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  logoBtnContainer: {
    alignItems: 'center',
  },
  btnPassedStyles: {
    width: '50%',
  },
  changePassBtnStyle: {
    width: '50%',
  },
  googleBtn: {
    width: '60%',
    marginTop: 15,
  },
});
