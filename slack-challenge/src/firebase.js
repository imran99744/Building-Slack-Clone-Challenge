import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxTHVSd0Inz_e9fFJdorFCn22lK2GVJ0g",
  authDomain: "slack-challenge-dc92b.firebaseapp.com",
  projectId: "slack-challenge-dc92b",
  storageBucket: "slack-challenge-dc92b.appspot.com",
  messagingSenderId: "485312407691",
  appId: "1:485312407691:web:d92486c93fcfa4eaa0cc8e",
  measurementId: "G-89X958J2ES",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
