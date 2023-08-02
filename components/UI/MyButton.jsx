import { StyleSheet, Pressable, Text } from 'react-native';

import { Colors } from '../../constants/colors';

export default function MyButton({ children, onPress, containerStyles }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        containerStyles,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    margin: 4,
    backgroundColor: Colors.primary700,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 7,
    borderRadius: 7,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.primary800,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
});
