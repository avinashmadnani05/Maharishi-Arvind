import { useState } from "react";
import { loginUser } from "./authService";
import "./Auth.css";

/**
 * Login Component
 * Professional login form for Clinic Token Booking System
 */
const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(response.user);
        }, 1000);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🏥</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Clinic Token Booking System</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`auth-message ${message.type}`}>{message.text}</div>
          )}

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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-link">
          <p>
            Don't have an account?{" "}
            <a onClick={() => onSwitchToRegister && onSwitchToRegister()}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
