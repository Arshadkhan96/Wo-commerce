import React, { useState, useEffect } from 'react';
import { getProduct } from '../../../action/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';
import "./Category.css"

const Category = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (category) {
      dispatch(getProduct(category));
    }
  }, [category, dispatch]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <h2>Select a Category</h2>

      <select value={category} onChange={handleCategoryChange}>
        <option value="">-- Select Category --</option>
        <option value="electronics">accessories</option>
        <option value="mobile">Mobile</option>
        <option value="audio">audio</option>
      </select>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <h3>Products in {category || 'All Categories'}</h3>
          <div>
            {products && products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
