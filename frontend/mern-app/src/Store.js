import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer ,registerReducer } from "./reducers/userReducer";
import { productReducer ,productDetailsReducer,newProductReducer, updateProductReducer, } from "./reducers/productReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct : newProductReducer,   
  productUpdate:  updateProductReducer,

  // userReducer//
  user: userReducer,
  register:registerReducer,
  
});

const initialState = {};

const middleWare = [thunk]; ///later on//

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
