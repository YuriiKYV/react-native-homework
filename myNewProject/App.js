import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import db from "./firebase/config";

//Fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";
import Main from "./components/Main";

export default function App() {
  const [user, setUser] = useState(null);
  db.auth().onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
