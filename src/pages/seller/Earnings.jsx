function Earnings() {
  return (
    <div>
      <h1>Earnings & Payouts</h1>
      <p>Track your earnings and payouts.</p>

      <div className="row g-4 mt-3">

        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Earnings</p>
              <h2>$5,800</h2>
            </div>
            <i className="bi bi-cash-stack"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Available Balance</p>
              <h2>$1,450</h2>
            </div>
            <i className="bi bi-wallet2"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div>
              <p>Total Payouts</p>
              <h2>$4,350</h2>
            </div>
            <i className="bi bi-credit-card"></i>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Earnings;