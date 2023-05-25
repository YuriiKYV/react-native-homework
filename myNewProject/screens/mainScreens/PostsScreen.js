import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../defaultScreens/DefaultScreenPosts";
import CommentsScreen from "../defaultScreens/CommentsScreen";
import MapScreen from "../defaultScreens/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerTitle: "Публикации",
          headerLeft: false,
          headerRight: () => (
            <TouchableOpacity style={styles.btnLogout}>
              <MaterialIcons
                name="logout"
                size={24}
                color="#BDBDBD"
                onPress={() => dispatch(authSignOutUser())}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: "Комментарии",
          headerLeft: () => (
            <View style={styles.headerCreatePost}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#212121"
                onPress={() => navigation.navigate("DefaultScreen")}
              />
            </View>
          ),
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: "Геолокация",
          headerLeft: () => (
            <View style={styles.headerCreatePost}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#212121"
                onPress={() => navigation.navigate("DefaultScreen")}
              />
            </View>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  headerCreatePost: {
    paddingLeft: 20,
  },
  btnLogout: {
    marginRight: 16,
  },
});
