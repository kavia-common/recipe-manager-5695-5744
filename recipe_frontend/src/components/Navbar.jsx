import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Navbar
 * Provides the top navigation bar with links to primary application sections
 * and authentication actions (login/register or profile/logout).
 */
export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand" aria-label="Recipe Manager Home">
          <span className="brand-badge">R</span>
          Recipe Manager
        </Link>

        <div className="nav-links" role="navigation" aria-label="Primary">
          <NavLink to="/recipes" className="nav-link">Recipes</NavLink>
          {user && <NavLink to="/favorites" className="nav-link">Favorites</NavLink>}
          {user && <NavLink to="/recipes/new" className="nav-link primary">New Recipe</NavLink>}
        </div>

        <div className="nav-actions">
          {!user && (
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/register" className="btn primary">Register</NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/profile" className="btn ghost">Hi, {user.name || user.email}</NavLink>
              <button className="btn" onClick={logout} aria-label="Logout">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
