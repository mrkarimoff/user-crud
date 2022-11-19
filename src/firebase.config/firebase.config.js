import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDPJNTsdj_LI8MgYh_l2u0NM9cR7_MlvE",
  authDomain: "practice-42888.firebaseapp.com",
  projectId: "practice-42888",
  storageBucket: "practice-42888.appspot.com",
  messagingSenderId: "934978089637",
  appId: "1:934978089637:web:0b72c53cdb82f7c6b8134c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
