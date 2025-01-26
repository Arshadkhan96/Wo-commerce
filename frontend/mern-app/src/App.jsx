import React from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navigation from './components/layout/header/Navigation'
import Home from './components/Home/Home'
import ProductDetail from './components/layout/product/ProductDetails'
import Search from './components/layout/product/Search'
import Products from './components/layout/product/products'
import Category from './components/layout/product/Products-Category'

function App() {

  return (
    <>
      <Navigation/>
      <br />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/keyword" element={<ProductDetail />} />
        <Route path='/search'element={<Search/>}/>
        <Route path='/category' element={<Category/>}/>


      </Routes>
      <br />
      

      {/* <Testing/> */}
      <br/>
      {/* <ProductList/> */}
  
    </>
  )
}

export default App