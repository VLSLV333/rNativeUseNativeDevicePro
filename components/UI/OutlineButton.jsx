import { Pressable, StyleSheet, Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../../constants/colors';

export default function OutlineButton({ name, onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={name}
        size={18}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 7
  },
  pressed: {
    opacity: 0.7,
    borderColor: Colors.primary700,
  },
  icon: {
    marginRight: 7,
  },
  text: {
    color: Colors.primary500,
  },
});
