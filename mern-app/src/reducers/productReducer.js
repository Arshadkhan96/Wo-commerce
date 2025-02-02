import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL
} from "../constants/productConstant.js";

const initialState = {
  products: [], // This is what we will use consistently
  loading: false,
  error: null,
  totalProduct: 0,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        products: [], 
      };

      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.product || [], // Default to an empty array if 'product' is undefined
          totalProduct: action.payload.totalProduct || 0, // Default to 0 if 'totalProduct' is undefined
          productPerPage: action.payload.productPerPage,
          error: null,
        };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [], // Ensure products are cleared on error
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//PRODUCT DETAIL REDUCER
export const productDetailsReducer = (state={product:{}}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };

  
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// CREATE PRODUCT REDUCER

export const newProductReducer = (state={product:{}}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// DELETE PRODUCT REDUCER

export const deleteProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state, // Preserve any existing state
        loading: true, // Set loading to true during the request
      };

      case PRODUCT_DELETE_SUCCESS:
        return {
          ...state,
          products: state.products.filter(product => product._id !== action.payload.id),
        };

    case PRODUCT_DELETE_FAIL:
      return {
        ...state, // Preserve other state values
        loading: false, // Loading is complete
        error: action.payload, // Store the error message
      };

    case CLEAR_ERRORS:
      return {
        ...state, // Preserve existing state
        error: null, // Clear any previous errors
      };

    default:
      return state; // Return the current state for any unknown action type
  }
};

// /UPDATE-REDUCER
export const updateProductReducer = (state = initialState, action) => {
  console.log('productFile-Reducer',action.type)
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        products: [], 

      };

      case PRODUCT_UPDATE_SUCCESS:
        return {
          loading: false,
          products: action.payload.product || [], // Default to empty array if 'product' is undefined
          totalProduct: action.payload.totalProduct || 0, // Default to 0 if 'totalProduct' is undefined
          error: null,
        };

    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
