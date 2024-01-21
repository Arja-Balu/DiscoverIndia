// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTqNNRp6ykodQFuKtcoBZL6PrWwsik-pg",
  authDomain: "mappy-11c90.firebaseapp.com",
  projectId: "mappy-11c90",
  storageBucket: "mappy-11c90.appspot.com",
  messagingSenderId: "730010660831",
  appId: "1:730010660831:web:be8c7778a2ce9680365e6a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();  // <-- Change this line
const db = getFirestore(app);

export { auth, db };
