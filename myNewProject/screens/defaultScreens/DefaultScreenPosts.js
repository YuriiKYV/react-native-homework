import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const { nickName, email } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllComments();
    getAllLikes();
  }, [isPosts]);

  const addLike = async (id) => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("likes")
      .add({ id, nickName });
  };

  const getAllLikes = async () => {
    setAllLikes([]);
    await posts.map(async (post) => {
      await db
        .firestore()
        .collection("posts")
        .doc(post.id)
        .collection("likes")
        .onSnapshot((data) =>
          setAllLikes((prev) => [
            ...prev,
            { id: post.id, likes: data.docs.length },
          ])
        );
    });
  };

  const getLikesPost = (id) => {
    let count = 0;
    allLikes.map((like) => {
      if (like.id === id) {
        return (count = like.likes);
      }
    });

    return count;
  };

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) => {
        setPosts(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setIsPosts(true);
      });
  };

  const getAllComments = async () => {
    setAllComments([]);

    await posts.map(async (post) => {
      await db
        .firestore()
        .collection("posts")
        .doc(post.id)
        .collection("comments")
        .onSnapshot((data) =>
          setAllComments((prev) => [
            ...prev,
            { id: post.id, count: data.docs.length },
          ])
        );
    });
  };

  const getCommentsPost = (id) => {
    let count = 0;
    allComments.map((comment) => {
      if (comment.id === id) {
        count = comment.count;
      }
    });
    return count;
  };

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/noAvatar.jpg")}
        />
        <View>
          <Text style={styles.userName}>{nickName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
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
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("CommentsScreen", { item })}
              >
                <FontAwesome
                  name="comment-o"
                  size={24}
                  style={{
                    ...styles.commentIcon,
                  }}
                  color="#BDBDBD"
                />
                <Text style={styles.commentCount}>
                  {getCommentsPost(item.id)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                useState={true}
                style={{
                  ...styles.btnicon,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => addLike(item.id)}
              >
                <AntDesign
                  style={styles.likeIcon}
                  name="like2"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.commentCount}>
                  {isPosts ? getLikesPost(item.id) : 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.btnicon,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("MapScreen", { item })}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  style={styles.locationtIcon}
                />
                <Text style={styles.location}>{`${item.nameLocation}`}</Text>
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
    fontWeight: "700",
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
    flex: 1,
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
    alignItems: "center",
  },
  commentCount: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  commentIcon: {
    border: 1,
    borderColor: "#BDBDBD",
    marginRight: 10,
  },
  likeIcon: {
    marginRight: 10,
  },
  locationtIcon: {
    color: "#BDBDBD",
    marginRight: 4,
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});

export default DefaultScreenPosts;
