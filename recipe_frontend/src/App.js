import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import RecipesList from "./pages/RecipesList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeEdit from "./pages/RecipeEdit";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// PUBLIC_INTERFACE
/**
 * App is the main application component setting up routes and layout.
 */
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/new" element={<ProtectedRoute />}>
          <Route index element={<RecipeEdit />} />
        </Route>
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<ProtectedRoute />}>
          <Route index element={<RecipeEdit />} />
        </Route>

        <Route path="/favorites" element={<ProtectedRoute />}>
          <Route index element={<Favorites />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
