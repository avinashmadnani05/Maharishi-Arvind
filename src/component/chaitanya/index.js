/**
 * Chaitanya Auth Module
 *
 * Complete authentication system with Firebase
 *
 * Usage:
 *
 * Option 1 - Full Auth App:
 * import { AuthApp } from './component/chaitanya';
 * <AuthApp />
 *
 * Option 2 - Individual Components:
 * import { Login, Register, Dashboard } from './component/chaitanya';
 *
 * Option 3 - Auth Service:
 * import { loginUser, registerUser, logoutUser } from './component/chaitanya';
 */

// Components
export { default as AuthApp } from "./AuthApp";
export { default as Login } from "./Login";
export { default as Register } from "./Register";
export { default as Dashboard } from "./Dashboard";

// Auth Service Functions
export {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  onAuthChange,
  getStoredUser,
  isAuthenticated,
} from "./authService";

// Firebase instances (if needed directly)
export { auth, db } from "./firebaseConfig";
