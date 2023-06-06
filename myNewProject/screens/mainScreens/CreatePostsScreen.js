import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";
import { FontAwesome, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

const initialState = {
  photo: "",
  location: "",
  title: "",
  nameLocation: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [state, setState] = useState(initialState);
  const [loadCamera, setLoadCamera] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const takePhoto = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const photo = await camera.takePictureAsync();
    setLoadCamera(true);

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setState((prevState) => ({ ...prevState, location, photo: photo.uri }));

    setImage(photo.uri);
    setLoadCamera(false);
  };

  const sendPost = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen", { state });

    setImage(null);
    setState(initialState);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const { location, title, nameLocation } = state;
    const createPost = await db.firestore().collection("posts").add({
      photo,
      title,
      location: location.coords,
      nameLocation,
      userId,
      nickName,
    });
  };

  const setInput = () => {
    setIsShowKeyboard(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginTop: isShowKeyboard ? -60 : 0 }}
      >
        <View style={styles.containerCamera}>
          {image ? (
            <View style={styles.containerPhoto}>
              <Image style={styles.photo} source={{ uri: image }} />
              <View style={styles.icon}>
                <FontAwesome
                  name="camera"
                  size={24}
                  color={image ? "#FFFFFF" : "#BDBDBD"}
                />
              </View>
            </View>
          ) : (
            <Camera style={styles.camera} ref={setCamera}>
              {loadCamera ? (
                <ActivityIndicator size="large" color="#FF6C00" />
              ) : (
                <TouchableOpacity onPress={takePhoto} style={styles.btnCamera}>
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              )}
            </Camera>
          )}
        </View>
        <Text style={styles.cameraDescription}>
          {image ? "Редактировать фото" : "Загрузите фото"}
        </Text>
        <TextInput
          style={{
            ...styles.input,
            marginBottom: 16,
          }}
          onFocus={() => setInput()}
          placeholder="Название"
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, title: value }))
          }
          value={state.title}
        />
        <View
          style={{
            ...styles.containerInput,
          }}
        >
          <TextInput
            style={{
              ...styles.input,
              paddingLeft: 28,
            }}
            onFocus={() => setInput()}
            placeholder="Местность..."
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, nameLocation: value }))
            }
            value={state.nameLocation}
          />
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            size={24}
            color="#BDBDBD"
          />
        </View>
        <TouchableOpacity style={styles.btnPost} onPress={sendPost}>
          <Text style={styles.btnDescription}>Опубликовать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
  },
  containerCamera: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cameraDescription: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  btnCamera: {
    backgroundColor: "rgba(255, 255, 255, 0.3);",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  containerPhoto: {
    width: "100%",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3);",
  },
  btnPost: {
    width: "100%",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: "auto",
  },
  input: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    borderStartColor: "none",
    borderWidth: 0,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  containerInput: {
    marginBottom: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 12,
  },
  btnDescription: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  deleteBtn: {
    width: 70,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    marginBottom: 22,
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
