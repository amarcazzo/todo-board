import { LOG_IN, LOG_OUT, AUTH_INIT } from "./types";
import firebase from "firebase/firebase";
import config from "../config";

firebase.initializeApp(config);

export const logIn = () => async dispatch => {
  let provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);

  const currentUser = await firebase.auth().currentUser;

  const user = {
    name: currentUser.displayName,
    email: currentUser.email,
    picture: currentUser.photoURL,
    id: currentUser.uid,
    isLoggedIn: true
  };

  dispatch({
    type: LOG_IN,
    payload: { ...user }
  });
};

export const logOut = () => async dispatch => {
  await firebase.auth().signOut();

  dispatch({
    type: LOG_OUT,
    payload: { id: "", name: "", email: "", picture: "", isLoggedIn: false }
  });
};

export const authInit = () => async dispatch => {
  await firebase.auth().onAuthStateChanged(currentUser => {
    let user = {
      name: currentUser.displayName,
      email: currentUser.email,
      picture: currentUser.photoURL,
      id: currentUser.uid,
      isLoggedIn: true
    };

    dispatch({
      type: AUTH_INIT,
      payload: { ...user }
    });
  });
};
