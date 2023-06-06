import React, { useState, useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import {
  SimpleLineIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  useEffect(() => {
    getAllComments();
    getAllLikes();
  }, [isPosts]);

  const launchGallery = () => {
    console.log("Добавити фото");
    // const options = {
    //   selectionLimit: 1,
    //   mediaType: "photo",
    //   includeBase64: false,
    // };
    // launchImageLibrary(options, (response) => {
    //   console.log("Response = ", response);
    // });
  };

  const getUserPosts = async () => {
    db.firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsPosts(true);
      });
  };

  const getAllComments = async () => {
    setAllComments([]);
    await userPosts.map(async (post) => {
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
    await userPosts.map(async (post) => {
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

  return (
    <ImageBackground
      style={styles.image}
      source={require("../../assets/images/photoBG.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/noAvatar.jpg")}
              width={120}
              height={120}
            />
            <TouchableOpacity style={styles.addAvatar} onPress={launchGallery}>
              <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          <Text>{`${nickName}`}</Text>
          <TouchableOpacity style={styles.btnOut}>
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => dispatch(authSignOutUser())}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
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
                  onPress={() =>
                    navigation.navigate("CommentsScreen", { item })
                  }
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 148,
  },
  container: {
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
  avatarContainer: {
    marginTop: -60,
    marginBottom: 32,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    right: -4,
    top: 81,
  },
  btnicon: {
    marginBottom: 25,
    alignItems: "center",
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
  btnOut: {
    position: "absolute",
    top: 81,
    right: 0,
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
    color: "#BDBDBD",
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

export default ProfileScreen;
