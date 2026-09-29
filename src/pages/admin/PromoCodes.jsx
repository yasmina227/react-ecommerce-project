import { useEffect, useState } from "react";

function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState(() => {
    const savedPromoCodes =
      localStorage.getItem("adminPromoCodes");

    return savedPromoCodes
      ? JSON.parse(savedPromoCodes)
      : [
          {
            id: 1,
            code: "WELCOME20",
            discount: 20,
            status: "Active",
            deleted: false,
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "adminPromoCodes",
      JSON.stringify(promoCodes)
    );
  }, [promoCodes]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setEditingPromo(null);

    setFormData({
      code: "",
      discount: "",
    });

    setShowForm(true);
  };

  const handleEdit = (promo) => {
    setEditingPromo(promo);

    setFormData({
      code: promo.code,
      discount: promo.discount,
    });

    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discount) {
      alert("Please enter code and discount.");
      return;
    }

    if (editingPromo) {
      setPromoCodes(
        promoCodes.map((promo) =>
          promo.id === editingPromo.id
            ? {
                ...promo,
                code: formData.code.toUpperCase(),
                discount: Number(formData.discount),
              }
            : promo
        )
      );
    } else {
      const newPromo = {
        id: Date.now(),
        code: formData.code.toUpperCase(),
        discount: Number(formData.discount),
        status: "Active",
        deleted: false,
      };

      setPromoCodes([...promoCodes, newPromo]);
    }

    setFormData({
      code: "",
      discount: "",
    });

    setEditingPromo(null);
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setPromoCodes(
      promoCodes.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              status:
                promo.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : promo
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this promo code?"
    );

    if (!confirmDelete) return;

    setPromoCodes(
      promoCodes.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              deleted: true,
            }
          : promo
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Discounts & Promo Codes</h1>
          <p>Manage discounts and promotional codes.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Promo Code
        </button>
      </div>

      {showForm && (
        <div className="dashboard-box mt-4">
          <h4>
            {editingPromo
              ? "Edit Promo Code"
              : "Add Promo Code"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label">
                  Promo Code
                </label>

                <input
                  type="text"
                  name="code"
                  className="form-control"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Example: WELCOME20"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Discount (%)
                </label>

                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  value={formData.discount}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  placeholder="20"
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                >
                  {editingPromo
                    ? "Update Promo Code"
                    : "Add Promo Code"}
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
              <th>Code</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {promoCodes.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No promo codes found
                </td>
              </tr>
            ) : (
              promoCodes.map((promo) => (
                <tr key={promo.id}>
                  <td>{promo.code}</td>

                  <td>{promo.discount}%</td>

                  <td>
                    <span
                      className={`badge ${
                        promo.deleted
                          ? "bg-secondary"
                          : promo.status === "Active"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {promo.deleted
                        ? "Deleted"
                        : promo.status}
                    </span>
                  </td>

                  <td>
                    {!promo.deleted && (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            handleEdit(promo)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            toggleStatus(promo.id)
                          }
                        >
                          {promo.status === "Active"
                            ? "Disable"
                            : "Activate"}
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(promo.id)
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

export default PromoCodes;