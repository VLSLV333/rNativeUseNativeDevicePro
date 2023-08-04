import { useState, useLayoutEffect, useCallback, useEffect } from "react";

import { StyleSheet, Alert } from "react-native";

import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

export default function Map({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 50.425,
    longitude: 30.535,
    latitudeDelta: 0.10,
    longitudeDelta: 0.10,
  });

  const previoslyPickedLocation = route?.params;

  useEffect(() => {
    if (previoslyPickedLocation?.lat) {
      setInitialRegion((state) => ({
        ...state,
        latitude: previoslyPickedLocation.lat,
        longitude: previoslyPickedLocation.lng,
      }));
      setSelectedLocation({
        lat: previoslyPickedLocation.lat,
        lng: previoslyPickedLocation.lng,
      });
    }
  }, [previoslyPickedLocation]);

  const selectLocationHandler = (event) => {
    if (previoslyPickedLocation){
      return
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "Please, tap on map to pick location:)"
      );
      return;
    }
    navigation.navigate("AddPlace", { loc: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!previoslyPickedLocation?.lat) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            onPress={savePickedLocationHandler}
            color={tintColor}
            name="save"
            size={24}
          />
        ),
      });
    }
  }, [navigation, savePickedLocationHandler, previoslyPickedLocation]);

  return (
    <MapView
      region={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      <Marker
        title="Picked Location"
        coordinate={{
          latitude: selectedLocation?.lat,
          longitude: selectedLocation?.lng,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
