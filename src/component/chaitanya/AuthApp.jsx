import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import {
  getStoredUser,
  logoutUser,
  onAuthChange,
  getUserData,
} from "./authService";
import "./Auth.css";

/**
 * AuthApp - Main Authentication Application
 *
 * This is a standalone authentication module that can be imported
 * and used anywhere in your application.
 *
 * Usage:
 * import AuthApp from './component/chaitanya/AuthApp';
 * <AuthApp />
 */
const AuthApp = () => {
  const [currentView, setCurrentView] = useState("login"); // 'login', 'register', 'dashboard'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setCurrentView("dashboard");
    }

    // Listen for auth state changes
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userData = await getUserData(firebaseUser.uid);
        if (userData) {
          setUser(userData);
          setCurrentView("dashboard");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleRegisterSuccess = () => {
    setCurrentView("login");
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setCurrentView("login");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="auth-logo-icon">🏥</div>
          <p style={{ color: "white", marginTop: "20px" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Render based on current view
  return (
    <>
      {currentView === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      )}
      {currentView === "register" && (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
      {currentView === "dashboard" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
};

export default AuthApp;
