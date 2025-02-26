// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./Store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
//   </Provider>
// );
// ###########################
import "regenerator-runtime/runtime";  // Ensures async/await works correctly
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <BrowserRouter> 
      <App />
     </BrowserRouter> 
  </Provider>
);
