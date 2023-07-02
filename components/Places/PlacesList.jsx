import { FlatList, View, Text, StyleSheet } from 'react-native';

import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';

export default function PlacesList({ placesArr }) {
  if (!placesArr || placesArr.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet. Please, add some:)
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={placesArr}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
