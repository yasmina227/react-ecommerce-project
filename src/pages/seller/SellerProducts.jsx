import { useEffect, useState } from "react";

function SellerProducts() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("sellerProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            name: "Wireless Headphones",
            price: 80,
            stock: 20,
          },
          {
            id: 2,
            name: "Smart Watch",
            price: 120,
            stock: 15,
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    localStorage.setItem("sellerProducts", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      price: "",
      stock: "",
    });

    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });

    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      alert("Please fill all fields");
      return;
    }

    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: formData.name,
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : product
      );

      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      setProducts([...products, newProduct]);
    }

    setShowForm(false);

    setFormData({
      name: "",
      price: "",
      stock: "",
    });
  };

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>My Products</h1>
          <p>Manage your products.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={openAddForm}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="dashboard-box mb-4">
          <h4 className="mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              <i className="bi bi-check-lg me-2"></i>
              {editingProduct ? "Update Product" : "Add Product"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="dashboard-box">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>

                  <td>${product.price}</td>

                  <td>{product.stock}</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openEditForm(product)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>
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

export default SellerProducts;