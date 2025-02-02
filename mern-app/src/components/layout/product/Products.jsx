import React, { Fragment, useEffect, useState } from "react";
import { getProduct} from "../../../action/productAction.js"
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader.jsx";
import Product from "../../Home/Product.jsx";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  // State for pagination and categories
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { products, loading, totalProduct, productPerPage, error } = 
    useSelector((state) => {
      return state.products || { products: [], loading: false }; // Fallback to avoid undefined errors
    });
    console.log('productPerPage',productPerPage)

  // Set the current page when pagination is clicked
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Handle category selection
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1);
  };
  

  // Dispatch the getProduct action whenever dependencies change
  useEffect(() => {
    dispatch(getProduct(currentPage, keyword, category)); // Ensure category is passed
  }, [dispatch, currentPage, keyword, category]);
  

  // List of categories (could also be fetched from an API)
  const categories = ["mobile", "accessories", "audio", "electronic"];
  console.log(category,"category testing")

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>

          {/* Category Filter */}
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`category-button ${
                  category === cat ? "active-category" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          {/* Pagination */}
          {productPerPage < totalProduct && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerPage}
                totalItemsCount={totalProduct}
                pageRangeDisplayed={4}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;