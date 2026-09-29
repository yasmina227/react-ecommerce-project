import "./App.css";
import StandardErrorBoundry from "./components/errorBoundry/StandardErrorBoundry.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Confirm from "./pages/Confirm.jsx";
import CompleteOrder from "./pages/CompleteOrder.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";

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
            {/* ================= CART (Person 3) ================= */}
            <Route path="/" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/confirm" element={<Confirm />} />
            <Route path="/cart/completeOrder" element={<CompleteOrder />} />
            <Route path="/track-order" element={<TrackOrder />} />

            {/* ================= ADMIN ================= */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="promo-codes" element={<PromoCodes />} />
              <Route path="banners" element={<Banners />} />
            </Route>

            {/* ================= SELLER ================= */}
            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<SellerDashboard />} />
              <Route path="register" element={<SellerRegistration />} />
              <Route path="profile" element={<SellerProfile />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="orders" element={<SellerOrders />} />
              <Route path="earnings" element={<Earnings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </StandardErrorBoundry>
  );
}

export default App;