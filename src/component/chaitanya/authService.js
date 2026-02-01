/**
 * Authentication Service
 * Firebase Auth + Firestore for user management
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

/**
 * Register a new user with Firebase Auth and save to Firestore
 * @param {Object} userData - { name, email, password, role }
 */
export const registerUser = async ({ name, email, password, role }) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Save additional user data to Firestore
    const userData = {
      uid: user.uid,
      name,
      email: email.toLowerCase(),
      role: role.toLowerCase(),
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return {
      success: true,
      user: { ...userData, id: user.uid },
    };
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Login user with Firebase Auth
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));
      return {
        success: true,
        user: userData,
      };
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to logout");
  }
};

/**
 * Get current user from Firestore
 * @param {string} uid - User ID
 */
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    throw new Error("Failed to get user data");
  }
};

/**
 * Auth state listener
 * @param {Function} callback - Called when auth state changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get stored user from localStorage
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem("user");
};

/**
 * Convert Firebase error codes to user-friendly messages
 */
const getErrorMessage = (code) => {
  const errorMessages = {
    "auth/email-already-in-use": "Email is already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/operation-not-allowed": "Email/password accounts are not enabled",
    "auth/weak-password": "Password is too weak (min 6 characters)",
    "auth/user-disabled": "This account has been disabled",
    "auth/user-not-found": "Invalid email or password",
    "auth/wrong-password": "Invalid email or password",
    "auth/invalid-credential": "Invalid email or password",
    "auth/too-many-requests": "Too many attempts. Please try again later",
  };
  return errorMessages[code] || "An error occurred. Please try again.";
};
