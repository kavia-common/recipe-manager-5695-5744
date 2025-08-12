import React from "react";
import RecipeCard from "./RecipeCard";

// PUBLIC_INTERFACE
/**
 * RecipeGrid renders a responsive grid of RecipeCard components.
 */
export default function RecipeGrid({ items = [], onToggleFavorite }) {
  if (!items.length) {
    return <div className="empty">No recipes found.</div>;
  }
  return (
    <section className="card-grid" aria-label="Recipes list">
      {items.map((r) => (
        <RecipeCard key={r.id} recipe={r} onToggleFavorite={onToggleFavorite} />
      ))}
    </section>
  );
}
