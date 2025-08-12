import client from "./client";

// PUBLIC_INTERFACE
/**
 * listRecipes
 * List recipes with optional query.
 * @param {{q?: string}} params
 * @returns {Promise<Array>}
 */
export async function listRecipes(params = {}) {
  const res = await client.get("/recipes", { params });
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * getRecipe
 * Get a single recipe by ID.
 * @param {string|number} id
 * @returns {Promise<object>}
 */
export async function getRecipe(id) {
  const res = await client.get(`/recipes/${id}`);
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * createRecipe
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function createRecipe(payload) {
  const res = await client.post("/recipes", payload);
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * updateRecipe
 * @param {string|number} id
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function updateRecipe(id, payload) {
  const res = await client.put(`/recipes/${id}`, payload);
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * deleteRecipe
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteRecipe(id) {
  await client.delete(`/recipes/${id}`);
}

// PUBLIC_INTERFACE
/**
 * listFavorites
 * @returns {Promise<Array>}
 */
export async function listFavorites() {
  const res = await client.get("/recipes/favorites");
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * favoriteRecipe
 * @param {string|number} id
 * @returns {Promise<object>}
 */
export async function favoriteRecipe(id) {
  const res = await client.post(`/recipes/${id}/favorite`);
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * unfavoriteRecipe
 * @param {string|number} id
 * @returns {Promise<object>}
 */
export async function unfavoriteRecipe(id) {
  const res = await client.delete(`/recipes/${id}/favorite`);
  return res.data;
}
