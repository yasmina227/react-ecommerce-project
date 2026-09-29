// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function SellerEarnings() {
//   const [earnings, setEarnings] = useState(() => {
//     const saved = localStorage.getItem("sellerEarnings");

//     return saved
//       ? JSON.parse(saved)
//       : [
//           {
//             id: 1,
//             seller: "Sarah Store",
//             totalSales: 15000,
//             platformFee: 1500,
//             earnings: 13500,
//             payoutStatus: "Paid",
//           },
//           {
//             id: 2,
//             seller: "Ahmed Shop",
//             totalSales: 10000,
//             platformFee: 1000,
//             earnings: 9000,
//             payoutStatus: "Pending",
//           },
//         ];
//   });

//   useEffect(() => {
//     localStorage.setItem("sellerEarnings", JSON.stringify(earnings));
//   }, [earnings]);

//   const updatePayoutStatus = (id, status) => {
//     setEarnings(
//       earnings.map((item) =>
//         item.id === id
//           ? { ...item, payoutStatus: status }
//           : item
//       )
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container-fluid p-4">
//         <h2 className="mb-4">Seller Earnings & Payouts</h2>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Seller</th>
//               <th>Total Sales</th>
//               <th>Platform Fee</th>
//               <th>Earnings</th>
//               <th>Payout Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {earnings.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.seller}</td>
//                 <td>{item.totalSales} EGP</td>
//                 <td>{item.platformFee} EGP</td>
//                 <td>{item.earnings} EGP</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       item.payoutStatus === "Paid"
//                         ? "bg-success"
//                         : "bg-warning text-dark"
//                     }`}
//                   >
//                     {item.payoutStatus}
//                   </span>
//                 </td>

//                 <td>
//                   {item.payoutStatus === "Pending" && (
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={() =>
//                         updatePayoutStatus(item.id, "Paid")
//                       }
//                     >
//                       Mark as Paid
//                     </button>
//                   )}

//                   {item.payoutStatus === "Paid" && (
//                     <button
//                       className="btn btn-secondary btn-sm"
//                       onClick={() =>
//                         updatePayoutStatus(item.id, "Pending")
//                       }
//                     >
//                       Mark as Pending
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SellerEarnings;