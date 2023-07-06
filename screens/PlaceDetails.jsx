import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import OutlineButton from "../components/UI/OutlineButton";

import { fetchPlaceDetails } from "../util/database";

import { Colors } from "../constants/colors";

export default function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState(null);

  const showOnMapHandler = () => {
    navigation.navigate(
      "MapPicker",
      (previoslyPickedLocation = {
        lat: place.location.lat,
        lng: place.location.lng,
      })
    );
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const placeFromBD = await fetchPlaceDetails(selectedPlaceId);
      setPlace(placeFromBD);
      navigation.setOptions({ title: `${placeFromBD.title}` });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!place) {
    return <ActivityIndicator size={"large"} style={styles.indicate} />;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ url: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineButton name="map" onPress={showOnMapHandler}>
          View on map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  indicate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
