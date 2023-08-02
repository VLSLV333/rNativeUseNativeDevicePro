import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function LoadingOverlay({ txt }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>{txt}</Text>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  text: {
    color: 'black',
  },
});
