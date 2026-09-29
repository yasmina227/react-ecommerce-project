// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Banners() {
//   const [banners, setBanners] = useState(() => {
//     const savedBanners = localStorage.getItem("banners");

//     if (savedBanners) {
//       return JSON.parse(savedBanners);
//     }

//     return [
//       {
//         id: 1,
//         title: "Summer Sale",
//         description: "Up to 50% off",
//       },
//       {
//         id: 2,
//         title: "New Collection",
//         description: "Discover our latest products",
//       },
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem("banners", JSON.stringify(banners));
//   }, [banners]);

//   const addBanner = () => {
//     const title = document.getElementById("bannerTitle").value;
//     const description =
//       document.getElementById("bannerDescription").value;

//     if (title && description) {
//       const newBanner = {
//         id: banners.length + 1,
//         title: title,
//         description: description,
//       };

//       setBanners([...banners, newBanner]);

//       document.getElementById("bannerTitle").value = "";
//       document.getElementById("bannerDescription").value = "";
//     }
//   };

//   const editBanner = (banner) => {
//     document.getElementById("editBannerId").value = banner.id;
//     document.getElementById("editBannerTitle").value = banner.title;
//     document.getElementById("editBannerDescription").value =
//       banner.description;
//   };

//   const saveChanges = () => {
//     const id = Number(
//       document.getElementById("editBannerId").value
//     );

//     const title =
//       document.getElementById("editBannerTitle").value;

//     const description =
//       document.getElementById("editBannerDescription").value;

//     if (title && description) {
//       setBanners(
//         banners.map((banner) =>
//           banner.id === id
//             ? {
//                 ...banner,
//                 title: title,
//                 description: description,
//               }
//             : banner
//         )
//       );
//     }
//   };

//   const deleteBanner = (id) => {
//     setBanners(
//       banners.filter((banner) => banner.id !== id)
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container mt-5">

//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h1>Banner Management</h1>

//           <button
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#addBannerModal"
//           >
//             Add Banner
//           </button>
//         </div>

//         <table className="table table-bordered table-hover">

//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {banners.map((banner) => (
//               <tr key={banner.id}>

//                 <td>{banner.id}</td>

//                 <td>{banner.title}</td>

//                 <td>{banner.description}</td>

//                 <td>

//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     data-bs-toggle="modal"
//                     data-bs-target="#editBannerModal"
//                     onClick={() => editBanner(banner)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteBanner(banner.id)}
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>


//         {/* Add Banner Modal */}

//         <div
//           className="modal fade"
//           id="addBannerModal"
//           tabIndex="-1"
//         >

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">

//                 <h5 className="modal-title">
//                   Add Banner
//                 </h5>

//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>

//               </div>

//               <div className="modal-body">

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Banner Title
//                   </label>

//                   <input
//                     type="text"
//                     id="bannerTitle"
//                     className="form-control"
//                     placeholder="Enter banner title"
//                   />

//                 </div>

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Description
//                   </label>

//                   <input
//                     type="text"
//                     id="bannerDescription"
//                     className="form-control"
//                     placeholder="Enter description"
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
//                   onClick={addBanner}
//                   data-bs-dismiss="modal"
//                 >
//                   Add Banner
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* Edit Banner Modal */}

//         <div
//           className="modal fade"
//           id="editBannerModal"
//           tabIndex="-1"
//         >

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">

//                 <h5 className="modal-title">
//                   Edit Banner
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
//                   id="editBannerId"
//                 />

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Banner Title
//                   </label>

//                   <input
//                     type="text"
//                     id="editBannerTitle"
//                     className="form-control"
//                   />

//                 </div>

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Description
//                   </label>

//                   <input
//                     type="text"
//                     id="editBannerDescription"
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

// export default Banners;