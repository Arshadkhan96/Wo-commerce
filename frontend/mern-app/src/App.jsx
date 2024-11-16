import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navigation from './components/layout/header/Navigation'
import SignUp from './components/layout/signupForm/SignUp'
import Login from './components/layout/loginForm/Login'
import ForgotPassword from './components/stuff/ForgotPasssword'
import Home from './components/Home/Home'
import Products from './components/Home/Product'
import Footer from './components/layout/footer/Footer'

import Testing from './components/layout/testingPost'
import ProductList from './components/layout/testingGet'

function App() {

  return (
    <>
      {/* <Navigation/>
      <br />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset' element={<ForgotPassword/>}/>
      </Routes>
      <br />
      <Footer/> */}

      {/* <Testing/> */}
      <br/>
      <ProductList/>
  
    </>
  )
}

export default App
