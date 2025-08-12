import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipe, favoriteRecipe, unfavoriteRecipe } from "../api/recipes";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
/**
 * RecipeDetail shows detailed information of a single recipe.
 */
export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteBusy, setFavoriteBusy] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRecipe(id)
      .then((data) => { if (mounted) setRecipe(data); })
      .catch(() => { if (mounted) setRecipe(null); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  const doDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await deleteRecipe(id);
      navigate("/recipes");
    } catch {
      alert("Failed to delete.");
    }
  };

  const toggleFavorite = async () => {
    if (!token) return;
    try {
      setFavoriteBusy(true);
      if (recipe.is_favorite) {
        await unfavoriteRecipe(recipe.id);
      } else {
        await favoriteRecipe(recipe.id);
      }
      setRecipe((r) => ({ ...r, is_favorite: !r.is_favorite }));
    } finally {
      setFavoriteBusy(false);
    }
  };

  if (loading) return <div className="container page"><p className="helper">Loading...</p></div>;
  if (!recipe) return <div className="container page"><div className="empty">Recipe not found.</div></div>;

  return (
    <div className="container page">
      <div className="header">
        <h1>{recipe.title}</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
          <Link to={`/recipes/${id}/edit`} className="btn">Edit</Link>
          <button className="btn" onClick={doDelete}>Delete</button>
          <button className="btn secondary" onClick={toggleFavorite} disabled={favoriteBusy}>
            {recipe.is_favorite ? "♥ Unfavorite" : "♡ Favorite"}
          </button>
        </div>
      </div>

      {recipe.imageUrl ? (
        <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)" }} />
      ) : (
        <div className="empty">No image</div>
      )}

      <section style={{ marginTop: 16 }}>
        <h2>About</h2>
        <p className="recipe-desc">{recipe.description || "No description provided."}</p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Ingredients</h2>
        <pre className="empty" style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{recipe.ingredients || "No ingredients provided."}</pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Steps</h2>
        <pre className="empty" style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{recipe.steps || "No steps provided."}</pre>
      </section>
    </div>
  );
}
