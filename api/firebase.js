import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
//   }

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