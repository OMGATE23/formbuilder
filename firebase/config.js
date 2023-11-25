// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider , getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCtea2K4iVgiRlYzoDn2KoFrDbkfPdtZWk",
  authDomain: "formbuilder-b3919.firebaseapp.com",
  projectId: "formbuilder-b3919",
  storageBucket: "formbuilder-b3919.appspot.com",
  messagingSenderId: "1076138703898",
  appId: "1:1076138703898:web:19c21018a14a1f6ccc65a3",
  measurementId: "G-VL23MNE120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export {auth  , db , provider}