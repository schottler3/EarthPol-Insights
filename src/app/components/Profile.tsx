"use client"
import { useAppContext } from "../context/AppContext";
import { signOutUser, signInWithGooglePopup } from "../auth";

export default function Login() {
    const { user } = useAppContext(); 
    return (
        <div>
            {user ? (
                <button onClick={signOutUser} className="bg-navy py-1 px-4 rounded text-white font-bold hover:text-aqua1">
                    Logout
                </button>
            ) : (
                <button onClick={signInWithGooglePopup} className="bg-navy hover:text-aqua1 text-white font-bold py-1 px-4 rounded">
                    Login
                </button>
            )}
        </div>
    );
}