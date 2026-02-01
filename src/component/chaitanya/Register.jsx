import { useState } from "react";
import { registerUser } from "./authService";
import "./Auth.css";

/**
 * Register Component
 * Professional registration form for Clinic Token Booking System
 */
const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await registerUser(userData);
      setMessage({
        type: "success",
        text: "Registration successful! Please login.",
      });

      if (onRegisterSuccess) {
        setTimeout(() => {
          onRegisterSuccess();
        }, 1500);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeClass = () => {
    return `role-badge ${formData.role}`;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🏥</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Clinic Token Booking System</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`auth-message ${message.type}`}>{message.text}</div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Select Your Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="patient">🧑‍🤒 Patient</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
              <option value="admin">👨‍💼 Admin</option>
            </select>
            <div className="role-preview">
              <span className={getRoleBadgeClass()}>
                {formData.role === "patient" && "🧑‍🤒 Patient"}
                {formData.role === "doctor" && "👨‍⚕️ Doctor"}
                {formData.role === "admin" && "👨‍💼 Admin"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="auth-link">
          <p>
            Already have an account?{" "}
            <a onClick={() => onSwitchToLogin && onSwitchToLogin()}>
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
