// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data.products);
//       });
//   }, []);

//   const editProduct = (product) => {
//     document.getElementById("editProductId").value = product.id;
//     document.getElementById("editProductName").value = product.title;
//     document.getElementById("editProductPrice").value = product.price;
//     document.getElementById("editProductStock").value = product.stock;
//   };

//   const saveChanges = () => {
//     const id = Number(document.getElementById("editProductId").value);
//     const title = document.getElementById("editProductName").value;
//     const price = document.getElementById("editProductPrice").value;
//     const stock = document.getElementById("editProductStock").value;

//     if (title && price && stock) {
//       setProducts(
//         products.map((product) =>
//           product.id === id
//             ? {
//                 ...product,
//                 title: title,
//                 price: Number(price),
//                 stock: Number(stock),
//               }
//             : product
//         )
//       );
//     }
//   };

//   const deleteProduct = (id) => {
//     setProducts(
//       products.filter((product) => product.id !== id)
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container mt-5">
//         <h1 className="mb-4">Product Management</h1>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Product</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.title}</td>
//                 <td>{product.category}</td>
//                 <td>{product.price} EGP</td>
//                 <td>{product.stock}</td>

//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     data-bs-toggle="modal"
//                     data-bs-target="#editProductModal"
//                     onClick={() => editProduct(product)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteProduct(product.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Edit Product Modal */}
//         <div
//           className="modal fade"
//           id="editProductModal"
//           tabIndex="-1"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">

//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   Edit Product
//                 </h5>

//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>

//               <div className="modal-body">

//                 <input
//                   type="hidden"
//                   id="editProductId"
//                 />

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Product Name
//                   </label>

//                   <input
//                     type="text"
//                     id="editProductName"
//                     className="form-control"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Price
//                   </label>

//                   <input
//                     type="number"
//                     id="editProductPrice"
//                     className="form-control"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Stock
//                   </label>

//                   <input
//                     type="number"
//                     id="editProductStock"
//                     className="form-control"
//                   />
//                 </div>

//               </div>

//               <div className="modal-footer">

//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={saveChanges}
//                   data-bs-dismiss="modal"
//                 >
//                   Save Changes
//                 </button>

//               </div>

//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Products;