import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {LockedScreen, LoginScreen, UnlockedScreen} from '../Screens';
import {RootState} from '../Store';
import {navigationRef, RootStackParamList} from './utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigation = () => {
  const loggedInUser = useSelector((state: RootState) => state.uid);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {loggedInUser === null ? (
          // No user, ask to login
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Unlocked" component={UnlockedScreen} />
            <Stack.Screen name="Locked" component={LockedScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigation;
