// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { userReducer } from "./reducers/userReducer";
// import { productReducer ,productDetailsReducer,newProductReducer, updateProductReducer, } from "./reducers/productReducer";

// const reducer = combineReducers({
//   products: productReducer,
//   productDetails: productDetailsReducer,
//   newProduct : newProductReducer,   
//   productUpdate:  updateProductReducer,

//   // userReducer//
//   user: userReducer  
// });

// const initialState = {};

// const middleWare = [thunk]; ///later on//

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleWare))
// );

// export default store;

// #########################################
import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { thunk } from "react-redux"
import { composeWithDevTools} from "@redux-devtools/extension"
 
import { userReducer } from "./reducers/userReducer";
import { 
  productReducer,
  productDetailsReducer,
  newProductReducer,
  updateProductReducer
} from "./reducers/productReducer";

// Combine all reducers
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  productUpdate: updateProductReducer,
  user: userReducer,  
});

// Initial state
const initialState = {};

// Middleware setup
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
