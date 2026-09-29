// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import StandardErrorBoundry from "./components/errorBoundry/StandardErrorBoundry.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
//       //  ============== MALAK==========================
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import Users from "./pages/Users.jsx";
// import Sellers from "./pages/Sellers.jsx";
// import SellerProducts from "./pages/SellerProducts.jsx";
// import Products from "./pages/Products.jsx";
// import Categories from "./pages/Categories.jsx";
// import Orders from "./pages/Orders.jsx";
// import Banners from "./pages/Banners.jsx";
// import SellerOrders from "./pages/SellerOrders.jsx";
// import SellerProfile from "./pages/SellerProfile.jsx";
// import PromoCodes from "./pages/PromoCodes.jsx";
// import SellerEarnings from "./pages/SellerEarnings.jsx";
// function App() {
//   return (
//     <BrowserRouter>
//       <StandardErrorBoundry>
//         <Routes>

//           <Route path="/" element={<h1>Home Page</h1>} />

//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/users" element={<Users />} />
//           <Route path="/admin/sellers" element={<Sellers />} />
//           <Route path="/admin/seller-products" element={<SellerProducts />} />
//           <Route path="/admin/products" element={<Products />} />
//           <Route path="/admin/categories" element={<Categories />} />
//           <Route path="/admin/orders" element={<Orders />} />
//           <Route path="/admin/banners" element={<Banners />} />
//           <Route path="/admin/seller-orders" element={<SellerOrders />} />
//           <Route path="/error" element={<ErrorPage />} />
//           <Route path="/admin/seller-profile" element={<SellerProfile />} />
//           <Route path="/admin/promo-codes" element={<PromoCodes />} />

// <Route
//   path="/admin/seller-earnings"
//   element={<SellerEarnings />}
// />

//         </Routes>
//       </StandardErrorBoundry>
//     </BrowserRouter>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

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
    <Routes>

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
  );
}

export default App;
