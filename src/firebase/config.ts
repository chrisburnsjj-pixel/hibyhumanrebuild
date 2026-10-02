import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import appletConfig from '../../firebase-applet-config.json';

// Priority: Auto-provisioned firebase-applet-config.json > Vite environment variables
const firebaseConfig = {
  apiKey: appletConfig.apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: appletConfig.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: appletConfig.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: appletConfig.storageBucket || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: appletConfig.messagingSenderId || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: appletConfig.appId || import.meta.env.VITE_FIREBASE_APP_ID,
};

const customDatabaseId =
  appletConfig.firestoreDatabaseId ||
  import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID ||
  '(default)';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);

// Use initializeFirestore with experimentalForceLongPolling to prevent
// "Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds"
// error caused by streaming WebChannel buffering in proxied/iframe environments.
let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
    },
    customDatabaseId && customDatabaseId !== '(default)' ? customDatabaseId : undefined
  );
} catch {
  dbInstance =
    customDatabaseId && customDatabaseId !== '(default)'
      ? getFirestore(app, customDatabaseId)
      : getFirestore(app);
}

export const db: Firestore = dbInstance;
export const storage: FirebaseStorage = getStorage(app);

// Validate connection to Firestore as prescribed by Firebase Integration Skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase: Device or client is in offline mode.');
    }
  }
}
// testConnection();

export default app;
