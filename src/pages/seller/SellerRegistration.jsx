import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerRegistration() {
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.storeName || !formData.email || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("sellerProfile", JSON.stringify(formData));
    alert("Registered successfully!");
    navigate("/seller/profile");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Seller Registration</h1>
          <p>Register as a seller.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Store Name</label>
            <input
              type="text"
              name="storeName"
              className="form-control"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Enter store name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerRegistration;