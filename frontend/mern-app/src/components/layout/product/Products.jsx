import React, { Fragment, useEffect, useState } from "react";
import { getProduct } from "../../../action/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader.jsx";
import Product from "../../Home/Product.jsx";
import Pagination from "react-js-pagination";

import "./Products.css";
import { useParams } from "react-router-dom";

const Products = ({ match }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  console.log(currentPage);
  const { products, loading, totalProduct, productPerPage, error } =
    useSelector((state) => {
      return state.products || { products: [], loading: false }; // Fallback to avoid undefined errors
    });
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(currentPage);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage));
  }, [dispatch, keyword, currentPage]);
  console.log(currentPage, "this is current page ");

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          {productPerPage < totalProduct && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerPage}
                totalItemsCount={totalProduct}
                pageRangeDisplayed={3}
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
