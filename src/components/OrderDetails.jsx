import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/orderApiSlice";
import Message from "./Message";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: paymentLoading }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: paypalLoading,
    error: payPalError,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!paypalLoading && !payPalError && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "INR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, paypalLoading, payPalError]);

  return isLoading ? (
    Loader
  ) : error ? (
    <Message variant="danger">No order found</Message>
  ) : (
    <section className=" flex md:flex-row flex-col gap-6 mx-auto my-10 ">
      {/* Order items container */}

      <div className="flex flex-col justify-between md:w-[65%] w-full h-full rounded-lg shadow-xl p-6 gap-4 ">
        {/* Order items list contaner */}
        <div>
          <h3 className="text-xl mb-3 font-semibold uppercase text-green-500">
            Shipping
          </h3>
          <div className="flex flex-col gap-2 max-w-full overflow-hidden mb-2">
            <p>
              <b>Name: </b> {order.user.name}
            </p>
            <p>
              <b>Email: </b> {order.user.email}
            </p>
            <p>
              <b>Address: </b> {order.shippingAddress.houseName},
              {order.shippingAddress.streetAdress},{order.shippingAddress.city},{" "}
              {order.shippingAddress.state},{order.shippingAddress.postalCode}
            </p>
          </div>

          {order.isDelivered ? (
            <Message variant="successs">
              Delivered on: {order.deliveredAt}
            </Message>
          ) : (
            <Message variant="danger">Not Delivered</Message>
          )}
          <hr className="my-4" />
          <p className="my-2">
            <b>Payment Method: </b> {order.paymentMethod}{" "}
          </p>

          {order.isPaid ? (
            <Message variant="successs">Paid on: {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not Paid</Message>
          )}

          <hr className="my-4" />

          <p className=" my-4 ">
            <b>Order Items:</b>
          </p>

          <div className="my-4">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-4 border p-2"
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
          </div>
        </div>
      </div>

      {/* Cart total container*/}
      <div className="flex  flex-col rounded-lg shadow-xl p-4 gap-4 text-base h-full">
        <h4 className="my-2 text-lg font-semibold uppercase border-b  text-green-500">
          order summary
        </h4>
        <div className="flex justify-between space-x-16 md:space-x-">
          <p>Items </p>

          <p key="sub-total">{order.itemsPrice}</p>
        </div>
        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Shipping</p>
          <p>{order.shippingPrice}</p>
        </div>

        <div className="flex justify-between space-x-16 md:space-x-44">
          <p>Tax</p>
          <p>{order.taxPrice}</p>
        </div>
        <hr className="dotted" />
        <div className="flex justify-between space-x-8">
          <p>Grand Total</p>
          <p>₹ {order.totalPrice}</p>
        </div>
        <PayPalButtons />
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default OrderDetails;
