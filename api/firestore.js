import firebaseApp from "./firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const transactionsRef = db.collection('transactions');

export const create = async({ title, price, type }, onSuccess, onError) => {
    try {
        const documentData= {
            title: title,
            price: price * 1,
            type: type
        }

        let id = '';

        await transactionsRef.add(documentData).then(documentReference => {
            id = documentReference.id;
        });
        
        return onSuccess(id);
    } catch (error) {
        return onError;
    }
};

export const remove = async({ id }, onSuccess, onError) => {
    try {
        await transactionsRef.doc(id).delete();
        return onSuccess(id);
    } catch (error) {
        return onError;
    }
};

