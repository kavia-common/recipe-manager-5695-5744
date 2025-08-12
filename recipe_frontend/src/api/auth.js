import client from "./client";

// PUBLIC_INTERFACE
/**
 * login
 * Logs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login(email, password) {
  const res = await client.post("/auth/login", { email, password });
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * register
 * Registers a new user.
 * @param {{name: string, email: string, password: string}} payload
 * @returns {Promise<{token: string, user: object}>}
 */
export async function register(payload) {
  const res = await client.post("/auth/register", payload);
  return res.data;
}

// PUBLIC_INTERFACE
/**
 * getProfile
 * Fetch current user profile using JWT.
 * @returns {Promise<object>}
 */
export async function getProfile() {
  const res = await client.get("/users/me");
  return res.data;
}
