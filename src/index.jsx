import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
