import { onAuthStateChanged, getAuth } from 'firebase/auth';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Navigation from './Navigation';
import { UserProvider } from './UserContext';

// const firebaseConfig = {
//   apiKey: "AIzaSyDrinLS0stCc61yaoVpLiiHaq4qeSqGiYc",
//   authDomain: "au-petit-coin.firebaseapp.com",
//   projectId: "au-petit-coin",
//   storageBucket: "au-petit-coin.appspot.com",
//   messagingSenderId: "405196268355",
//   appId: "1:405196268355:web:b95fcd68022f85fa9e85f6"
// };

// const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <>
      <UserProvider>
        <Navigation />
      </UserProvider> 
    </>
  );
}