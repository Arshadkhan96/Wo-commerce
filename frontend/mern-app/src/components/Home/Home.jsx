import { Fragment, useEffect } from "react";
import "./home.css";
import Product from "./Product";
import { CiDesktopMouse1 } from "react-icons/ci";
import {getProduct } from "../../action/productAction.js"
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import Loader from "../layout/loader/Loader.jsx";

const Home = () => {
  const dispatch = useDispatch();

  // Extracting products and loading state from Redux store
  const { products, loading } = useSelector((state) => {
    console.log("Component state:", state.products); // Debugging state
    return state.products || { products: [], loading: false }; // Fallback to avoid undefined errors
  });

  // Dispatch action to fetch products on component mount
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {/* Setting the page title */}
      <Helmet title="Home-page"/> 

      <div className="banner">
        <p>Welcome to our site</p>
        <h1>Find amazing products</h1>
        <a href="#container">
          <button>
            Scroll <CiDesktopMouse1 />
          </button>
        </a>
      </div>

      <h2 className="home-Heading">Latest Products</h2>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="products-container">
            {/* Render products */}
            {products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </Fragment>
      )}

    </Fragment>
  );

};

export default Home;