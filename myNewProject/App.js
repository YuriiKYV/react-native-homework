import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
//Screens
import Registration from "./screens/auth/RegistrationScreen";
import Login from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/mainScreens/Home";

//Fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//Navigation

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export default function App() {
  // const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
