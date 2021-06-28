import firebase from "./firebase";

const db = firebase.database();

export const get = ({id}) => {
    const userCollectionRef = db.collection('transactions');
    console.log("This is user collection " + userCollectionRef);
    return userCollectionRef.doc(id);
}