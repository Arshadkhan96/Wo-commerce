// import React from 'react'
// import './App.css'
// import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
// import Navigation from './components/layout/header/Navigation'
// import Home from './components/Home/Home'
// import ProductDetail from './components/layout/product/ProductDetails'
// import Search from './components/layout/product/Search'
// import Products from './components/layout/product/products'
// import LoginSignUp from './components/User/LoginSignUP'
// import RegisterUser from './components/User/RegisterUser'

// function App() {
  
  

//   return (
//     <>

//       <Navigation/>
//       <br />
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/products" element={<Products/>} />
//         <Route path="/product/keyword" element={<ProductDetail />} />
//         <Route path='/search'element={<Search/>}/>
//         <Route path='/login' element={<LoginSignUp/>}/>

//         <Route path='register' element={<RegisterUser/>}/>


//       </Routes>
//       <br />
      

//       {/* <Testing/> */}
//       <br/>
//       {/* <ProductList/> */}
//       </>
//   )
// }

// export default App


// ############################################
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import Navigation from "./components/layout/header/Navigation";
import Home from "./components/Home/Home";
import ProductDetail from "./components/layout/product/ProductDetails";
import Products from "./components/layout/product/Products";
import LoginSignUp from "./components/User/LoginSignUP";
import RegisterUser from "./components/User/RegisterUser";
import AuthButtons from "./components/AuthButton";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <Navigation />
      <AuthButtons /> {/* Show login/logout button */}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Protected Routes */}
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
