import { Text, Pressable, StyleSheet } from 'react-native';

import { Image } from 'expo-image';

import { Colors } from '../../constants/colors';

export default function ButtonWithLogo({
  txt,
  logo,
  onLoadEnd,
  onPress,
  btnContainer,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressedBtn,
        btnContainer,
      ]}
      onPress={onPress}
    >
      <Image source={logo} onLoadEnd={onLoadEnd} style={styles.image} />
      <Text style={styles.text}>{txt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: Colors.primary700,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 7,
    borderRadius: 7,
  },
  pressedBtn: {
    opacity: 0.7,
    backgroundColor: Colors.primary800,
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
});
