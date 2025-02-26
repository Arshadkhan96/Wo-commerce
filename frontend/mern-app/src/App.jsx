import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navigation from './components/layout/header/Navigation'
import Home from './components/Home/Home'
import ProductDetail from './components/layout/product/ProductDetails'
import Search from './components/layout/product/Search'
import Products from './components/layout/product/products'
import LoginSignUp from './components/User/LoginSignUp'
import Profile from './components/User/Profile';
import ForgotPassword from './components/User/ForgotPassword';
import LogOut from './components/User/LogOut';
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'

function App() {
  
  return (
    <>

      <Navigation/>
      <br />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/keyword" element={<ProductDetail />} />
        <Route path='/search'element={<Search/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateProfile' element={<UpdateProfile/>}/>
        <Route path='/updatePassword'element={<UpdatePassword/>}/>

        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/logout' element={<LogOut/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      </Routes>
      <br />
      </>
  )
}

export default App;
