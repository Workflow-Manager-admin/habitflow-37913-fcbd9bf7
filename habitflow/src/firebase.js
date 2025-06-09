  // PUBLIC_INTERFACE
  /**
   * Firebase initialization for Streak Flow app.
   * This sets up Firebase App, Firestore, and Messaging (for push notifications).
   * Imports should use named exports: db (Firestore instance), messaging (FCM for push), and firebaseAuth (for optional auth).
   * 
   * FCM requires a valid VAPID key for web push: replace <YOUR_PUBLIC_VAPID_KEY_HERE> and get Firebase config from your project settings.
   */
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getMessaging, getToken, onMessage } from "firebase/messaging";
  import { getAuth } from "firebase/auth";

  // TODO: Replace with your Firebase project configuration
  // (Find in Firebase Console -> Project settings -> General -> Your apps: SDK setup and configuration)
  const firebaseConfig = {
    apiKey: "<YOUR_FIREBASE_API_KEY>",
    authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
    projectId: "<YOUR_FIREBASE_PROJECT_ID>",
    storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
    messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
    appId: "<YOUR_FIREBASE_APP_ID>",
    measurementId: "<YOUR_MEASUREMENT_ID>"
  };

  // Initialize Firebase App
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore
  export const db = getFirestore(app);

  // Initialize Auth (for future use: sign-in, storing notification tokens per user, etc.)
  export const firebaseAuth = getAuth(app);

  // Initialize Messaging (FCM)
  let messaging = null;
  // Check for window support: FCM only works in supported browsers and HTTPS
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      messaging = getMessaging(app);
    } catch (e) {
      messaging = null;
    }
  }

  export { messaging, getToken, onMessage };

  // Helper to request the browser notification permission and get the FCM token
  // PUBLIC_INTERFACE
  /**
   * Requests Notification permission and returns FCM token, or null if denied.
   * @returns {Promise<string|null>} The FCM registration token or null.
   */
  export async function requestNotificationPermissionAndToken() {
    if (!messaging) return null;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;
    try {
      // TODO: Set your public VAPID key for your Firebase project (from Cloud Messaging -> Web Push certificates)
      const vapidKey = "<YOUR_PUBLIC_VAPID_KEY_HERE>";
      const token = await getToken(messaging, { vapidKey });
      return token;
    } catch (err) {
      return null;
    }
  }

  // Handle incoming foreground messages. Usage: onMessage(messaging, callback)
