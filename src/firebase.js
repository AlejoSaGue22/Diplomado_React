// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXs-GJ4mLfUJKC56R4QHm8VILLPteN-Vc",
    authDomain: "authentication-proyecto.firebaseapp.com",
    projectId: "authentication-proyecto",
    storageBucket: "authentication-proyecto.appspot.com",
    messagingSenderId: "20857067370",
    appId: "1:20857067370:web:6056407f23700e5f507713",
    measurementId: "G-NXH03BZMDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



