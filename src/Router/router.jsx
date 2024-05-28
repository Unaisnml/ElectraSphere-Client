import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import WishListPage from "../pages/WishListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShippingPage from "../pages/ShippingPage";
import PaymentPage from "../pages/PaymentPage";
import OrderPage from "../pages/OrderPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import UsersList from "../pages/Admin/UsersList";
import AdminRoute from "../components/AdminRoute";
import ProductList from "../pages/Admin/ProductList";
import EditUserForm from "../pages/Admin/EditUser";
import EditPrductForm from "../pages/Admin/EditProduct";
import OrdersList from "../pages/Admin/OrderList";
import MyOrdersList from "../pages/MyOrdersList";
import CategoryPage from "../pages/CategoryPage";
import BrandsPage from "../pages/BrandsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishList" element={<WishListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/category" element={<CategoryPage/>} />
      <Route path="/brands" element={<BrandsPage/>} />
      
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<OrderPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
        <Route path="/order/my-orders" element={<MyOrdersList />} />

      </Route>
      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/users" element={<UsersList />}></Route>
        <Route path="/admin/products" element={<ProductList />}></Route>
        <Route path="/admin/user/:id/edit" element={<EditUserForm/>}></Route>
        <Route path="/admin/products/:id/edit" element={<EditPrductForm/>}></Route>
        <Route path="/admin/orders" element={<OrdersList />}></Route>
        <Route path="/admin/orders/:id" element={<OrderDetailPage/>}></Route>


      </Route>
    </Route>
  )
);

export default router;
