import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("sellerProducts");

    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("sellerProducts", JSON.stringify(products));
  }, [products]);

  const updateStock = (id, newStock) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: Number(newStock),
            }
          : product
      )
    );
  };

  const getStatus = (stock) => {
    if (stock === 0) {
      return (
        <span className="badge bg-danger">
          Out of Stock
        </span>
      );
    }

    if (stock <= 5) {
      return (
        <span className="badge bg-warning text-dark">
          Low Stock
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        In Stock
      </span>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Inventory</h1>
          <p>Manage your product stock.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Update</th>
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

                  <td>{product.stock}</td>

                  <td>{getStatus(product.stock)}</td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={product.stock}
                      onChange={(e) =>
                        updateStock(product.id, e.target.value)
                      }
                    />
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

export default Inventory;