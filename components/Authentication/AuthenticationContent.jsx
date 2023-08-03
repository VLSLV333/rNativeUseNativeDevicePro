import { View, StyleSheet, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AuthenticationForm from "./AuthenticationForm";

import FlatButton from "../UI/FlatButton";

export default function AuthenticationContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const flatBtnHandler = () => {
    if (isLogin) {
      navigation.replace("SignUpScreen");
    } else {
      navigation.replace("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <AuthenticationForm onAuthenticate={onAuthenticate} isLogin={isLogin} />
        <View style={styles.flatBtnContainer}>
          <FlatButton
            onPress={flatBtnHandler}
            textStyles={styles.flatBtnTextStyle}
          >
            {isLogin ? "Create new user" : "Log in instead"}
          </FlatButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatBtnContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  flatBtnTextStyle: {
    color: "#fff",
    fontSize: 13,
  },
});
