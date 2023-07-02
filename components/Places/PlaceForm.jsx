import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

import { Colors } from '../../constants/colors';

export default function PlaceForm() {
  return (
    <ScrollView
      style={styles.form}
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={styles.formContainer}
    >
      <View>
        <Text style={styles.label}>Title </Text>
        <TextInput
          style={styles.input}
          placeholder="type in title for this place"
        />
      </View>
      <View>
        <ImagePicker />
        <LocationPicker />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
  },
  form: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 7,
  },
});
