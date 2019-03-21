import { GET_TASKS, ADD_TASK, CHANGE_STATE, DELETE_TASK } from "./types";
import firebase from "firebase";
import config from "../config";

firebase.initializeApp(config);

export const getTasks = userId => dispatch => {
  let tasks = [];

  let query = firebase
    .firestore()
    .collection("tasks")
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc");

  query.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (!(change.type === "removed" || change.type === "modified")) {
        let task = { ...change.doc.data(), id: change.doc.id };
        tasks.push(task);
      }
    });

    dispatch({
      type: GET_TASKS,
      payload: tasks
    });
  });
};

export const addTask = task => async dispatch => {
  await firebase
    .firestore()
    .collection("tasks")
    .add({
      userId: firebase.auth().currentUser.uid,
      title: task.title,
      body: "",
      timestamp: new Date(),
      state: task.state
    })
    .then(res => {
      dispatch({
        type: ADD_TASK,
        payload: res.id
      });
    });
};

export const deleteTask = taskId => async dispatch => {
  await firebase
    .firestore()
    .collection("tasks")
    .doc(taskId)
    .delete()
    .then(() => {
      dispatch({ type: DELETE_TASK, payload: taskId });
    });
};

export const changeState = task => async dispatch => {
  await firebase
    .firestore()
    .collection("tasks")
    .doc(task.id)
    .update({ state: task.state })
    .then(() => {
      dispatch({
        type: CHANGE_STATE,
        payload: task.id
      });
    });
};
