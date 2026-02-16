import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQrFa-Q0Q1pCWl6s3khWKuQuWFfuDOfgA",
  authDomain: "stemnaz-6143b.firebaseapp.com",
  projectId: "stemnaz-6143b",
  storageBucket: "stemnaz-6143b.firebasestorage.app",
  messagingSenderId: "709721800886",
  appId: "1:709721800886:web:d78e544c379fb58515e617",
  measurementId: "G-N8HXCT0DB9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
