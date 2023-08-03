import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function LoadingOverlay({ txt }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>{txt}</Text>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    marginBottom: 20
  },
});
