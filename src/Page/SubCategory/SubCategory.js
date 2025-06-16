// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const SubCategory = () => {
//   const { state } = useLocation();
//   const subcategories = state?.subcategories || [];
//   const navigate = useNavigate();

//   console.log(subcategories);
//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold mb-4 text-primary">📂 التصنيفات الفرعية</h2>

//       <button
//         onClick={() => navigate(-1)}
//         className="btn btn-outline-secondary mb-4"
//       >
//         ← العودة للصفحة السابقة
//       </button>

//       <div className="row g-4">
//         {subcategories.map((sub, i) => (
//           <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
//             <div className="card h-100 shadow-sm border rounded-3 text-center">
//               <img
//                 src={sub.image?.url}
//                 className="card-img-top rounded-top bg-white"
//                 alt={sub.name}
//                 style={{
//                   height: "180px",
//                   objectFit: "contain",
//                 }}
//               />
//               <div className="card-body">
//                 <h6 className="card-title fw-semibold">{sub.name}</h6>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubCategory;
