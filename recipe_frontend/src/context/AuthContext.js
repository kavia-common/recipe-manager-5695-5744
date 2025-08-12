import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, login as apiLogin, register as apiRegister } from "../api/auth";

/**
 * Authentication context for managing user and token state.
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
/**
 * useAuth
 * Hook to access authentication state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
/**
 * AuthProvider
 * Provides authentication state and actions to the React tree.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;
    setLoading(true);
    getProfile()
      .then((u) => {
        if (isMounted) setUser(u);
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("auth_token");
        }
      })
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false; };
  }, [token]);

  // Login, register and logout are internal functions exposed through context value
  const login = async (email, password) => {
    setError(null);
    const { token: jwt, user: u } = await apiLogin(email, password);
    localStorage.setItem("auth_token", jwt);
    setToken(jwt);
    setUser(u);
    return u;
  };

  const register = async (payload) => {
    setError(null);
    const { token: jwt, user: u } = await apiRegister(payload);
    localStorage.setItem("auth_token", jwt);
    setToken(jwt);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, error, login, register, logout }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
