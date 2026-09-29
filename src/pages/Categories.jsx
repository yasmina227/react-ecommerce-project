// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/admin/AdminSidebar";

// function Categories() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch("https://dummyjson.com/products/categories")
//       .then((response) => response.json())
//       .then((data) => {
//         setCategories(data);
//       });
//   }, []);

//   const addCategory = () => {
//     const name = document.getElementById("categoryName").value;

//     if (name) {
//       setCategories([...categories, name]);
//       document.getElementById("categoryName").value = "";
//     }
//   };

//   const editCategory = (index) => {
//     document.getElementById("editCategoryId").value = index;
//     document.getElementById("editCategoryName").value =
//       categories[index].name || categories[index];
//   };

//   const saveChanges = () => {
//     const index = Number(
//       document.getElementById("editCategoryId").value
//     );

//     const name = document.getElementById("editCategoryName").value;

//     if (name) {
//       const updatedCategories = [...categories];
//       updatedCategories[index] = name;
//       setCategories(updatedCategories);
//     }
//   };

//   const deleteCategory = (index) => {
//     setCategories(
//       categories.filter((category, i) => i !== index)
//     );
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="container mt-5">

//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h1>Category Management</h1>

//           <button
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#addCategoryModal"
//           >
//             Add Category
//           </button>
//         </div>

//         <table className="table table-bordered table-hover">

//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.map((category, index) => (
//               <tr key={index}>

//                 <td>{index + 1}</td>

//                 <td>
//                   {category.name || category}
//                 </td>

//                 <td>

//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     data-bs-toggle="modal"
//                     data-bs-target="#editCategoryModal"
//                     onClick={() => editCategory(index)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteCategory(index)}
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>


//         {/* Add Category Modal */}

//         <div
//           className="modal fade"
//           id="addCategoryModal"
//           tabIndex="-1"
//         >

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">

//                 <h5 className="modal-title">
//                   Add Category
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
//                     Category Name
//                   </label>

//                   <input
//                     type="text"
//                     id="categoryName"
//                     className="form-control"
//                     placeholder="Enter category name"
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
//                   onClick={addCategory}
//                   data-bs-dismiss="modal"
//                 >
//                   Add Category
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* Edit Category Modal */}

//         <div
//           className="modal fade"
//           id="editCategoryModal"
//           tabIndex="-1"
//         >

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">

//                 <h5 className="modal-title">
//                   Edit Category
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
//                   id="editCategoryId"
//                 />

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Category Name
//                   </label>

//                   <input
//                     type="text"
//                     id="editCategoryName"
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

// export default Categories;