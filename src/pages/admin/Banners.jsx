import { useEffect, useState } from "react";
function Banners() {
  const [banners, setBanners] = useState(() => {
    const savedBanners =
      localStorage.getItem("adminBanners");

    return savedBanners
      ? JSON.parse(savedBanners)
      : [
          {
            id: 1,
            name: "Homepage Banner 1",
            title: "Summer Sale",
            status: "Active",
            deleted: false,
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "adminBanners",
      JSON.stringify(banners)
    );
  }, [banners]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setEditingBanner(null);

    setFormData({
      name: "",
      title: "",
    });

    setShowForm(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);

    setFormData({
      name: banner.name,
      title: banner.title,
    });

    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.title) {
      alert("Please enter banner name and title.");
      return;
    }

    if (editingBanner) {
      setBanners(
        banners.map((banner) =>
          banner.id === editingBanner.id
            ? {
                ...banner,
                name: formData.name,
                title: formData.title,
              }
            : banner
        )
      );
    } else {
      const newBanner = {
        id: Date.now(),
        name: formData.name,
        title: formData.title,
        status: "Active",
        deleted: false,
      };

      setBanners([...banners, newBanner]);
    }

    setFormData({
      name: "",
      title: "",
    });

    setEditingBanner(null);
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? {
              ...banner,
              status:
                banner.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : banner
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? {
              ...banner,
              deleted: true,
            }
          : banner
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Content Management</h1>
          <p>Manage homepage banners.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Banner
        </button>
      </div>

      {showForm && (
        <div className="dashboard-box mt-4">
          <h4>
            {editingBanner
              ? "Edit Banner"
              : "Add Banner"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label">
                  Banner Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Homepage Banner 2"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Banner Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Winter Sale"
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                >
                  {editingBanner
                    ? "Update Banner"
                    : "Add Banner"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-box mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Banner</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No banners found
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id}>
                  <td>{banner.name}</td>

                  <td>{banner.title}</td>

                  <td>
                    <span
                      className={`badge ${
                        banner.deleted
                          ? "bg-secondary"
                          : banner.status === "Active"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {banner.deleted
                        ? "Deleted"
                        : banner.status}
                    </span>
                  </td>

                  <td>
                    {!banner.deleted && (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            handleEdit(banner)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            toggleStatus(banner.id)
                          }
                        >
                          {banner.status === "Active"
                            ? "Disable"
                            : "Activate"}
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(banner.id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Banners;