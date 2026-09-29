import { useEffect, useState } from "react";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadData = () => {
    const savedProducts =
      localStorage.getItem("sellerProducts");

    const savedOrders =
      localStorage.getItem("sellerOrders");

    setProducts(
      savedProducts ? JSON.parse(savedProducts) : []
    );

    setOrders(
      savedOrders ? JSON.parse(savedOrders) : []
    );
  };

  useEffect(() => {
    loadData();

    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalEarnings = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) => total + Number(order.total),
      0
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Seller Dashboard</h1>
          <p>Welcome to your seller dashboard.</p>
        </div>
      </div>

      <div className="row g-4 mt-3">

        {/* Products */}
        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Products</p>
              <h2>{totalProducts}</h2>
            </div>

            <i className="bi bi-box-seam"></i>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Orders</p>
              <h2>{totalOrders}</h2>
            </div>

            <i className="bi bi-cart"></i>
          </div>
        </div>

        {/* Earnings */}
        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Earnings</p>
              <h2>${totalEarnings}</h2>
            </div>

            <i className="bi bi-cash-stack"></i>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SellerDashboard;