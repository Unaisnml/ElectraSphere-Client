import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import {
  useCreateOrderMutation,
  useCheckoutOrderMutation,
  useVerifyPaymentMutation,
} from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Button from "./Button";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  console.log("paymentInfo", paymentInfo, cart.shippingAddress);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkoutOrder, { isLoading, error }] = useCheckoutOrderMutation();
  const [
    VerifyPayment,
    { isLoading: verificationLoading, error: verificationError },
  ] = useVerifyPaymentMutation();
  const [createOrder, { isLoading: createLoading, error: createError }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentInfo,
      }).unwrap();
      toast.success("Order Placed Successfully");
      dispatch(clearCartItems());
      // console.log("Order response", res);
      // toast.success('Order Placed Successfully')
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay sdk failed to load");
      return;
    }

    try {
      const result = await checkoutOrder({
        amount: cart.totalPrice,
      });

      // Check if result exists and handle accordingly
      if (!result) {
        alert("Something went wrong");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;
      console.log("result", result, "amount: ", amount);

      const options = {
        key: "rzp_test_HBp8bYbd3aJaeR", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Shop.io",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            // razorpaySignature: response.razorpay_signature,
          };

          const result = await VerifyPayment(data);
          console.log("verification", result);
          const newPaymentInfo = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };

          setPaymentInfo(newPaymentInfo);

          setTimeout(() => {
            placeOrderHandler(paymentInfo);
          }, 2000);
        },
        prefill: {
          name: "UNAIS",
          email: "unaisnml@gmail.com",
          contact: "9995010673",
        },
        notes: {
          address: "Shop.io,Kerala",
        },
        theme: {
          color: "#fffff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error during checkout:", err);
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <section className=" flex md:flex-row flex-col gap-6 mx-auto my-10 ">
      {/* Order items container */}

      <div className="flex flex-col justify-between md:w-[65%] w-full h-full rounded-lg border p-6 gap-4 ">
        {/* Order items list contaner */}
        <div>
          <h3 className="text-xl mb-4 font-semibold uppercase text-green-500">
            Shipping Address
          </h3>
          <p className="mb-4">
            {cart.shippingAddress.houseName},{" "}
            {cart.shippingAddress.streetAdress},{cart.shippingAddress.city},{" "}
            {cart.shippingAddress.state},{cart.shippingAddress.postalCode}
          </p>
          <hr />
          <h3 className="text-xl my-4 font-semibold uppercase text-green-500">
            Payment Method
          </h3>
          <p className="mb-4">{cart.paymentMethod}</p>
          <hr />
          <h3 className="text-xl my-4 font-semibold uppercase text-green-500">
            Order Items
          </h3>
          {cart.cartItems.length === 0 ? (
            <span>Your Cart is Empty</span>
          ) : (
            <div className="my-4">
              {cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between my-4 shadow p-2"
                >
                  <div className="flex items-center justify-center gap-4 ">
                    <img
                      src={item.image[0]}
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
          <p>Items</p>
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

        <Button label="Place Order" onClick={checkOutHandler} />

        {isLoading && <Loader />}
        {createLoading && <Loader />}
        {verificationLoading && <Loader />}
      </div>
    </section>
  );
};

export default OrderSummary;
