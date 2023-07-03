import { Image, View, Text, Pressable, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

export default function PlaceItem({ place, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(place.id)}
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 7,
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 7,
    borderRadius: 7,
    height: 110,
  },
  pressed: {
    opacity: 0.85,
    backgroundColor: Colors.primary700,
  },
  image: {
    flex: 2,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    height: "100%",
  },
  info: {
    flex: 3,
    padding: 12,
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
    paddingBottom: 17,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
