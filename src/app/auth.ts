import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "./lib/databasing";

// Get the Auth instance
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("Signed out successfully");
    } catch (error) {
        console.error("Sign out error:", error);
        throw error;
    }
};

export const ensureInitialized = async (): Promise<void> => {
    await auth.authStateReady();
};

export const ensureLoggedIn = async (): Promise<void> => {
    await ensureInitialized();
    if (!auth.currentUser) {
      throw new Error('NOT LOGGED IN');
    }
};

export const initAuth = async (): Promise<void> => {
    await ensureInitialized();
};