import { GET_USER, GET_USER_SUCCEEDED } from "../constants/constants";
import { takeEvery, call, put } from "redux-saga/effects";
import { collection, getDocs } from "firebase/firestore";
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

function* userSaga() {
  yield takeEvery(GET_USER, workGetUser);
}

export default userSaga;
