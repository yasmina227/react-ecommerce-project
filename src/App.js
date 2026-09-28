import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import StandardErrorBoundry from "./components/errorBoundry/StandardErrorBoundry.jsx";
import SiteLayout from "./components/SiteLayout";
import AccountPages from "./pages/AccountPages";
import AuthPages from "./pages/AuthPages";
import HomePage from "./pages/HomePage";
import {
  getUsers,
  readSession,
  readWishlist,
  saveSession,
  saveWishlist,
  writeUsers,
} from "./data/shopData";

function ProtectedRoute({ user, children }) {
  const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function ShopApp() {
  const [user, setUser] = useState(readSession);
  const [wishlist, setWishlist] = useState(() => readWishlist(readSession()?.email));

  useEffect(() => {
    setWishlist(readWishlist(user?.email));
  }, [user]);

  const signIn = (email, password) => {
    const account = getUsers().find(
      (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password
    );
    if (!account) return { ok: false, message: "The email address or password is incorrect." };
    const sessionUser = { ...account };
    delete sessionUser.password;
    saveSession(sessionUser);
    setUser(sessionUser);
    return { ok: true };
  };

  const signUp = (details) => {
    const users = getUsers();
    if (users.some((entry) => entry.email.toLowerCase() === details.email.trim().toLowerCase())) {
      return { ok: false, message: "This email is already registered. Try logging in." };
    }
    const account = { ...details, email: details.email.trim(), address: "" };
    writeUsers([...users, account]);
    const sessionUser = { ...account };
    delete sessionUser.password;
    saveSession(sessionUser);
    setUser(sessionUser);
    return { ok: true };
  };

  const signOut = () => {
    localStorage.removeItem("noma_session");
    setUser(null);
    setWishlist([]);
  };

  const updateProfile = (profile) => {
    const updatedUser = { ...user, ...profile };
    const users = getUsers().map((entry) =>
      entry.email.toLowerCase() === user.email.toLowerCase()
        ? { ...entry, ...profile }
        : entry
    );
    writeUsers(users);
    saveSession(updatedUser);
    setUser(updatedUser);
  };

  const toggleWishlist = (productId) => {
    if (!user) return false;
    const nextWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(nextWishlist);
    saveWishlist(user.email, nextWishlist);
    return true;
  };

  return (
    <SiteLayout user={user} wishlistCount={wishlist.length} onLogout={signOut}>
      <Routes>
        <Route path="/" element={<HomePage user={user} wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
        <Route path="/login" element={<AuthPages mode="login" onSignIn={signIn} />} />
        <Route path="/register" element={<AuthPages mode="register" onSignUp={signUp} />} />
        <Route path="/profile" element={<ProtectedRoute user={user}><AccountPages mode="profile" user={user} onSave={updateProfile} /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute user={user}><AccountPages mode="wishlist" wishlist={wishlist} onToggleWishlist={toggleWishlist} /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute user={user}><AccountPages mode="orders" user={user} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default function App() {
  return (
    <StandardErrorBoundry>
      <BrowserRouter>
        <ShopApp />
      </BrowserRouter>
    </StandardErrorBoundry>
  );
}