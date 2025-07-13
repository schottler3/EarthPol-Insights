import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { Shop } from "./types";

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

export const getShopHistory = async function(uuid: string): Promise<Shop[] | null> {
    try {
        const collectionRef = collection(db, `shops/${uuid}/history`);
        
        const querySnapshot = await getDocs(collectionRef);
        
        const shops: Shop[] = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.data) {
                shops.push({
                    id: doc.id,
                    ...data.data,
                    timestamp: data.timestamp
                } as Shop);
            }
        });
        
        return shops.length > 0 ? shops : null;
        
    } catch (error) {
        console.error("Error fetching shop history:", error);
        return null;
    }
}

