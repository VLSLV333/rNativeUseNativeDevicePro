// component button that has no bg

import { StyleSheet, Pressable, View, Text } from 'react-native';

export default function FlatButton({ children, onPress, textStyles }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={textStyles}>{children}</Text>
    </Pressable>
  );
}

// const styles = StyleSheet.create({
//     container:{}
// })
