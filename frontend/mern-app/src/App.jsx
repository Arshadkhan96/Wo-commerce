import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navigation from './components/layout/header/Navigation'
import Home from './components/Home/Home'
import ProductDetail from './components/layout/product/ProductDetails'


function App() {

  return (
    <>
      <Navigation/>
      <br />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />


      </Routes>
      <br />
      

      {/* <Testing/> */}
      <br/>
      {/* <ProductList/> */}
  
    </>
  )
}

export default App