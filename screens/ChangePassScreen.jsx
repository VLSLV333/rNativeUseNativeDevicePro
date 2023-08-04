import { View, StyleSheet, ScrollView, Text } from "react-native";

import { useState } from "react";

import AuthenticationInput from "../components/Authentication/AuthenticationInput";

import MyButton from "../components/UI/MyButton";

import requestResetPassEmail from "../util/passResetEmail";

export default function ChangePassScreen() {
  const [emailForPassChange, setEmailForPassChange] = useState("");

  const [emailValid, setEmailValid] = useState(true);

  const changePassBtnHandler = () => {
    let emailRegex = new RegExp("^.+@.+.[a-z]{2,}$", "i");
    let emailIsValid = emailRegex.test(emailForPassChange.trim());

    if (!emailIsValid) {
        setEmailValid(false)
        return
    }
    // якщо валід то робимо запит до фаєрбейз
    // requestResetPassEmail()

  };

  return (
    <View>
      <ScrollView>
        <Text>Provide your email to receive password reset link</Text>
        <AuthenticationInput
          inpValue={emailForPassChange}
          onInputChange={setEmailForPassChange}
          label="Type your account's email"
          placeholder="Email"
          isInvalid={!emailValid}
          keyboardtype="email-address"
        />
        <MyButton onPress={changePassBtnHandler}>Send </MyButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
