import * as firebase from "firebase"
import "firebase/firestore"
import store from "./store";
import "firebase/functions"

const configOptions = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "electrical-assistance-app.firebaseapp.com",
    databaseURL: "https://electrical-assistance-app.firebaseio.com",
    projectId: "electrical-assistance-app",
    storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MESURE_ID,
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});
const db = firebase.firestore();
const functions = firebase.functions();

export {db, functions};

//export default db;



