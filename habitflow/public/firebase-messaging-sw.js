  // This service worker is required for Firebase Cloud Messaging background notifications
  // You must include this at your app's root (public/) and deploy it with your build/static files.

  importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

  // TODO: Replace the config below with your Firebase project config object (see src/firebase.js)
  firebase.initializeApp({
    apiKey: "<YOUR_FIREBASE_API_KEY>",
    authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
    projectId: "<YOUR_FIREBASE_PROJECT_ID>",
    storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
    messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
    appId: "<YOUR_FIREBASE_APP_ID>",
    measurementId: "<YOUR_MEASUREMENT_ID>"
  });

  // Retrieve an instance of Firebase Messaging to handle background messages
  const messaging = firebase.messaging();

  // Optional: Customize app notification payload
  messaging.onBackgroundMessage(function(payload) {
    // Customize notification here (title/body/icon)
    const notificationTitle = payload.notification?.title || "Streak Flow Reminder";
    const notificationOptions = {
      body: payload.notification?.body || "Don't forget to complete your daily habits!",
      icon: payload.notification?.icon || '/logo192.png',
      // you can add actions, data, etc.
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
