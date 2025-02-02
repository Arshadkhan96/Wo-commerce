// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { Auth0Provider } from "@auth0/auth0-react";
// import store from "./Store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     {/* <BrowserRouter> */}
//     <Auth0Provider
//     domain="YOUR_AUTH0_DOMAIN"
//     clientId="YOUR_CLIENT_ID"
//     authorizationParams={{ redirect_uri: window.location.origin }}
//   >
//         <App />
//         </Auth0Provider>
//     {/* </BrowserRouter> */}
//   </Provider>
// );


// ####################################
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./store";  // Make sure this points to your Redux store

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* Wrap with Redux Provider */}
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_CLIENT_ID"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />  {/* Your App component */}
    </Auth0Provider>
  </Provider>
);
