import React, { useState, useCallback } from "react";
import { AntDesign } from '@expo/vector-icons';
import {
  ImageBackground,
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: '',
  email: '',
  password: '',
}

const Registration = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputLogin, setIsInputLogin] = useState(false);
  const [isInputEmail, setIsInputEmail] = useState(false);
  const [isInputPassword, setIsInputPassword] = useState(false);
  const [showSecureText, setShowSecureText] = useState(true);
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  const setInput = (el) => {
    setIsShowKeyboard(true)
    switch (el) {
      case "login":
        setIsInputLogin(true)
        break;
      case "email":
        setIsInputEmail(true)
        break;
      case "password":
        setIsInputPassword(true)
        break;
      default:
        break;
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  const submitForm = () => {
    setState(initialState);
    console.log(state);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/photoBG.jpg")}
        onLayout={onLayoutRootView}>
      
        <KeyboardAvoidingView style={styles.registerContainer} behavior={Platform.OS == "ios" ? "padding" : "height"}  >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 43 }} >
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={require("../assets/images/noAvatar.jpg")} />
                <TouchableOpacity style={styles.addAvatar}><AntDesign name="pluscircleo" size={24} color="#FF6C00" /></TouchableOpacity>
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <TextInput
                style={{ ...styles.input, borderColor: isInputLogin ? "#FF6C00" : "#E8E8E8" }}
                placeholder="Логин"
                onFocus={() => setInput("login")}
                onBlur={() => setIsInputLogin(false)}
                onChangeText={(value) => setState((prevState) => ({ ...prevState, login: value }))}
                value={state.login}
              />
              <TextInput
                style={{ ...styles.input, borderColor: isInputEmail ? "#FF6C00" : "#E8E8E8" }}
                placeholder="Адрес электронной почты"
                onFocus={() => setInput("email")}
                onBlur={() => setIsInputEmail(false)}
                onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
                value={state.email}
              />
              <View style={styles.inputPasswordContainer}>
                <TextInput
                  style={{ ...styles.input, borderColor: isInputPassword ? "#FF6C00" : "#E8E8E8" }}
                  placeholder="Пароль"
                  secureTextEntry={showSecureText}
                  onFocus={() => setInput("password")}
                  onBlur={() => setIsInputPassword(false)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                  value={state.password}
                />
                <Text style={styles.textPassword}
                  onPress={() => showSecureText ? setShowSecureText(false) : setShowSecureText(true)}>
                  {showSecureText ? 'Показать' : `Скрыть`}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      
        <View style={styles.footerContainer} >
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={submitForm}
          >
            <Text style={styles.btnTitle}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <Text style={styles.linkLogin}>Уже есть аккаунт? Войти</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  registerContainer: {
    paddingRight: 16,
    paddingLeft: 16,
    
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    alignItems: "center",
    paddingBottom: 78,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    color: "#212121",
    fontSize: 30,
    marginBottom: 32,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 16,
    justifyContent: "center",
    width: "100%",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
  },
  inputPasswordContainer: {
    width: "100%",
    position: "relative",
  },
  textPassword: {
    fontFamily: 'Roboto-Regular',
    color: "#1B4371",
    fontSize: 16,
    position: "absolute",
    right: 16,
    top: 16,
  },
  avatarContainer: {
    marginTop: -60,
    marginBottom: 32,
  },
  avatar: {
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    right: -12,
    top: 81,
  },
  footerContainer: {
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 66,
  },
  btn: {
    width: "100%",
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: "#FFFFFF",
  },
  linkLogin: {
    fontFamily: 'Roboto-Regular',
  }
});

export default Registration;