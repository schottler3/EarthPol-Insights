"use client"
import { useAppContext } from "../context/AppContext";
import { signOutUser, signInWithGooglePopup } from "../auth";

export default function Login() {
    const { user } = useAppContext(); 
    return (
        <div>
            {user ? (
                <div className="w-12 h-auto aspect-square bg-white border-4 border-blue1 rounded-full">
                    
                </div>
            ) : (
                <button onClick={signInWithGooglePopup} className="bg-navy hover:text-aqua1 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            )}
        </div>
    );
}