import { useEffect, useState } from "react";

function SellerProfile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("sellerProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : { storeName: "", email: "", phone: "" };
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("sellerProfile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.storeName || !formData.email || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Seller Profile</h1>
          <p>Manage your seller information.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Store Name</label>
            <input
              type="text"
              name="storeName"
              className="form-control"
              value={formData.storeName}
              onChange={handleChange}
              readOnly={!isEditing}
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
              readOnly={!isEditing}
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
              readOnly={!isEditing}
            />
          </div>

          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEdit}
            >
              <i className="bi bi-pencil me-2"></i>
              Edit Profile
            </button>
          ) : (
            <div>
              <button type="submit" className="btn btn-success me-2">
                <i className="bi bi-check-lg me-2"></i>
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SellerProfile;