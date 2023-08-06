import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';

import LoginScreen from './screens/LoginScreen';
import ChangePassScreen from './screens/ChangePassScreen';
import SignUpScreen from './screens/SignUpScreen';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { authenticate, logOut } from './store/authSlice';

import IconButton from './components/UI/IconButton';

import { init } from './util/database';

import { Colors } from './constants/colors';

const Stack = createNativeStackNavigator();

function AuthenticateStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          component={LoginScreen}
          name="LoginScreen"
          options={() => ({ title: 'Login' })}
        />
        <Stack.Screen
          component={SignUpScreen}
          name="SignUpScreen"
          options={() => ({ title: 'Sign Up' })}
        />
        <Stack.Screen
          component={ChangePassScreen}
          name="ChangePassScreen"
          options={() => ({ title: 'Change Password' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function IsAuthenticatedStack() {
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <IconButton
                name="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate('AddPlace')}
              />
            ),
            title: 'Your Favorite Places',
            headerLeft: ({ tintColor }) => (
              <IconButton
                name="exit"
                color={tintColor}
                size={24}
                onPress={() => dispatch(logOut())}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{ title: 'Add a new Place' }}
        />
        <Stack.Screen component={Map} name="MapPicker" />
        <Stack.Screen
          component={PlaceDetails}
          name="PlaceDetails"
          options={{ title: 'Loading place...' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() {
  const loggedIn = useSelector((state) => state.authSlice.isAuthenticated);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeDataBaze = async () => {
      await init();
    };

    const lookForToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(authenticate({ token }));
      }
    };

    try {
      initializeDataBaze();
      lookForToken();
    } catch (e) {}

    setLoading(false);
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      {!loggedIn && <AuthenticateStack />}
      {loggedIn && <IsAuthenticatedStack />}
    </>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
