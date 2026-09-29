import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://dummyjson.com/products";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(
        "adminCategories",
        JSON.stringify(categories)
      );
    }
  }, [categories]);

  const getProducts = async () => {
    try {
      const savedCategories =
        localStorage.getItem("adminCategories");

      const response = await axios.get(API);

      setProducts(response.data.products);

      const categoryNames = [
        ...new Set(
          response.data.products.map(
            (product) => product.category
          )
        ),
      ];

      const newCategories = categoryNames.map(
        (name, index) => ({
          id: index + 1,
          name: name,
          deleted: false,
        })
      );

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        setCategories(newCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            ? {
                ...category,
                name: categoryName,
              }
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
        category.id === id
          ? {
              ...category,
              deleted: true,
            }
          : category
      )
    );
  };

  const getProductCount = (categoryName) => {
    return products.filter(
      (product) => product.category === categoryName
    ).length;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Category Management</h1>
          <p>Manage product categories.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="dashboard-box mt-4">
          <h4>
            {editingCategory
              ? "Edit Category"
              : "Add Category"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mt-1">
              <div className="col-md-8">
                <label className="form-label">
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                  placeholder="Enter category name"
                />
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Add Category"}
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
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>

                  <td>
                    {getProductCount(category.name)}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        category.deleted
                          ? "bg-secondary"
                          : "bg-success"
                      }`}
                    >
                      {category.deleted
                        ? "Deleted"
                        : "Active"}
                    </span>
                  </td>

                  <td>
                    {!category.deleted && (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            handleEdit(category)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(category.id)
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

export default Categories;