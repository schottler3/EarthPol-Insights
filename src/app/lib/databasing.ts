import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { InUser, Player, Shop } from "./types";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getPlayerData } from "./queries";

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

    const cachedAccount = localStorage.getItem("userName");

    const tempUser: InUser = {
        authUser: serializableAuthUser,
        userName: "",
        nation: null,
        town: null,
    };

    if(cachedAccount){
        tempUser.userName = cachedAccount;
    }
    
    const users = collection(db, 'Users');
    const userDoc = doc(users, signedInUser.uid);
    const userinfo = await getDoc(userDoc);
    
    if (!userinfo.exists()) {
        if(tempUser.userName) {
            const playerData:Player | null = await getPlayerData(tempUser.userName);
            console.log(`PlayerData: ${playerData}`)
            if(playerData) {
                tempUser.nation = playerData.nation;
                tempUser.town = playerData.town;
            }
        }
        await setDoc(userDoc, tempUser);
        return tempUser;
    } 
    else {
        const userData = userinfo.data() as InUser;
        if(tempUser.userName) {
            const playerData:Player | null = await getPlayerData(tempUser.userName);
            if(playerData) {
                userData.nation = playerData.nation;
                userData.town = playerData.town;
            }
            userData.userName = tempUser.userName;
            await setDoc(userDoc, userData);
        }
        return userData;
    }
};

export const reloadAccount = async (user:InUser) : Promise<boolean> => {
    try{
        const users = collection(db, 'Users');
        const userDoc = doc(users, user.authUser.uid);
        const userinfo = await getDoc(userDoc);
        
        const userData = userinfo.data() as InUser;
        const username = user.userName;
        if(username){
            const playerData:Player | null = await getPlayerData(username);

            if(playerData) {
                userData.nation = playerData.nation;
                userData.town = playerData.town;
            }
            userData.userName = user.userName;
            await setDoc(userDoc, userData);
            return true;
        }
        else{
            return false;
        }
    } catch(e) {
        return false;
    }
}