function SellerRegistration() {
  return (
    <div>
      <h1>Seller Registration</h1>
      <p>Register as a seller.</p>

      <div className="dashboard-box mt-4">

        <div className="mb-3">
          <label className="form-label">Store Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter store name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
          />
        </div>

        <button className="btn btn-primary">
          Register
        </button>

      </div>
    </div>
  );
}

export default SellerRegistration;