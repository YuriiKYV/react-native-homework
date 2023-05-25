import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [isInput, setIsInput] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { id, photo } = route.params.item;
  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    allComments.sort(compareNumbers);
  }, [allComments]);

  const createComments = async () => {
    db.firestore()
      .collection("posts")
      .doc(id)
      .collection("comments")
      .add({ comment, nickName, data: new Date() });
    setIsInput(false);
    Keyboard.dismiss();
    setComment("");
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(allComments);
      });
  };

  function compareNumbers(a, b) {
    return a.data.seconds - b.data.seconds;
  }

  const test = (el) => {
    const year = el.toDate().getFullYear();
    const date = el.toDate().getDate();
    const numberMonth = el.toDate().getMonth();
    const time = el
      .toDate()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const monthNumbers = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const month = monthNumbers[numberMonth];

    return `${date} ${month}, ${year} | ${time}`;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imgPosts} source={{ uri: photo }} />
      <SafeAreaView style={styles.commentWrapper}>
        <FlatList
          Date={allComments.data}
          data={allComments}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View>
              {item.nickName === nickName ? (
                <View
                  style={{
                    ...styles.wrapperMessage,
                  }}
                >
                  <View
                    style={{
                      ...styles.messageDescription,
                      marginRight: 16,
                    }}
                  >
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text
                      style={{
                        ...styles.date,
                      }}
                    >
                      {test(item.data)}
                    </Text>
                  </View>
                  <FontAwesome
                    style={styles.iconMessageUser}
                    name="circle"
                    size={28}
                    color="#FF6C00"
                  />
                </View>
              ) : (
                <View style={styles.wrapperMessage}>
                  <AntDesign
                    style={{
                      ...styles.iconMessageUser,
                      marginRight: 16,
                    }}
                    name="user"
                    size={24}
                    color="#FF6C00"
                  />
                  <View
                    style={{
                      ...styles.messageDescription,
                    }}
                  >
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text
                      style={{
                        ...styles.date,
                        marginLeft: "auto",
                      }}
                    >
                      {test(item.data)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={{ ...styles.input, marginBottom: isInput ? 100 : 0 }}
          placeholder="Комментировать..."
          onChangeText={setComment}
          onFocus={() => setIsInput(true)}
          onBlur={() => setIsInput(false)}
          value={comment}
        />
        <TouchableOpacity style={styles.btnPut} onPress={createComments}>
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  imgPosts: {
    flex: 1,
    height: 200,
    marginBottom: 32,
    borderRadius: 8,
  },
  commentWrapper: {
    flex: 1,
    marginBottom: 32,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  wrapperMessage: {
    flexDirection: "row",
    marginBottom: 24,
  },
  comment: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
  },
  messageDescription: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    marginTop: "auto",
  },
  input: {
    fontFamily: "Roboto-Regular",
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    minHeight: 50,
    borderRadius: 100,
  },
  btnPut: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
