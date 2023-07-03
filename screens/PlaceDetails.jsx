import { useEffect } from "react";

import { ScrollView, StyleSheet, Image, View, Text } from "react-native";

import OutlineButton from "../components/UI/OutlineButton";

import { Colors } from "../constants/colors";

export default function PlaceDetails({ route }) {
  const showOnMapHandler = () => {};

  const selectedPlaceId = route.params.placeId

  useEffect(()=> {

  }, [selectedPlaceId])

  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlineButton name="map" onPress={showOnMapHandler}>
          View on map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  //   rootContainer: {
  //     alignItems: "center",
  //   },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
