import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import { favoriteRecipe, listRecipes, unfavoriteRecipe } from "../api/recipes";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * RecipesList shows all recipes and supports searching.
 */
export default function RecipesList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const load = async (query) => {
    setLoading(true);
    try {
      const data = await listRecipes(query ? { q: query } : undefined);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      // Graceful fallback when backend is unavailable
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(""); }, []);

  const onSearch = (query) => {
    setQ(query);
    load(query);
  };

  const onToggleFavorite = async (recipe) => {
    if (!token) return; // only authenticated users can favorite
    try {
      if (recipe.is_favorite) {
        await unfavoriteRecipe(recipe.id);
      } else {
        await favoriteRecipe(recipe.id);
      }
      setItems((prev) => prev.map((r) => r.id === recipe.id ? { ...r, is_favorite: !r.is_favorite } : r));
    } catch {
      // ignore for now
    }
  };

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">Discover</div>
          <h1>Recipes</h1>
        </div>
        <div>
          <Link to="/recipes/new" className="btn primary">Add Recipe</Link>
        </div>
      </div>

      <SearchBar onSearch={onSearch} initialValue={q} />

      <div style={{ marginTop: 16 }}>
        {loading ? <div className="helper">Loading...</div> : <RecipeGrid items={items} onToggleFavorite={onToggleFavorite} />}
      </div>
      <div className="footer-space" />
    </div>
  );
}
