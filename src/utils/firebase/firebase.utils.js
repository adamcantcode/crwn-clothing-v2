import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbmBCuf7H0Kuan4PB6LrZNJQI9yoVnW-E',
  authDomain: 'crwn-clothing-db-f34b9.firebaseapp.com',
  projectId: 'crwn-clothing-db-f34b9',
  storageBucket: 'crwn-clothing-db-f34b9.appspot.com',
  messagingSenderId: '681599496629',
  appId: '1:681599496629:web:2c351ea8f1955f6dbfe9fc',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log('userDocRef', userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log('userSnapshot', userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    console.log(!userSnapshot.exists());
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log('error creating user', e.message);
    }
  }

  return userDocRef;
};
