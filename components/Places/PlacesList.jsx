import { useNavigation } from "@react-navigation/native";

import { FlatList, View, Text, StyleSheet } from "react-native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ placesArr }) {
  const navigation = useNavigation();

  const placePressHandler = (id) => {
    navigation.navigate("PlaceDetails", { placeId: id });
  };

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
      style={styles.list}
      contentContainerStyle={{ marginBottom: 0 }}
      data={placesArr}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onPress={placePressHandler} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    // margin:13,
    // marginHorizontal: 12
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
