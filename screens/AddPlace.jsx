import PlaceForm from "../components/Places/PlaceForm";

import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  const placeHandler = async (place) => {
    try {
      await insertPlace(place);
      navigation.navigate("AllPlaces");
    } catch (e) {}
  };

  return <PlaceForm placeHandler={placeHandler} />;
}
