import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBzZkP_IJpLGw4oEcN7ZWVRKAZxEDo7jaQ",
  authDomain: "goit-reactneative.firebaseapp.com",
  databaseURL: "http://goit-reactneative.firebaseapp.com",
  projectId: "goit-reactneative",
  storageBucket: "goit-reactneative.appspot.com",
  messagingSenderId: "137058294186",
  appId: "47c895cdd26732fe32ae3e8a1ceb861045028f36",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
