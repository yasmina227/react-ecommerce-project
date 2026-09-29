// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Sellers() {
//   const navigate = useNavigate();

//   const [sellers, setSellers] = useState(() => {
//     const savedSellers = localStorage.getItem("sellers");

//     return savedSellers
//       ? JSON.parse(savedSellers)
//       : [
//           {
//             id: 1,
//             name: "Sarah",
//             email: "sarah@gmail.com",
//             phone: "01000000000",
//             businessName: "Sarah Store",
//             products: 12,
//             status: "Active",
//           },
//           {
//             id: 2,
//             name: "Ahmed",
//             email: "ahmed@gmail.com",
//             phone: "01111111111",
//             businessName: "Ahmed Shop",
//             products: 8,
//             status: "Active",
//           },
//         ];
//   });

//   useEffect(() => {
//     localStorage.setItem("sellers", JSON.stringify(sellers));
//   }, [sellers]);

//   const addSeller = () => {
//     const name = document.getElementById("sellerName").value;
//     const email = document.getElementById("sellerEmail").value;
//     const phone = document.getElementById("sellerPhone").value;
//     const businessName = document.getElementById("businessName").value;

//     const newSeller = {
//       id: sellers.length + 1,
//       name,
//       email,
//       phone,
//       businessName,
//       products: 0,
//       status: "Pending",
//     };

//     setSellers([...sellers, newSeller]);

//     document.getElementById("sellerName").value = "";
//     document.getElementById("sellerEmail").value = "";
//     document.getElementById("sellerPhone").value = "";
//     document.getElementById("businessName").value = "";
//   };

//   const approveSeller = (id) => {
//     setSellers(
//       sellers.map((seller) =>
//         seller.id === id ? { ...seller, status: "Approved" } : seller
//       )
//     );
//   };

//   const restrictSeller = (id) => {
//     setSellers(
//       sellers.map((seller) =>
//         seller.id === id ? { ...seller, status: "Restricted" } : seller
//       )
//     );
//   };

//   const openProfile = (id) => {
//     localStorage.setItem("currentSellerId", id);
//     navigate("/admin/seller-profile");
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container-fluid p-4">
//         <h2 className="mb-4">Seller Management</h2>

//         <button
//           className="btn btn-primary mb-3"
//           data-bs-toggle="modal"
//           data-bs-target="#addSellerModal"
//         >
//           Add Seller
//         </button>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Business</th>
//               <th>Products</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {sellers.map((seller) => (
//               <tr key={seller.id}>
//                 <td>{seller.id}</td>
//                 <td>{seller.name}</td>
//                 <td>{seller.email}</td>
//                 <td>{seller.phone}</td>
//                 <td>{seller.businessName}</td>
//                 <td>{seller.products}</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       seller.status === "Restricted"
//                         ? "bg-warning text-dark"
//                         : seller.status === "Pending"
//                         ? "bg-secondary"
//                         : "bg-success"
//                     }`}
//                   >
//                     {seller.status}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     className="btn btn-info btn-sm me-2"
//                     onClick={() => openProfile(seller.id)}
//                   >
//                     Profile
//                   </button>

//                   <button
//                     className="btn btn-success btn-sm me-2"
//                     onClick={() => approveSeller(seller.id)}
//                   >
//                     Approve
//                   </button>

//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => restrictSeller(seller.id)}
//                   >
//                     Restrict
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Add Seller Modal */}
//         <div className="modal fade" id="addSellerModal">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Seller Registration</h5>
//                 <button
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <input
//                   id="sellerName"
//                   className="form-control mb-2"
//                   placeholder="Seller Name"
//                 />

//                 <input
//                   id="sellerEmail"
//                   className="form-control mb-2"
//                   placeholder="Email"
//                 />

//                 <input
//                   id="sellerPhone"
//                   className="form-control mb-2"
//                   placeholder="Phone"
//                 />

//                 <input
//                   id="businessName"
//                   className="form-control"
//                   placeholder="Business Name"
//                 />
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn btn-primary"
//                   onClick={addSeller}
//                   data-bs-dismiss="modal"
//                 >
//                   Add Seller
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sellers;