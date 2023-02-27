import React, { useCallback } from "react";
import { StyleSheet, View } from 'react-native';
import Registration from "./src/Screens/RegistrationScreen";
import Login from "./src/Screens/LoginScreen";


export default function App() {
  return (
    <View style={styles.container}>
      
      <Registration></Registration>

      {/* <Login></Login> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
