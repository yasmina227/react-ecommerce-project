// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Orders() {
//   const [orders, setOrders] = useState(() => {
//     const savedOrders = localStorage.getItem("orders");

//     if (savedOrders) {
//       return JSON.parse(savedOrders);
//     }

//     return [
//       {
//         id: 1,
//         customer: "Ahmed Ali",
//         total: 1200,
//         status: "Pending",
//         shippingStatus: "Preparing",
//       },
//       {
//         id: 2,
//         customer: "Sarah Mohamed",
//         total: 850,
//         status: "Shipped",
//         shippingStatus: "Shipped",
//       },
//       {
//         id: 3,
//         customer: "Omar Hassan",
//         total: 1500,
//         status: "Delivered",
//         shippingStatus: "Delivered",
//       },
//       {
//         id: 4,
//         customer: "Mariam Ali",
//         total: 600,
//         status: "Cancelled",
//         shippingStatus: "Preparing",
//       },
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   const updateStatus = (id, status) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === id
//           ? {
//               ...order,
//               status: status,
//             }
//           : order
//       )
//     );
//   };

//   const updateShippingStatus = (id, shippingStatus) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === id
//           ? {
//               ...order,
//               shippingStatus: shippingStatus,
//             }
//           : order
//       )
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container mt-5">
//         <h1 className="mb-4">Order & Shipping Management</h1>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Total</th>
//               <th>Order Status</th>
//               <th>Shipping Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>#{order.id}</td>

//                 <td>{order.customer}</td>

//                 <td>{order.total} EGP</td>

//                 <td>
//                   <span
//                     className={
//                       order.status === "Delivered"
//                         ? "badge bg-success"
//                         : order.status === "Cancelled"
//                         ? "badge bg-danger"
//                         : order.status === "Shipped"
//                         ? "badge bg-primary"
//                         : "badge bg-warning text-dark"
//                     }
//                   >
//                     {order.status}
//                   </span>

//                   <select
//                     className="form-select mt-2"
//                     value={order.status}
//                     onChange={(e) =>
//                       updateStatus(order.id, e.target.value)
//                     }
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </td>

//                 <td>
//                   <span
//                     className={
//                       order.shippingStatus === "Delivered"
//                         ? "badge bg-success"
//                         : order.shippingStatus === "Out for Delivery"
//                         ? "badge bg-primary"
//                         : "badge bg-warning text-dark"
//                     }
//                   >
//                     {order.shippingStatus}
//                   </span>

//                   <select
//                     className="form-select mt-2"
//                     value={order.shippingStatus}
//                     onChange={(e) =>
//                       updateShippingStatus(
//                         order.id,
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="Preparing">Preparing</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Out for Delivery">
//                       Out for Delivery
//                     </option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Orders;