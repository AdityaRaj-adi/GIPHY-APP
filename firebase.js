import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';

const firebaseConfig = {
  
  apiKey: "AIzaSyDCpWC3yRnYbHEpjPV-g1hmWg8dtvjBj9c",
  authDomain: "my-giphy-app-aefd8.firebaseapp.com",
  projectId: "my-giphy-app-aefd8",
  storageBucket: "my-giphy-app-aefd8.appspot.com",
  messagingSenderId: "887592064417",
  appId: "1:887592064417:web:aac1536fc57f396491a7e0",
  measurementId: "G-V8Q2RBSLJZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;