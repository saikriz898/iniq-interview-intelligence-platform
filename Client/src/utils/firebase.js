// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForNow",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "iniq-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "iniq-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "iniq-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
let messaging = null;

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

export const requestNotificationPermission = async () => {
    try {
        // Fallback to native Web Notification API first so it actually prompts the user
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                new Notification('Notifications Enabled!', {
                    body: 'You will receive real-time updates for your interview experiences.',
                    icon: '/icon-192x192.png'
                });
            }
        }

        if (!messaging) return null;
        
        const currentToken = await getToken(messaging, {
            // Replace with your actual VAPID key from Firebase Console > Project Settings > Cloud Messaging > Web configuration
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || 'YOUR_PUBLIC_VAPID_KEY_HERE'
        });
        
        if (currentToken) {
            console.log('FCM Token generated.');
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.error('Firebase messaging failed, but native notifications might still work if granted.', err);
        return 'dummy-token-for-native-fallback';
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        if (!messaging) return;
        onMessage(messaging, (payload) => {
            console.log("Foreground push notification received:", payload);
            resolve(payload);
        });
    });

export default app;
