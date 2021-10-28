// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
// later use
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFIeKm2IMoIhFu8_a6ZV7jbUB0gbnS6ik",
  authDomain: "arche-echo-4b4bf.firebaseapp.com",
  projectId: "arche-echo-4b4bf",
  storageBucket: "arche-echo-4b4bf.appspot.com",
  messagingSenderId: "382032993333",
  appId: "1:382032993333:web:37bd499a42a3a60a3d257c",
  measurementId: "G-HRG3CLLH69"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
// const user = firebase.user()

export {firebase}

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);