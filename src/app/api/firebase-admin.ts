import * as admin from 'firebase-admin';

let app: admin.app.App;

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_CONFIG) {
      app = admin.initializeApp();
      console.log("Firebase Admin initialized with default credentials");
    } else {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT_ID || process.env.projectID,
          clientEmail: process.env.CLIENT_EMAIL,
          privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')
        } as admin.ServiceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
      console.log("Firebase Admin initialized with local credentials");
    }
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw error;
  }
} else {
  app = admin.apps[0] as admin.app.App;
}

export const adminDb = admin.firestore(app);