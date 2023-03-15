import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params.state]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/noAvatar.jpg")}
        />
        <View>
          <Text style={styles.userName}>Yurii Kukharuk</Text>
          <Text style={styles.userEmail}>test@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            <Image style={styles.imgPosts} source={{ uri: item.photo }} />
            <Text style={styles.titlePost}>{item.title}</Text>
            <View style={styles.descriptionPost}>
              <TouchableOpacity
                style={{
                  ...styles.btnicon,
                  flexDirection: "row",
                }}
                onPress={() => navigation.navigate("CommentsScreen", { item })}
              >
                <EvilIcons
                  name="comment"
                  size={24}
                  style={styles.commentIcon}
                />
                <Text style={styles.commentCount}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.btnicon,
                  flexDirection: "row",
                }}
                onPress={() => navigation.navigate("MapScreen", { item })}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  style={styles.locationtIcon}
                />
                <Text style={styles.location}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnicon: {
    marginBottom: 25,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Black",
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 14,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",

    fontSize: 10,
    lineHeight: 12,
  },
  imgPosts: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  titlePost: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
  },
  descriptionPost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentCount: {
    color: "#BDBDBD",
  },
  commentIcon: {
    color: "#BDBDBD",
    marginRight: 6,
  },
  locationtIcon: {
    color: "#BDBDBD",
    marginRight: 4,
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default DefaultScreenPosts;
