// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXTlQJ7HiDHksmlAKR3uh-Pw73jrLkNY4",
    authDomain: "projectnative-6e41a.firebaseapp.com",
    projectId: "projectnative-6e41a",
    storageBucket: "projectnative-6e41a.appspot.com",
    messagingSenderId: "548526345663",
    appId: "1:548526345663:web:0f7f4071915e905061a50a",
    measurementId: "G-TZBYDLKTCW"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  const firestore = firebase.firestore();
  const storage = firebase.storage(); // Initialize Storage
  
  export { firebase, firestore, storage };