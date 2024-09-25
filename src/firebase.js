import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey:"AIzaSyB4teyT9oQpXlIGHcqXoDp_Cu2GPrPzF4U",
    authDomain:"leavelastwords.firebaseapp.com",
    // REACT_APP_FIREBASE_DATABASE_URL:"https://react-firebase-boilerpla-ce757.firebaseio.com",
    projectId:"leavelastwords",
    storageBucket:"leavelastwords.appspot.com",
    messagingSenderId:"737020265262",
    appId:"1:737020265262:web:27d6c48b4f34e9536ef0bf",
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_AUTH_DOMAIN",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_STORAGE_BUCKET",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    // appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance


export default app;