import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";

const Product = ({ product }) => {
  const [userRating, setUserRating] = useState(product.rating || 0); // Track the current rating

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img
        src="https://images.unsplash.com/photo-1684127987312-43455fd95925?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <Rating
          value={userRating} // Current rating value
          count={5} // Total stars
          size={24} // Size of stars
          activeColor="#ffd700" // Custom color for stars
          isHalf={true} // Support for half ratings
          onChange={(newRating) => {
            setUserRating(newRating); // Update state on click
            console.log("User selected rating:", newRating); // Optional: Log user rating
          }}
          edit={true} // Enable editing
        />
        <span>({product.numberOfReviews || 0} Reviews)</span>
      </div>
      <span>${product.price.toFixed(2)}</span>
    </Link>
  );
};

export default Product;
