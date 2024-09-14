import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBtRXPNkn5HpFHQthWC3cdkQ9vRDArcDiw',
  authDomain: 'cuongphim-21a4f.firebaseapp.com',
  projectId: 'cuongphim-21a4f',
  storageBucket: 'cuongphim-21a4f.appspot.com',
  messagingSenderId: '525104945027',
  appId: '1:525104945027:web:7823c2a91a07f9c7c8c8b6',
  measurementId: 'G-0PXD299PML',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
