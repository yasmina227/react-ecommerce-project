// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function PromoCodes() {
//   const [promoCodes, setPromoCodes] = useState(() => {
//     const saved = localStorage.getItem("promoCodes");

//     return saved
//       ? JSON.parse(saved)
//       : [
//           {
//             id: 1,
//             code: "SUMMER20",
//             discount: 20,
//             type: "Percentage",
//             status: "Active",
//           },
//           {
//             id: 2,
//             code: "SAVE100",
//             discount: 100,
//             type: "Fixed",
//             status: "Active",
//           },
//         ];
//   });

//   useEffect(() => {
//     localStorage.setItem("promoCodes", JSON.stringify(promoCodes));
//   }, [promoCodes]);

//   const addPromoCode = () => {
//     const code = document.getElementById("promoCode").value;
//     const discount = document.getElementById("promoDiscount").value;
//     const type = document.getElementById("promoType").value;

//     if (!code || !discount) {
//       alert("Please enter all data");
//       return;
//     }

//     const newPromo = {
//       id: promoCodes.length + 1,
//       code,
//       discount: Number(discount),
//       type,
//       status: "Active",
//     };

//     setPromoCodes([...promoCodes, newPromo]);

//     document.getElementById("promoCode").value = "";
//     document.getElementById("promoDiscount").value = "";
//   };

//   const toggleStatus = (id) => {
//     setPromoCodes(
//       promoCodes.map((promo) =>
//         promo.id === id
//           ? {
//               ...promo,
//               status: promo.status === "Active" ? "Inactive" : "Active",
//             }
//           : promo
//       )
//     );
//   };

//   const deletePromoCode = (id) => {
//     setPromoCodes(promoCodes.filter((promo) => promo.id !== id));
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container-fluid p-4">
//         <h2 className="mb-4">Discounts & Promo Codes</h2>

//         <button
//           className="btn btn-primary mb-3"
//           data-bs-toggle="modal"
//           data-bs-target="#addPromoModal"
//         >
//           Add Promo Code
//         </button>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Promo Code</th>
//               <th>Discount</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {promoCodes.map((promo) => (
//               <tr key={promo.id}>
//                 <td>{promo.id}</td>
//                 <td>{promo.code}</td>
//                 <td>
//                   {promo.discount}
//                   {promo.type === "Percentage" ? "%" : " EGP"}
//                 </td>
//                 <td>{promo.type}</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       promo.status === "Active"
//                         ? "bg-success"
//                         : "bg-secondary"
//                     }`}
//                   >
//                     {promo.status}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => toggleStatus(promo.id)}
//                   >
//                     {promo.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deletePromoCode(promo.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Add Promo Modal */}
//         <div className="modal fade" id="addPromoModal">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Add Promo Code</h5>

//                 <button
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <input
//                   id="promoCode"
//                   className="form-control mb-3"
//                   placeholder="Promo Code"
//                 />

//                 <input
//                   id="promoDiscount"
//                   type="number"
//                   className="form-control mb-3"
//                   placeholder="Discount"
//                 />

//                 <select id="promoType" className="form-select">
//                   <option value="Percentage">Percentage</option>
//                   <option value="Fixed">Fixed Amount</option>
//                 </select>
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn btn-primary"
//                   onClick={addPromoCode}
//                   data-bs-dismiss="modal"
//                 >
//                   Add Promo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PromoCodes;