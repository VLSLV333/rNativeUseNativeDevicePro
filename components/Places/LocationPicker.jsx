import { StyleSheet, Dimensions, View } from 'react-native';
import OutlineButton from '../UI/OutlineButton';

import { Colors } from '../../constants/colors';

const windowDimensions = Dimensions.get('window');

const paddingHorizontalOfFOrm = 48;
// making it equal to width
const heightForMap = windowDimensions.width - paddingHorizontalOfFOrm;

export default function LocationPicker() {
  function getLocationHanlder() {}

  function pickOnMapHanlder() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
});
