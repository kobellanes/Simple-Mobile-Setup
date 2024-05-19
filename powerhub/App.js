import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetStarted from './assets/components/GetStarted/GetStarted';
import SetupWifi from './assets/components/SetupWifi/SetupWifi';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const getInitialRoute = async () => {
      const lastScreen = await AsyncStorage.getItem('lastScreen');
      setInitialRoute(lastScreen || 'Home');
    };
    getInitialRoute();
  }, []);

  const handleStateChange = async (state) => {
    const currentRoute = state.routes[state.index].name;
    await AsyncStorage.setItem('lastScreen', currentRoute);
  };

  if (!initialRoute) {
    return null; // or a loading spinner
  }
  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="SetupWifi" component={SetupWifi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}