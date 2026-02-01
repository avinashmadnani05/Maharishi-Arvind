/**
 * Firebase Configuration
 *
 * ⚠️ IMPORTANT: Replace these placeholder values with your Firebase config!
 *
 * To get your config:
 * 1. Go to https://console.firebase.google.com
 * 2. Create/select your project
 * 3. Click Settings (gear icon) → Project settings
 * 4. Scroll down to "Your apps" → Select web app
 * 5. Copy the config object
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBYp6oLTI3xCJehK-3SQsmZ-iSFXWOJ7so",
  authDomain: "clinic-token-booking.firebaseapp.com",
  projectId: "clinic-token-booking",
  storageBucket: "clinic-token-booking.firebasestorage.app",
  messagingSenderId: "400202293818",
  appId: "1:400202293818:web:4fa94ece624f110bc78b03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

export default app;
