import React from "react";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * Profile page shows current user and simple actions.
 */
export default function Profile() {
  const { user } = useAuth();
  if (!user) return <div className="container page"><div className="empty">No profile data.</div></div>;

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">Account</div>
          <h1>Profile</h1>
        </div>
      </div>

      <div className="empty" style={{ textAlign: "left" }}>
        <p><strong>Name:</strong> {user.name || "-"}</p>
        <p><strong>Email:</strong> {user.email || "-"}</p>
        <p className="helper">This is a minimal profile view. In a real app, you could add password change, avatar, etc.</p>
      </div>
    </div>
  );
}
