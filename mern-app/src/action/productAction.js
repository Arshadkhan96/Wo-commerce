import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstant.js";

//PRODUCT DETAIL API
export const getProduct = (currentPage = 1, keyword = "", category = "") => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    // Dynamically construct API URL
    let link = `http://localhost:5000/api/v1/products?page=${currentPage}`;

    if (keyword) {
      link += `&keyword=${keyword}`;
    }

    if (category) {
      link += `&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};


export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
   
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};


// create product api

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type:  NEW_PRODUCT_REQUEST });
    const config ={
      headers:{
        "Content-Type":"application/json",
      }
    }
    const { data } = await axios.post(`http://localhost:5000/api/v1/products/create`,productData,config);
   
    console.log('product is created',productData)
    dispatch({
      type: NEW_PRODUCT_SUCCESS,  
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response?.data?.message,
    });
  }
};


//delete product API

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type:  PRODUCT_DELETE_REQUEST });
    
    const { data } = await axios.delete(`http://localhost:5000/api/v1/products/delete/${id}`);
    console.log(data, "delete")
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });   
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

// UPDATE-PRODUCT

export const updateProduct = (id) => async (dispatch) => {
  try {
    // Dispatch request action with initial product data (optional, for showing loading state)
    dispatch({type: PRODUCT_UPDATE_REQUEST});
    const { data } = await axios.put(`http://localhost:5000/api/v1/products/update/${id}`);
    console.log(data, "product-update-response Success action");
    
    // Dispatch success action with updated product data from the response
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,  // Assuming data contains the updated product and any other necessary details
    });
    
  } catch (error) {
    // Dispatch fail action if there's an error
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      // payload: error.response?.data?.message || error.message,  // Handle error gracefully
      payload: error.response?.data?.message || error.message,

    });
  }
};
// Action to update product

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};