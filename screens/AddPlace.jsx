import PlaceForm from "../components/Places/PlaceForm";

import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  const placeHandler = async (place) => {
    try {
      // console.log(place)
      await insertPlace(place);
      navigation.navigate("AllPlaces");
    } catch (e) {
      // console.log(e)
    }
  };

  return <PlaceForm placeHandler={placeHandler} notSavedYet={true} />;
}
