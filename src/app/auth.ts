import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgsO-AlUIsBrbKd8GDBygCMiOzqmSFv60",
  authDomain: "earthpol-insights.firebaseapp.com",
  projectId: "earthpol-insights",
  storageBucket: "earthpol-insights.firebasestorage.app",
  messagingSenderId: "550138244897",
  appId: "1:550138244897:web:43fe595ea9bf57f7f29860",
  measurementId: "G-28X0Q0LFBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
export const auth = getAuth(app);

export default app;

const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Signed in with Google:", user.displayName);
    } catch (error) {
        console.error("Google sign-in error:", error);
    }
};

export const handleSignOut = async () => {
    try {
        await signOut(auth);
        console.log("Signed out successfully");
    } catch (error) {
        console.error("Sign out error:", error);
    }
};