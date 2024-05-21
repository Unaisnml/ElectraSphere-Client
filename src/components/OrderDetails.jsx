import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePackOrderMutation,
  useShipOrderMutation,
  useDeliverOrderMutation,
} from "../slices/orderApiSlice";
import Message from "./Message";
import { formatDate } from "../utils/dateUtils";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);
  const [packOrder, { isLoading: packLoading, error: packError }] =
    useDeliverOrderMutation();
  const [shipOrder, { isLoading: shipLoading, error: shipError }] =
    useShipOrderMutation();
  const [deliverOrder, { isLoading: deliverLoading, error: deliverError }] =
    useDeliverOrderMutation();

  const packHandler = async () => {
    await packOrder(orderId);
    refetch();
  };
  const shipHandler = async () => {
    await shipOrder();
    refetch();
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    Loader
  ) : error ? (
    <Message variant="danger ">Order not found</Message>
  ) : (
    <section className=" flex md:flex-row flex-col gap-6 mx-auto  ">
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
            <Message variant="success">
              Delivered on: {formatDate(order.deliveredAt)}
            </Message>
          ) : (
            <Message variant="danger">Not Delivered</Message>
          )}
          <hr className="my-4" />
          <p className="my-2">
            <b>Payment Method: </b> {order.paymentMethod}{" "}
          </p>

          {order.isPaid ? (
            <Message variant="success">
              Paid on: {formatDate(order.paidAt)}
            </Message>
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
                    src={item.image[0]}
                    alt="product-img"
                    className="rounded-md   md:max-w-[4rem] max-h-[4rem]"
                  />
                  <Link to={`/products/${order._id}`}>{item.name}</Link>
                </div>
                <p className="text-base ">
                  {item.count} x {item.price} = {item.count * item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price total container*/}
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

        {userInfo?.isAdmin && !order.isDelivered && (
          <div>
            <button
              onClick={deliverHandler}
              className="bg-black py-2 w-full text-white"
            >
              Deliver Item
            </button>
            {deliverLoading && <Loader />}
            {deliverError && (
              <Message variant="danger">{deliverError.message}</Message>
            )}
          </div>
        )}
        {!userInfo?.isAdmin && (
          <div className="w-full flex flex-col text-white text-center gap-4">
            <Link to="/order/my-orders" className="bg-black py-2">
              Go to My Orders
            </Link>
            <Link to="/" className="bg-black py-2">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
