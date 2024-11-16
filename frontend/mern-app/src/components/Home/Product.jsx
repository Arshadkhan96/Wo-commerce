import React from "react";
import './home.css'
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'

const options={
    edit:false,
    color:"rgb(20,20,20,0.5)",
    activeColor:"red",
    value:3
}

const Products=({products})=>{
    return(
        <>
        <Link className="product-card" to={products.id}>
            <img src={products.image[0].url} alt={products.name} />
            <br />
            <p>{products.name}</p>
            <div className="stars"><ReactStars {...options}/><span>(100 reviews)</span></div>
            <p>{products.price}</p>
        </Link>
        </>
    )
}
export default Products