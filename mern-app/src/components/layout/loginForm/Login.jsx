// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../action/userAction";
// import "./login.css"
// import { Helmet } from "react-helmet";

// const Login = () => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.user); // Access loading and error from Redux store
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData)); // Dispatch the Redux action
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Login Page</title>
//         <meta name="login" content="User login" />
//       </Helmet>
//       <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}className="container">
//         <h1>Login</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
