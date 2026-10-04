/*import "./App.css";
import StandardErrorBoundry from "./components/errorBoundry/StandardErrorBoundry.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Confirm from "./pages/Confirm.jsx";
import CompleteOrder from "./pages/CompleteOrder.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import StorefrontLayout from "./components/storefront/StorefrontLayout.jsx";

// ================= ADMIN =================
import AdminLayout from "./layouts/AdminLayout";
import SellerLayout from "./layouts/SellerLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Shipping from "./pages/admin/Shipping";
import PromoCodes from "./pages/admin/PromoCodes";
import Banners from "./pages/admin/Banners";

// Seller Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerRegistration from "./pages/seller/SellerRegistration";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerProducts from "./pages/seller/SellerProducts";
import Inventory from "./pages/seller/Inventory";
import SellerOrders from "./pages/seller/SellerOrders";
import Earnings from "./pages/seller/Earnings";

function App() {
  return (
    <StandardErrorBoundry>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/profile" element={<AccountPage />} />
              <Route
                path="/orders"
                element={<AccountPage initialTab="orders" />}
              />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/cart/confirm" element={<Confirm />} />
              <Route path="/cart/completeOrder" element={<CompleteOrder />} />
              <Route path="/track-order" element={<TrackOrder />} />
            </Route>

            {/* ================= ADMIN ================= */
    

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
  
    <ProductProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
