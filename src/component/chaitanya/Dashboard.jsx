import "./Auth.css";

/**
 * Dashboard Component
 * Shows user info after successful login
 */
const Dashboard = ({ user, onLogout }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    // Handle Firestore timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    // Handle regular date string
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>🏥 Clinic Token Booking</h1>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="welcome-section">
          <h2>Welcome, {user?.name || "User"}! 👋</h2>
          <span className={`role-tag ${user?.role || "patient"}`}>
            {user?.role === "patient" && "🧑‍🤒 Patient"}
            {user?.role === "doctor" && "👨‍⚕️ Doctor"}
            {user?.role === "admin" && "👨‍💼 Admin"}
          </span>
        </div>

        <div className="dashboard-info">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p>{user?.email || "N/A"}</p>
          </div>
          <div className="info-card">
            <h3>👤 Role</h3>
            <p style={{ textTransform: "capitalize" }}>
              {user?.role || "patient"}
            </p>
          </div>
          <div className="info-card">
            <h3>📅 Joined</h3>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          {user?.role === "patient" && (
            <button className="action-btn patient">📋 Book Token</button>
          )}
          {user?.role === "doctor" && (
            <button className="action-btn doctor">🩺 OPD Dashboard</button>
          )}
          {user?.role === "admin" && (
            <button className="action-btn admin">📊 Analytics</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
