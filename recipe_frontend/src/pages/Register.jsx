import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * Register page for creating an account.
 */
export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await register(form);
      navigate("/recipes", { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">Join us</div>
          <h1>Create account</h1>
        </div>
      </div>

      <form onSubmit={submit} className="form" aria-label="Register form">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" className="input" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" className="input" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        {err && <div className="empty" role="alert">{err}</div>}
        <div>
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
          <span className="helper" style={{ marginLeft: 8 }}>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
