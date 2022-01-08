import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBGZXFnw2PPwycvwXWkjmYraU9jyPg2yE4",
  authDomain: "mynewinsta-691d1.firebaseapp.com",
  projectId: "mynewinsta-691d1",
  storageBucket: "mynewinsta-691d1.appspot.com",
  messagingSenderId: "355903971926",
  appId: "1:355903971926:web:b0e1f17146ea851f3f91f7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const messaging = getMessaging();

const storage = getStorage();

const auth = getAuth();

export { app, db, storage, auth };
