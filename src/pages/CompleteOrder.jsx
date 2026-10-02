import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Shipping address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City / Governorate is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      sessionStorage.setItem("guestCustomer", JSON.stringify(formData));

      navigate("/cart/confirm");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-header bg-info text-white py-3">
          <h4 className="mb-0 fs-5 d-flex align-items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-13z" />
              <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 2 10z" />
            </svg>
            Shipping Details
          </h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            {/* fullName */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            {/* email & phone */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="01012345678"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>

            {/*   city */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label fw-semibold">
                City / Governorate <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                placeholder="Cairo, Alexandria..."
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            {/* address   */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-semibold">
                Street Address <span className="text-danger">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                placeholder="Building number, street name, apartment..."
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>

            {/* orderNotes */}
            <div className="mb-4">
              <label htmlFor="notes" className="form-label text-muted">
                Order Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="2"
                className="form-control"
                placeholder="Special instructions for delivery..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* submitButton */}
            <button
              type="submit"
              className="btn btn-info w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
            >
              <span>Proceed to Confirmation</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
