import {
  GET_USER,
  GET_USER_SUCCEEDED,
  POST_USER,
  DELETE_USER,
} from "../constants/constants";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config/firebase.config";

const getUsers = async () => {
  let arr = [];
  const colRef = collection(db, "users");
  const snapshot = await getDocs(colRef);
  snapshot.forEach((doc) => {
    arr.push({ key: doc.id, ...doc.data() });
  });
  return arr;
};

function* workGetUser() {
  const users = yield call(getUsers);
  yield put({ type: GET_USER_SUCCEEDED, payload: users });
}

function* workPostUser({ payload }) {
  if (payload.key) {
    const docRef = doc(db, "users", payload.key);
    updateDoc(docRef, payload);
  } else {
    const colRef = collection(db, "users");
    addDoc(colRef, payload);
  }

  yield call(workGetUser);
}

function* workDeleteUser({ payload }) {
  const docRef = doc(db, "users/" + payload);
  deleteDoc(docRef);
  yield call(workGetUser);
}

function* userSaga() {
  yield takeEvery(GET_USER, workGetUser);
  yield takeEvery(POST_USER, workPostUser);
  yield takeEvery(DELETE_USER, workDeleteUser);
}

export default userSaga;
