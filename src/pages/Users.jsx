// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Users() {
//   const [users, setUsers] = useState(() => {
//     const savedUsers = localStorage.getItem("users");

//     if (savedUsers) {
//       return JSON.parse(savedUsers);
//     }

//     return [
//       {
//         id: 1,
//         name: "Ahmed",
//         email: "ahmed@gmail.com",
//         role: "Customer",
//         status: "Active",
//       },
//       {
//         id: 2,
//         name: "Sarah",
//         email: "sarah@gmail.com",
//         role: "Seller",
//         status: "Active",
//       },
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users]);

//   const approveUser = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id
//           ? { ...user, status: "Approved" }
//           : user
//       )
//     );
//   };

//   const restrictUser = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id
//           ? { ...user, status: "Restricted" }
//           : user
//       )
//     );
//   };

//   const deleteUser = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id
//           ? { ...user, status: "Deleted" }
//           : user
//       )
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container mt-5">
//         <h1 className="mb-4">Users Management</h1>

//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>

//                 <td>
//                   <span
//                     className={
//                       user.status === "Deleted"
//                         ? "badge bg-danger"
//                         : user.status === "Restricted"
//                         ? "badge bg-warning text-dark"
//                         : "badge bg-success"
//                     }
//                   >
//                     {user.status}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     className="btn btn-success btn-sm me-2"
//                     onClick={() => approveUser(user.id)}
//                   >
//                     Approve
//                   </button>

//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => restrictUser(user.id)}
//                   >
//                     Restrict
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteUser(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Users;