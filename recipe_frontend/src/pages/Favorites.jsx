import React, { useEffect, useState } from "react";
import RecipeGrid from "../components/RecipeGrid";
import { listFavorites, favoriteRecipe, unfavoriteRecipe } from "../api/recipes";

// PUBLIC_INTERFACE
/**
 * Favorites page shows user's saved recipes.
 */
export default function Favorites() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    listFavorites()
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch(() => mounted && setItems([]));
    return () => { mounted = false; };
  }, []);

  const onToggleFavorite = async (recipe) => {
    try {
      if (recipe.is_favorite) {
        await unfavoriteRecipe(recipe.id);
      } else {
        await favoriteRecipe(recipe.id);
      }
      setItems((prev) => prev.map((r) => r.id === recipe.id ? { ...r, is_favorite: !r.is_favorite } : r));
    } catch {
      // ignore
    }
  };

  if (items === null) {
    return <div className="container page"><p className="helper">Loading...</p></div>;
  }

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">Saved</div>
          <h1>Favorites</h1>
        </div>
      </div>
      <RecipeGrid items={items} onToggleFavorite={onToggleFavorite} />
    </div>
  );
}
