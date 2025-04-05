import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { AppNavigator } from './src/navigation';

export default function App() {
  const scheme = useColorScheme();

  const paperTheme = scheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const navTheme = scheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
