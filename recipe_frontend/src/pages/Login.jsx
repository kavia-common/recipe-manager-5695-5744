import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * Login page for user authentication.
 */
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/recipes";

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">Welcome back</div>
          <h1>Login</h1>
        </div>
      </div>

      <form onSubmit={submit} className="form" aria-label="Login form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {err && <div className="empty" role="alert">{err}</div>}
        <div>
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
          <span className="helper" style={{ marginLeft: 8 }}>
            No account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
