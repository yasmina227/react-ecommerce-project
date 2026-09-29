// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function SellerProfile() {
//   const [seller, setSeller] = useState(null);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [businessName, setBusinessName] = useState("");

//   useEffect(() => {
//     const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

//     const currentSellerId = Number(
//       localStorage.getItem("currentSellerId")
//     );

//     const currentSeller = sellers.find(
//       (seller) => seller.id === currentSellerId
//     );

//     if (currentSeller) {
//       setSeller(currentSeller);
//       setName(currentSeller.name);
//       setEmail(currentSeller.email);
//       setPhone(currentSeller.phone);
//       setBusinessName(currentSeller.businessName);
//     }
//   }, []);

//   const saveChanges = () => {
//     const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

//     const updatedSeller = {
//       ...seller,
//       name,
//       email,
//       phone,
//       businessName,
//     };

//     const updatedSellers = sellers.map((item) =>
//       item.id === seller.id ? updatedSeller : item
//     );

//     localStorage.setItem("sellers", JSON.stringify(updatedSellers));

//     setSeller(updatedSeller);

//     alert("Seller profile updated successfully!");
//   };

//   if (!seller) {
//     return (
//       <div className="d-flex">
//         <AdminSidebar />

//         <div className="container p-4">
//           <h3>Seller Profile</h3>
//           <p>No seller selected.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container p-4">
//         <h2 className="mb-4">Seller Profile</h2>

//         <div className="card p-4 shadow-sm" style={{ maxWidth: "600px" }}>
//           <div className="mb-3">
//             <label className="form-label">Seller Name</label>
//             <input
//               className="form-control"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Phone</label>
//             <input
//               className="form-control"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Business Name</label>
//             <input
//               className="form-control"
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//             />
//           </div>

//           <button className="btn btn-primary" onClick={saveChanges}>
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerProfile;