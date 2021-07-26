import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from '../config';

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID
}

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