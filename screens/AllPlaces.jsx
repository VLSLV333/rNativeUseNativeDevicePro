import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';

import { fetchPlaces } from '../util/database';

import getSecretMessage from '../util/testREquest';

import MyButton from '../components/UI/MyButton';

export default function AllPlaces() {
  const dispatch = useDispatch();

  const token = useSelector(state => state.authSlice.token)

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

  useEffect(() => {
    const getExpireTime = async () => {
      const expireTimeInMilSecondsString = await AsyncStorage.getItem(
        'expireTime'
      );

      if (expireTimeInMilSecondsString) {
        const timeNowInMiliseconds = new Date().getTime();
        const expireTimeInMilSeconds = Number(expireTimeInMilSecondsString);

        if (timeNowInMiliseconds >= expireTimeInMilSeconds) {
          dispatch(renewTokenAsync());
        } else {
          const newMilisecondsToExpire =
            expireTimeInMilSeconds - timeNowInMiliseconds;
          setTimeout(() => {
            dispatch(renewTokenAsync());
          }, newMilisecondsToExpire);
        }
      } else {
        const timeWhenTokenExpiresMiliseconds = new Date(
          new Date().getTime() + 57 * 60 * 1000
        )
          .getTime()
          .toString();

        AsyncStorage.setItem('expireTime', timeWhenTokenExpiresMiliseconds);
      }
    };

    getExpireTime();
  }, []);

  const btnHandler = () => {
    getSecretMessage(token)
  }

  return (
    <>
      <MyButton onPress={btnHandler}>
        request
      </MyButton>
      <PlacesList placesArr={placeArr} />
    </>
  );
}
