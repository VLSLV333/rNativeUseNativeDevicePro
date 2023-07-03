import { useState, useCallback } from "react";

import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

import MyButton from "../UI/MyButton";

import { Place } from "../../models/place";

import { Colors } from "../../constants/colors";

export default function PlaceForm({ placeHandler }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const titleInputHandler = (txt) => {
    setEnteredTitle(txt);
  };

  const imageChangeHandler = (imgUri) => {
    setImage(imgUri);
  };

  const locationChangeHandler = useCallback((loc) => {
    setLocation(loc);
  }, []);

  const savePlaceHandler = () => {
    const place = new Place(enteredTitle, image, location);
    placeHandler(place);
  };

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
          value={enteredTitle}
          onChangeText={titleInputHandler}
        />
      </View>
      <View>
        <ImagePicker onImageChange={imageChangeHandler} />
        <LocationPicker onLocationChange={locationChangeHandler} />
        <MyButton onPress={savePlaceHandler}>Add Place</MyButton>
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
    fontWeight: "bold",
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
