import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { createRecipe, getRecipe, updateRecipe } from "../api/recipes";

// PUBLIC_INTERFACE
/**
 * RecipeEdit page supports both create and update.
 */
export default function RecipeEdit() {
  const { id } = useParams();
  const isCreate = id === "new";
  const navigate = useNavigate();

  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isCreate) {
      setInitial({});
      return;
    }
    getRecipe(id)
      .then((data) => mounted && setInitial(data))
      .catch(() => mounted && setInitial({}))
    return () => { mounted = false; };
  }, [id, isCreate]);

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      if (isCreate) {
        const created = await createRecipe(form);
        navigate(`/recipes/${created.id}`);
      } else {
        await updateRecipe(id, form);
        navigate(`/recipes/${id}`);
      }
    } catch {
      alert("Failed to save recipe.");
    } finally {
      setSaving(false);
    }
  };

  if (initial === null) return <div className="container page"><p className="helper">Loading...</p></div>;

  return (
    <div className="container page">
      <div className="header">
        <div>
          <div className="kicker">{isCreate ? "Create" : "Edit"}</div>
          <h1>{isCreate ? "New Recipe" : "Edit Recipe"}</h1>
        </div>
      </div>

      <RecipeForm initial={initial} onSubmit={onSubmit} saving={saving} />
    </div>
  );
}
