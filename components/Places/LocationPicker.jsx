import { useState } from 'react';

import { StyleSheet, Dimensions, View, Alert, Image, Text } from 'react-native';
import OutlineButton from '../UI/OutlineButton';

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import { Colors } from '../../constants/colors';
import getMapPreview from '../../util/location';

const windowDimensions = Dimensions.get('window');

const paddingHorizontalOfFOrm = 48;
// making it equal to width
const heightForMap = windowDimensions.width - paddingHorizontalOfFOrm;

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState(null);

  const [locationPersmisionInformation, requestPermision] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPersmisionInformation.canAskAgain) {
      const permissionResponse = await requestPermision();
      return permissionResponse.granted;
    }

    if (
      locationPersmisionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermision();
      return permissionResponse.granted;
    }

    if (locationPersmisionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Need location access for adding to your favorite place!',
        'Go to your phone settings -> Privacy -> Location Services -> Allow for this app:)'
      );
      return false;
    }

    return true;
  };

  const getLocationHanlder = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });


  };

  function pickOnMapHanlder() {}

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    
    locationPreview = (
      <Image
      
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.buttonsContainer}>
        <OutlineButton name="location" onPress={getLocationHanlder}>
          Use my location
        </OutlineButton>
        <OutlineButton name="map" onPress={pickOnMapHanlder}>
          Pick on map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: heightForMap,
    marginVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 7,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
