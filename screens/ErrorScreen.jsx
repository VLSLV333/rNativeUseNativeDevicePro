import { useDispatch } from "react-redux";

import { View, Text, StyleSheet } from "react-native";

import MyButton from "../components/UI/MyButton";

import { clearErrorMessage } from "../store/errorSlice";

export default function ErrorScreen({ txt }) {
  const dispatch = useDispatch();

  const btnHandler = () => {
    dispatch(clearErrorMessage());
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.wholeTextContainer}>
        <Text style={styles.headingText}>Sorry :)</Text>
        <Text style={styles.messageText}>{txt}</Text>
      </View>
      <View style={styles.btnContainer}>
        <MyButton onPress={btnHandler} containerStyles={styles.btnStyle}>
          <Text>Close</Text>
        </MyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wholeTextContainer:{
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  headingText: {
    color: "#fff",
    marginBottom: 30,
    fontSize: 30,
  },
  messageText: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 25
  },
  btnContainer: {
    alignItems: "center",
    flex: 8
  },
  btnStyle: {
    width: 100,
  },
});
