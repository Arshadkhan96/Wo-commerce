// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { deleteProduct } from "../../action/productAction";

// const Profile = () => {
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch Products from API
//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.setItem("token"); // Get token from localStorage

//       console.log("localStorage data", token);
//       const { data } = await axios.get("http://localhost:5000/api/v1/me", {
//         headers: { Authorization: `Bearer ${token}` }, // Attach token
//         withCredentials: true, // Allow credentials (cookies, if used)
//       });
//       console.log("login not access your file", data);

//       setProducts(data.products || []); // Ensure it's an array
//       console.log("User Data:", data);
//     } catch (error) {
//       console.error("Error fetching user details", error);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchUserDetails();
//     }
//   }, [isAuthenticated]);

//   // Handle Search Change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredProducts = products?.length
//     ? products.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.category.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="profile-wrapper">
//       {!isAuthenticated ? (
//         <h1>Please login to view your profile</h1>
//       ) : (
//         <>
//           <h1>Welcome, {user.name}</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Search..."
//               id="search-input"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>

//           {filteredProducts.length === 0 ? (
//             <h1>Currently, there are no products</h1>
//           ) : (
//             <div className="product-wrapper">
//               {filteredProducts.map((product) => (
//                 <div className="product-item" key={product._id}>
//                   <div className="product-image">
//                     <img
//                       src={`http://localhost:3000/Images/${product.image}`}
//                       alt={product.name}
//                     />
//                   </div>
//                   <div className="product-details">
//                     <h2>{product.name}</h2>
//                     <p>Brand: {product.brand}</p>
//                     <p>Category: {product.category}</p>
//                     <p>Price: ${product.price}</p>
//                     <div className="del-upd-buttons">
//                       <button onClick={() => deleteProduct(product._id)}>
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => navigate(`/update/${product._id}`)}
//                       >
//                         Update
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;

// ###############################
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* <img src={user.avatar.url} alt={user.name} /> */}
              <Link to="/updateProfile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/updatePassword">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;