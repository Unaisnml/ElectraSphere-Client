import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { Loader } from "../components/Loader";
import { formatDate } from "../utils/dateUtils";
import Message from "../components/Message";
// import { FaCheck, FaTicketAlt, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// import { FaRegArrowAltCircleRight } from "react-icons/fa";

const MyOrdersList = () => {
  const { data: orders, refetch, isLoading, error } = useGetMyOrdersQuery();
  console.log("My orders", orders);
  return (
    <section className="container mx-auto my-4 md:mt-32 md:pb-16 h-auto max-w-[85%] ">
      <h2 className="my-3 container text-2xl font-bold  ">My Orders</h2>
      <div>
        {isLoading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="w-full py-12 px-12">
            <Message variant="danger">You have No Orders Found</Message>
          </div>
        ) : error ? (
          <Message variant="danger">No Orders</Message>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-center px-4 shadow-2xl rounded-lg">
            <thead className="text-center ">
              <tr className=" text-base bg-gray-50 text-center font-semibold text-green-500 uppercase">
                <th className=" py-3 tracking-wider">Order ID</th>
                <th className=" py-3 tracking-wider">Order Date</th>
                <th className=" py-3 tracking-wider">Delivered</th>
                <th className=" py-3 tracking-wider">Item Amount</th>
                <th className=" py-3 tracking-wider">Item Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {order._id.slice(-5)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(order.paidAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.isDelivered ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <p className="text-red-600">Not delivered</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/order/${order._id}`}>
                      <button className="py-1 px-2 bg-black text-white">
                        Open
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyOrdersList;
