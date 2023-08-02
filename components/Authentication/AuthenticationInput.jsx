import { View, StyleSheet, TextInput, Text } from 'react-native';

import { Colors } from '../../constants/colors';

export default function AuthenticationInput({
  label,
  keyboardtype,
  secure,
  onInputChange,
  inpValue,
  placeholder,
  isInvalid,
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isInvalid ? styles.textInvalid : {}]}>
        {label}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType={keyboardtype}
        secureTextEntry={secure}
        onChangeText={(e) => onInputChange(e)}
        value={inpValue}
        placeholder={placeholder}
        placeholderTextColor='#c4c4c4'
        style={[styles.input, isInvalid ? styles.inputInvalid : {}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  text: {
    color: '#fff',
    // marginBottom: 10,
    marginVertical: 10,
    fontSize: 22
  },
  textInvalid: {
    color: Colors.error300,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
    color: '#fff',
    borderRadius: 5
  },
  inputInvalid: {
    borderColor: Colors.error300,
  },
});
