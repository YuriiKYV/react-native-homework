import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
//Nav
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//ScrensBottom
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        showLabel: false,
        tabBarHideOnKeyboard: false,
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <AntDesign
                name="appstore-o"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerLeft: () => (
            <View style={styles.headerCreatePost}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#212121"
                onPress={() => navigation.navigate("Публикации")}
              />
            </View>
          ),
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
        name="Создать публикацию"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <Feather
                name="user"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCreatePost: {
    paddingLeft: 20,
  },
  headerCreatePostIcon: {},
});

export default HomeScreen;
