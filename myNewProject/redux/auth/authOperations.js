import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        displayName: login,
      });
      const { displayName, uid } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
      console.log(user);
    } catch (error) {
      console.log("error", error.code);
      console.log("errore message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      console.log(user);
    } catch (error) {
      console.log("error", error.code);
      console.log("errore message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db
    .auth()
    .signOut()
    .then(
      function () {
        dispatch(authSignOut());
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
