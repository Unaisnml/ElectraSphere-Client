import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import WhishList from "../pages/WhishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products/:id", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/whishlist", element: <WhishList /> },
      // { path: "/login", element: <LoginPage /> },

    ],
  },
]);

export default router;
