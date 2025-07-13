import {onSchedule} from "firebase-functions/scheduler";
import * as admin from "firebase-admin";
import {setGlobalOptions} from "firebase-functions";

setGlobalOptions({
  memory: "512MiB",
  timeoutSeconds: 540,
});

// The Firebase Admin SDK to access Firestore.
admin.initializeApp();
const db = admin.firestore();

type Shop = {
  id: string
  owner: string
  item: string
  price: number
  type: string
  space: number
  stock: number
  location: {
      world: string
      x: number
      y: number
      z: number
  }
}

exports.itemupdates = onSchedule({
  schedule: "every day 00:00",
  memory: "512MiB",
  timeoutSeconds: 540,
}, async () => {
  try {
    console.log("Starting test...");
    const shops: Shop[] = await renderShops();

    if (shops) {
      const timestamp = Date.now();
      const batchSize = 400;

      const validShops = shops.filter((shop) =>
        shop.id &&
        shop.price <= 999
      );

      console.log(`Processing ${validShops.length} valid shops`);

      for (let i = 0; i < validShops.length; i += batchSize) {
        const batch = db.batch();
        const batchShops = validShops.slice(i, i + batchSize);

        batchShops.forEach((shop: Shop) => {
          const shopId = shop.id.toString().trim();
          if (shopId) {
            const docRef = db.collection("shops")
              .doc(shopId)
              .collection("history")
              .doc(timestamp.toString());
            const docData = {data: shop, timestamp: timestamp};
            batch.set(docRef, docData);
          }
        });

        await batch.commit();
        const batchNum = Math.floor(i/batchSize) + 1;
        const totalBatches = Math.ceil(validShops.length/batchSize);
        console.log(`Committed batch ${batchNum}/${totalBatches}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ?
      error.message : String(error);
    console.error("Test error:", errorMessage);
  }
});

const renderShops = async () => {
  try {
    const response = await fetch("https://api.earthpol.com/astra/shops", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    if (!data) {
      console.log("No data found");
      return null;
    }

    if (Array.isArray(data)) {
      console.log(`Fetched ${data.length} shops from API`);
    } else {
      console.log("Data fetched successfully");
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ?
      error.message : String(error);
    console.error("Error fetching EarthPol data:", errorMessage);
    return null;
  }
};
