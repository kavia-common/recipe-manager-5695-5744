import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * NotFound page for unmatched routes.
 */
export default function NotFound() {
  return (
    <div className="container page">
      <div className="empty">
        <h2>Page not found</h2>
        <p className="helper">The page you are looking for does not exist.</p>
        <Link to="/recipes" className="btn">Go to recipes</Link>
      </div>
    </div>
  );
}
