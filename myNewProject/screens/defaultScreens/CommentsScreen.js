import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CommentsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgPosts}
        source={{ uri: route.params.item.photo }}
      />
      <Text>Comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imgPosts: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default CommentsScreen;
