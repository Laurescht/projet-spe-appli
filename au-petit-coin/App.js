import { onAuthStateChanged, getAuth } from 'firebase/auth';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Navigation from './Navigation';
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <>
      <UserProvider>
        <Navigation />
      </UserProvider> 
    </>
  );
}