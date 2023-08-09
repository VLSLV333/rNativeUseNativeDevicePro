import { useEffect, useState, useLayoutEffect } from 'react';

import IconButton from '../components/UI/IconButton';

import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';

import OutlineButton from '../components/UI/OutlineButton';

import { fetchPlaceDetails, deletePlace } from '../util/database';

import { Colors } from '../constants/colors';

export default function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState(null);

  const showOnMapHandler = () => {
    navigation.navigate(
      'MapPicker',
      (previoslyPickedLocation = {
        pickedLocation: { lat: place.location.lat, lng: place.location.lng },
      })
    );
  };

  const selectedPlaceId = route.params.placeId;

  const deletePlaceHandler = async () => {
    try {
      await deletePlace(selectedPlaceId);
    } catch (e) {
      Alert.alert('Ooops:)', 'Please, try again later');
    }
    navigation.replace('AllPlaces');
  };

  useEffect(() => {
    async function loadPlaceData() {
      const placeFromBD = await fetchPlaceDetails(selectedPlaceId);
      setPlace(placeFromBD);
      navigation.setOptions({ title: `${placeFromBD.title}` });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          size={24}
          name={'trash'}
          onPress={deletePlaceHandler}
        />
      ),
    });
  }, []);

  if (!place) {
    return <ActivityIndicator size={'large'} style={styles.indicate} />;
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
