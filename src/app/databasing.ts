import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const setDiscord = async function(uuid: string, locationUUID: string, code: number, timestamp: string, discordLink: string) {
  try {
    const response = await fetch('/api/discord-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid,
        locationUUID,
        code,
        timestamp,
        discordLink
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to set Discord link');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error setting Discord link:', error);
    throw error;
  }
}

export const removeDiscord = function(uuid:string){
    const locationRef = doc(db, 'discord', uuid);
    setDoc(locationRef, {discord: null})
}

export const getDiscord = async function(uuid:string){
    const locationRef = doc(db, 'discord', uuid);
    return await getDoc(locationRef);
}

