
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://dummyjson.com/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(API);

      const productsData = response.data.products.map((product) => ({
        id: product.id,
        name: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: product.thumbnail,
        deleted: false,
      }));

      setProducts(productsData);
    } catch (error) {
      console.log(error);
      alert("Could not load products.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image || "",
    });

    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter category.");
      return;
    }

    if (!formData.price) {
      alert("Please enter price.");
      return;
    }

    if (!formData.stock) {
      alert("Please enter stock.");
      return;
    }

    const productData = {
      title: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingProduct) {
        try {
          await axios.put(
            `${API}/${editingProduct.id}`,
            productData
          );
        } catch (error) {
          console.log("DummyJSON update:", error);
        }

        const updatedProduct = {
          ...editingProduct,
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image: formData.image || editingProduct.image,
        };

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id
              ? updatedProduct
              : product
          )
        );

        alert("Product updated successfully.");
      } else {
        let newId = Date.now();

        try {
          const response = await axios.post(API, productData);

          if (response.data && response.data.id) {
            newId = response.data.id;
          }
        } catch (error) {
          console.log("DummyJSON add:", error);
        }

        const newProduct = {
          id: newId,
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image: formData.image,
          deleted: false,
        };

        setProducts((prevProducts) => [
          ...prevProducts,
          newProduct,
        ]);

        alert("Product added successfully.");
      }

      setShowForm(false);

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });

      setEditingProduct(null);
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      try {
        await axios.delete(`${API}/${id}`);
      } catch (error) {
        console.log("DummyJSON delete:", error);
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? {
                ...product,
                deleted: true,
              }
            : product
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="page-label">MANAGEMENT</span>
          <h1>Product Management</h1>
          <p>Manage store products, prices and inventory.</p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="dashboard-box mt-4">
          <div className="box-header">
            <div>
              <span className="box-label">PRODUCT</span>
              <h4>
                {editingProduct
                  ? "Edit Product"
                  : "Add New Product"}
              </h4>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
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

            <div className="col-md-6">
              <label className="form-label">
                Category
              </label>

              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </div>

            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-12">
              <label className="form-label">
                Product Image URL
              </label>

              <input
                type="text"
                name="image"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            {formData.image && (
              <div className="col-12">
                <img
                  src={formData.image}
                  alt="Product Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                  }}
                />
              </div>
            )}

            <div className="col-12 mt-3">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleSubmit}
              >
                <i className="bi bi-check-lg me-2"></i>

                {editingProduct
                  ? "Update Product"
                  : "Add Product"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-box mt-4">
        <div className="box-header">
          <div>
            <span className="box-label">INVENTORY</span>
            <h4>All Products</h4>
          </div>

          <span className="orders-count">
            {products.filter((product) => !product.deleted).length}{" "}
            Active Products
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#f1f3f5",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-image"></i>
                        </div>
                      )}
                    </td>

                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    <td>{product.category}</td>

                    <td>
                      <strong>${product.price}</strong>
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      <span
                        className={`badge ${
                          product.deleted
                            ? "bg-secondary"
                            : "bg-success"
                        }`}
                      >
                        {product.deleted
                          ? "Deleted"
                          : "Active"}
                      </span>
                    </td>

                    <td>
                      {!product.deleted && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary me-2"
                            onClick={() =>
                              handleEdit(product)
                            }
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                          >
                            <i className="bi bi-trash me-1"></i>
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
    </div>
  );
}

export default Products;
