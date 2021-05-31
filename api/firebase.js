import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import {
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGING_SENDER_ID,
//     APP_ID,
//     MEASUREMENT_ID
// } from ".env";

// const firebaseConfig = {
//     apiKey: API_KEY,
//     authDomain: AUTH_DOMAIN,
//     databaseURL: DATABASE_URL,
//     projectId: PROJECT_ID,
//     storageBucket: STORAGE_BUCKET,
//     messagingSenderId: MESSAGING_SENDER_ID,
//     appId: APP_ID,
//     measurementId: MEASUREMENT_ID
// }

const firebaseConfig = {
    apiKey: "AIzaSyD9QrtDtHJLoZiDWg819XaQTkvM02K30oU",
    authDomain: "duckymomo-dc56c.firebaseapp.com",
    databaseURL: "https://duckymomo-dc56c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "duckymomo-dc56c",
    storageBucket: "duckymomo-dc56c.appspot.com",
    messagingSenderId: "619208254780",
    appId: "1:619208254780:web:912743f3157aed2b916a39",
    measurementId: "G-K6E7DKYCC9"
  };

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;