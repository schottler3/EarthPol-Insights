"use client"
import { useAppContext } from "../context/AppContext";
import { handleSignOut, signInWithGooglePopup } from "../auth";

export default function Login() {
    const { user } = useAppContext(); 
    return (
        <div>
            {user ? (
                <button onClick={handleSignOut} className="bg-navy py-2 px-4 rounded text-white font-bold hover:text-aqua1">
                    Sign Out
                </button>
            ) : (
                <button onClick={signInWithGooglePopup} className="bg-navy hover:text-aqua1 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            )}
        </div>
    );
}