import React, { useState } from 'react';
import axios from 'axios';

const Testing = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model:'',
    price: '',
    brand: '',
    category: '',
    stock: '',
    reviews:''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price), // Ensure price is a float
      stock: parseInt(formData.stock, 10), // Ensure stock is an integer
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/products/create', productData);
      console.log('Response:', response.data);
      setFormData({
        name: '',
        description: '',
        model:'',
        price: '',
        brand: '',
        category: '',
        stock: '',
        reviews:''
      });
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product. Please try again!');
    }
  };

  return (
    <div>
      <h1>Product Details Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Model:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Reviews:
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              required
            />
          </label>
         </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Testing;