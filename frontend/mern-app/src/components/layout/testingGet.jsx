import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);  // To store the products data
  const [loading, setLoading] = useState(true);   // To track the loading state
  const [error, setError] = useState(null);       // To track any error

  // The URL for the GET request (replace with your actual API endpoint)
  const API_URL = 'http://localhost:5000/api/v1/products';

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.data || data);  // Adjust based on API response structure
          } catch (error) {
            console.error('Error fetching products:', error);  // Log detailed error message
            setError(error.toString());
          }
          
    };

    fetchProducts();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Render loading, error, or product list
  if (loading) return <div>Loading products, please wait...</div>;
  if (error) return <div>Oops! Something went wrong: {error}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id || product.name}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
