import { Fragment, useEffect } from "react";
import "./home.css";
import Product from "./Product";
// import { CiDesktopMouse1, CiHospital1 } from "react-icons/ci";
import { getProduct } from "../../action/productAction.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => {
    console.log("component state", state.products.product);
    return state.products;
  });

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // console.log("home", products);
  return (
   <h1>hello</h1>
  );
};
export default Home;
