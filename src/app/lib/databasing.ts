import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { InUser, Shop } from "./types";
import { useAppContext } from "../context/AppContext";
import { User } from "firebase/auth";
import { auth } from "../auth";

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

const { user, setUser } = useAppContext(); 

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

export const signInUser = async (signedInUser:User) {
    let tempUser:InUser;
    tempUser.authUser = signedInUser;
    tempUser
    const users = collection(db, 'Users');
    let user = doc(users, auth.user.uid);
    const userinfo = await getDoc(user);
    if (!userinfo.exists()) {
      await setDoc(user, {
        uid: uid,
        visits: 0,
      });
    }
    console.log(userinfo);
    this.achievementCount = this.getVisits();
  }

