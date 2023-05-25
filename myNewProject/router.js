import React from "react";

//Screens
import Registration from "./screens/auth/RegistrationScreen";
import Login from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/mainScreens/Home";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </MainStack.Navigator>
  );
};
