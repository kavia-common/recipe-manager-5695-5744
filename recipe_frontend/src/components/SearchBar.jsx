import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * SearchBar component used to search recipes.
 */
export default function SearchBar({ onSearch, initialValue = "" }) {
  const [q, setQ] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <form onSubmit={submit} className="search-bar" role="search">
      <input
        className="search-input"
        placeholder="Search recipes, e.g. pasta, vegan..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search recipes"
      />
      <button type="submit" className="btn">Search</button>
    </form>
  );
}
