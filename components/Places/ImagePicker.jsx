import { useState } from "react";

import { StyleSheet, View, Alert, Image, Text, Dimensions } from "react-native";

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import OutlineButton from "../UI/OutlineButton";

import { Colors } from "../../constants/colors";

const windowDimensions = Dimensions.get("window");

const paddingHorizontalOfFOrm = 48;
// making it equal to width
const heightForPhoto = windowDimensions.width - paddingHorizontalOfFOrm;

export default function ImagePicker({ onImageChange }) {
  const [imageUri, setImageUri] = useState(null);

  const [cameraPermissionInformation, requestPermision] =
    useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInformation.canAskAgain) {
      const permissionResponse = await requestPermision();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermision();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Need camera access to add photo of your favorite place!",
        "Go to your phone settings -> Privacy -> Camera -> Allow for this app:)"
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
      setImageUri(image.assets[0].uri);
      onImageChange(image.assets[0].uri)
    } catch (e) {}
  };

  let imagePreview = <Text>No image picked yet</Text>;

  if (imageUri) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton name="camera" onPress={takeImageHandler}>
        Take image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: heightForPhoto,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 7,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
});
