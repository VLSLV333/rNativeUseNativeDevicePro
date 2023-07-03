import { useState, useEffect } from "react";

import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";

import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const [placeArr, setPlaceArr] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setPlaceArr(places);
    };

    if (isFocused) {
      loadPlaces();
      // setPlaceArr((state) => [...state, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList placesArr={placeArr} />;
}
