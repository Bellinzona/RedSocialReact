// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage,ref,uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBieqZKGHKggAH-xjP9tZAmTzW4gjr-OxU",
  authDomain: "redsocialprueba-68e80.firebaseapp.com",
  projectId: "redsocialprueba-68e80",
  storageBucket: "redsocialprueba-68e80.appspot.com",
  messagingSenderId: "737220040325",
  appId: "1:737220040325:web:fbe99982e9094955917bec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)