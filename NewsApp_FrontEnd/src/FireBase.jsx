// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwpSY4E8b-fUlVeDw1OGo7Uvc6-VXr2C4",
  authDomain: "newsapp-0007.firebaseapp.com",
  projectId: "newsapp-0007",
  storageBucket: "newsapp-0007.appspot.com",
  messagingSenderId: "257047985352",
  appId: "1:257047985352:web:0324d39d1714514e4479fd",
  measurementId: "G-5TZNMPT8ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;