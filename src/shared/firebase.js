// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey : "AIzaSyBtRXPNkn5HpFHQthWC3cdkQ9vRDArcDiw" , 
  authDomain : "cuongphim-21a4f.firebaseapp.com" , 
  projectId : "cuongphim-21a4f" , 
  storageBucket : "cuongphim-21a4f.appspot.com" , 
  messagingSenderId : "525104945027" , 
  appId : "1:525104945027:web:7823c2a91a07f9c7c8c8b6" , 
  measurementId : "G-0PXD299PML" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
