import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { InUser, Shop } from "./types";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

// Get the Firestore instance
const db = getFirestore(app);

export default app;

// REMOVED: const { user, setUser } = useAppContext(); 

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

export const signInUser = async (signedInUser: User): Promise<InUser> => {
    const serializableAuthUser = {
        uid: signedInUser.uid,
        email: signedInUser.email || "",
        emailVerified: signedInUser.emailVerified,
        creationTime: signedInUser.metadata.creationTime || "",
        lastSignInTime: signedInUser.metadata.lastSignInTime || "",
    };

    const tempUser: InUser = {
        authUser: serializableAuthUser,
        userName: "",
        nation: null,
        town: null,
    };
    
    const users = collection(db, 'Users');
    const userDoc = doc(users, signedInUser.uid);
    const userinfo = await getDoc(userDoc);
    
    if (!userinfo.exists()) {
        await setDoc(userDoc, tempUser);
    } else {
        const userData = userinfo.data();
        tempUser.nation = userData?.nation || null;
        tempUser.town = userData?.town || null;
        tempUser.userName = userData?.userName || "";
    }
    
    return tempUser;
};