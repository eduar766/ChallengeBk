import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
// import { DetailScreen } from '../screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { birdId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Aves de Chile' }} />
      {/* <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle del Ave' }} /> */}
    </Stack.Navigator>
  );
};
