# Firebase Setup for Streak Flow

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Go to Project Settings → General tab, scroll to "Your apps", select Web app and register it.
3. Copy the config object from the Firebase "Web app" registration into both:
   - `src/firebase.js`
   - `public/firebase-messaging-sw.js`
4. For FCM (Cloud Messaging):
   - Go to Project Settings → Cloud Messaging tab.
   - Under "Web configuration", generate a Web Push certificate if none exists.
   - Copy your **public VAPID key** and set it in `src/firebase.js` (`vapidKey`).
5. The service worker file (`firebase-messaging-sw.js`) must be at the root of your *public* directory for Create React App to register FCM background messages.

## Next Steps

- In React, import and use the `requestNotificationPermissionAndToken()` method from `src/firebase.js` to request push permission and retrieve/save user tokens.
- Store tokens per user in Firestore (using `db`).
- Use the `onMessage` handler in `src/firebase.js` for foreground notifications UI.
