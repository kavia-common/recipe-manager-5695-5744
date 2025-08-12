import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * RecipeCard displays a recipe summary card.
 */
export default function RecipeCard({ recipe, onToggleFavorite }) {
  const { id, title, description, imageUrl, is_favorite } = recipe;

  return (
    <article className="recipe-card">
      <Link to={`/recipes/${id}`} aria-label={`Open ${title}`}>
        {imageUrl ? (
          <img className="recipe-thumb" src={imageUrl} alt={title} />
        ) : (
          <div className="recipe-thumb" />
        )}
      </Link>
      <div className="recipe-body">
        <h3 className="recipe-title">
          <Link to={`/recipes/${id}`}>{title}</Link>
        </h3>
        <p className="recipe-desc">{description || "No description provided."}</p>
        <div className="recipe-meta">
          <Link to={`/recipes/${id}`} className="btn ghost">Details</Link>
          <button
            type="button"
            className={`btn ${is_favorite ? "secondary" : ""}`}
            onClick={() => onToggleFavorite?.(recipe)}
            aria-pressed={!!is_favorite}
            aria-label={is_favorite ? "Remove from favorites" : "Save to favorites"}
            title={is_favorite ? "Unfavorite" : "Favorite"}
          >
            {is_favorite ? "♥ Favorited" : "♡ Favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}
