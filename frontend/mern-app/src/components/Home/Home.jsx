import React from "react";
import './home.css'
import Products from "./Product";
import { CiDesktopMouse1 } from "react-icons/ci";

const products={
    name:'Mobile (Infinix GT pro)',
    price:24999,
    id:'#125355',
    image:[{url:"https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/q/0/gt-20-pro-x6871-infinix-original-imahf2dfvbtavfur.jpeg?q=70"}]
}

const Home=()=>{
    return(
    <>
    <div className="banner">
        <p>Welcome to our site</p>
        <h1>Find amazing products</h1>
        <a href="#container">
            <button>Scroll<CiDesktopMouse1 /></button>
        </a>
    </div>

    <h2 className="home-Heading">Latest Products</h2>
    <div className="container" id="container">
        <Products products={products}/>
    </div>
    </>
    )
}
export default Home