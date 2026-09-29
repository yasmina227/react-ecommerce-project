import { useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../services/adminService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [categoriesData, productsData] = await Promise.all([
        getAllCategories(),
        getAllProducts(),
      ]);

      setProducts(productsData);

      const apiCategories = categoriesData.map((name) => {
        const categoryName =
          typeof name === "string" ? name : name.name || name.slug;

        return {
          id: `api-${categoryName}`,
          name: categoryName,
          deleted: false,
        };
      });

      const localCategories = JSON.parse(
        localStorage.getItem("adminCategories") || "[]"
      );

      const apiNames = apiCategories.map((c) => c.name.toLowerCase());

      const onlyLocalCategories = localCategories
        .filter(
          (localCat) => !apiNames.includes(localCat.name.toLowerCase())
        )
        .map((cat) => ({
          ...cat,
          id: `local-${cat.name}-${cat.id}`,
        }));

      const merged = [...apiCategories, ...onlyLocalCategories];

      setCategories(merged);
    } catch (error) {
      console.log(error);
      alert("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && categories.length > 0) {
      localStorage.setItem("adminCategories", JSON.stringify(categories));
    }
  }, [categories, loading]);

  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter category name.");
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: categoryName }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        deleted: false,
      };
      setCategories([...categories, newCategory]);
    }

    setCategoryName("");
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, deleted: true } : category
      )
    );
  };

  const getProductCount = (categoryName) => {
    return products.filter((product) => {
      const productCat = product.category?.toLowerCase().trim();
      const targetCat = categoryName?.toLowerCase().trim();
      return productCat === targetCat;
    }).length;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Category Management</h1>
          <p>Manage product categories.</p>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="dashboard-box mt-4">
          <h4>{editingCategory ? "Edit Category" : "Add Category"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mt-1">
              <div className="col-md-8">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <button type="submit" className="btn btn-primary me-2">
                  {editingCategory ? "Update Category" : "Add Category"}
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
              <th>Category</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.filter((c) => !c.deleted && getProductCount(c.name) > 0)
              .length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No categories found
                </td>
              </tr>
            ) : (
              categories
                .filter((c) => !c.deleted && getProductCount(c.name) > 0)
                .map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{getProductCount(category.name)}</td>
                    <td>
                      <span
                        className={`badge ${
                          category.deleted ? "bg-secondary" : "bg-success"
                        }`}
                      >
                        {category.deleted ? "Deleted" : "Active"}
                      </span>
                    </td>

                    <td>
                      {!category.deleted && (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category.id)}
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

export default Categories;