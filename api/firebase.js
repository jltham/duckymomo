import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//import config from '../config';

var firebaseConfig = {
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

// const db = firebase.firestore(firebaseApp);

// export const transactionsRef = db.collection('transactions');

// console.log('\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n');

// transactionsRef.doc('1').get().then(documentSnapshot => {
//   let data = documentSnapshot.data();
//   console.log(`Retrieved data: ${JSON.stringify(data.title)}`);
// }, err => {
//   console.log(`Encountered error: ${err}`);
// })

// transactionsRef.add({foo: 'bar'}).then(documentReference => {
//   console.log(`Added document with name: ${documentReference.id}`);
// });

export default firebaseApp;