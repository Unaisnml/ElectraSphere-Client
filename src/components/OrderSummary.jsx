import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Button from "./Button";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  // const userInfo = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      
      const order = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
       
      }).unwrap();
      dispatch(clearCartItems());
      console.log("Order response", order);
      navigate(`/order/${order._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className=" flex md:flex-row flex-col gap-6 mx-auto my-10 ">
      {/* Order items container */}

      <div className="flex flex-col justify-between md:w-[65%] w-full h-full rounded-lg border p-6 gap-4 ">
        {/* Order items list contaner */}
        <div>
          <h3 className="text-xl mb-4 font-semibold uppercase text-green-500">
            Shipping Address:
          </h3>
          <p className="mb-4">
            {cart.shippingAddress.houseName},{" "}
            {cart.shippingAddress.streetAdress},{cart.shippingAddress.city},{" "}
            {cart.shippingAddress.state},{cart.shippingAddress.postalCode}
          </p>
          <hr />
          <h3 className="text-xl my-4 font-semibold uppercase text-green-500">
            Payment Method:
          </h3>
          <p className="mb-4">{cart.paymentMethod}</p>
          <hr />
          <h3 className="text-xl my-4 font-semibold uppercase text-green-500">
            Order Items:
          </h3>
          {cart.cartItems.length === 0 ? (
            <span>Your Cart is Empty</span>
          ) : (
            <div className="my-4">
              {cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between my-4"
                >
                  <div className="flex items-center justify-center gap-4 ">
                    <img
                      src={item.image}
                      alt="product-img"
                      className="rounded-md   md:max-w-[4rem] max-h-[4rem]"
                    />
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </div>
                  <p className="text-base ">
                    {item.count} x {item.price} = {item.count * item.price}
                  </p>
                </div>
              ))}
              <hr />
            </div>
          )}
        </div>
      </div>

      {/* Cart total container*/}
      <div className="flex  flex-col rounded-lg border p-4 gap-4 text-base h-full">
        <h4 className="my-2 text-lg font-semibold uppercase border-b  text-green-500">
          Price Details
        </h4>
        <div className="flex justify-between space-x-16 md:space-x-">
          <p>
            Items
            {/* ({cartItems.reduce((acc, item) => acc + item.count, 0)}) */}
          </p>
          {/* <p key={item._id}>₹ {cartItems.reduce((acc, item)=> acc + (item.count * item.price))}</p> */}
          <p key="sub-total">₹{cart.itemsPrice}</p>
        </div>
        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Shipping</p>
          <p>{cart.shippingPrice}</p>
        </div>

        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Tax</p>
          <p>{cart.taxPrice}</p>
        </div>
        <hr className="dotted" />
        <div className="flex justify-between space-x-8">
          <p>Grand Total</p>
          <p>₹ {cart.totalPrice} </p>
        </div>
        {/* <div className="flex items-center justify-center">
        {error && (
    <div>
      <p className="text-red-400">Error Status: {error.status}</p>
      <p className="text-red-400">Error Data: {error.data}</p>
    </div>
  )}
        </div> */}

        <Button label=" Place Order" onClick={placeOrderHandler} />
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default OrderSummary;
