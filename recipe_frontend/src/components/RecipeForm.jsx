import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * RecipeForm used for creating and updating recipes.
 */
export default function RecipeForm({ initial = {}, onSubmit, saving }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    imageUrl: initial.imageUrl || "",
    ingredients: initial.ingredients || "",
    steps: initial.steps || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className="input" value={form.title} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="description">Short Description</label>
        <input id="description" name="description" className="input" value={form.description} onChange={handleChange} />
        <span className="helper">A brief summary of your recipe.</span>
      </div>
      <div className="field">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" name="imageUrl" className="input" value={form.imageUrl} onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea id="ingredients" name="ingredients" className="textarea" value={form.ingredients} onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="steps">Steps</label>
        <textarea id="steps" name="steps" className="textarea" value={form.steps} onChange={handleChange} />
      </div>
      <div>
        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Recipe"}
        </button>
      </div>
    </form>
  );
}
