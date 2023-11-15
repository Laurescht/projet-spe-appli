import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrinLS0stCc61yaoVpLiiHaq4qeSqGiYc",
  authDomain: "au-petit-coin.firebaseapp.com",
  projectId: "au-petit-coin",
  storageBucket: "au-petit-coin.appspot.com",
  messagingSenderId: "405196268355",
  appId: "1:405196268355:web:b95fcd68022f85fa9e85f6"
};

const app = initializeApp(firebaseConfig);
const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
const auth = getAuth(app, { persistence });
const db = getFirestore(app);

export { auth, db };