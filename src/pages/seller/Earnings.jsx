import { useEffect, useState } from "react";

function Earnings() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("sellerOrders");
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
  }, []);

  const totalEarnings = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + Number(order.total), 0);

  const availableBalance = totalEarnings * 0.5;
  const totalPayouts = totalEarnings * 0.5;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Earnings & Payouts</h1>
          <p>Track your earnings and payouts.</p>
        </div>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Earnings</p>
              <h2>${totalEarnings}</h2>
            </div>
            <i className="bi bi-cash-stack"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Available Balance</p>
              <h2>${availableBalance.toFixed(2)}</h2>
            </div>
            <i className="bi bi-wallet2"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Payouts</p>
              <h2>${totalPayouts.toFixed(2)}</h2>
            </div>
            <i className="bi bi-credit-card"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;