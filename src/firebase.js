import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBDZG_YYdu12y-Mi0vRA5n11z_CEEAdn4M",
    authDomain: "pawmart-960b8.firebaseapp.com",
    projectId: "pawmart-960b8",
    storageBucket: "pawmart-960b8.firebasestorage.app",
    messagingSenderId: "100015265049",
    appId: "1:100015265049:web:1431b7e842a2e1a8be2188"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
