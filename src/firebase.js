import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvfxV8n-T31uJ1OChfIsSs6B7aBYavDkY",
  authDomain: "mail-my-mail.firebaseapp.com",
  projectId: "mail-my-mail",
  storageBucket: "mail-my-mail.appspot.com",
  messagingSenderId: "756881783380",
  appId: "1:756881783380:web:a8ebbfdf5d210dd3360bc1",
  measurementId: "G-0HX13YPP66",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;
