import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { useColorScheme, StatusBar, } from 'react-native';
import { AppNavigator } from './src/navigation';


export default function App() {
  const scheme = useColorScheme();

  const isDark = scheme === 'dark';
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDark ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
