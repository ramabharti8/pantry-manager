// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7kTr8Cp6CQxQ3w2LHaimLCvkbubtQLt8",
  authDomain: "pantry-manager-f48b3.firebaseapp.com",
  projectId: "pantry-manager-f48b3",
  storageBucket: "pantry-manager-f48b3.appspot.com",
  messagingSenderId: "593211937545",
  appId: "1:593211937545:web:7ced90492e27c3c19579d8",
  measurementId: "G-4SSGYZ8QXN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // For Firestore
// const db = getDatabase(app); // For Realtime Database

export { db };
