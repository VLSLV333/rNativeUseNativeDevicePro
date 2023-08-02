import { View, Text, StyleSheet } from 'react-native';

import MyButton from '../components/UI/MyButton';

export default function ErrorScreen({ txt }) {
  return (
    <View>
      <Text>Sorry!</Text>
      <Text>{txt}</Text>
      <MyButton>
        <Text>Close</Text>
      </MyButton>
    </View>
  );
}

const styles = StyleSheet.create({});
