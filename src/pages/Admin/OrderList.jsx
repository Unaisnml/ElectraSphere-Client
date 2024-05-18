import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaTicketAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


const OrdersList = () => {
  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
  console.log("Orders for admin", orders);
  // const orderItems = orders ? orders.map((order) => order.orderItems) : [];
  // console.log("Order Items:", orderItems.flat());

  return (
    <section className="w-full pl-[18rem]  max-h-auto bg-gray-200 mt-20 pr-4 py-6 mx-auto max-container  ">
      <h3 className="font-semibold text-xl mb-3 ">Orders</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">No Orders Found</Message>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-center ">
          <thead>
            <tr className="text-left text-base bg-gray-50 font-semibold text-green-500 uppercase">
              <th className="px-6 py-3   tracking-wider">Customer Name</th>
              <th className="px-6 py-3   tracking-wider">Order ID</th>
              <th className="px-6 py-3   tracking-wider">Order Date</th>
              <th className="px-6 py-3   tracking-wider">Delivered</th>
              <th className="px-6 py-3   tracking-wider">Item Amount</th>
              <th className="px-6 py-3   tracking-wider">Item Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap ">
                  {order.user && order.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order._id.slice(-5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex ">
                  {formatDate(order.paidAt)}
                </td>
                {/* <td>{order.orderItems[name]}</td> */}
                <td>
                  {order.isDelivered ? (
                    formatDate(order.deliveredAt)
                  ) : (
                    // <FaTimes style={{ color: "red" }} />
                    <p className="text-red-600">Not delivered</p>
                  )}
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  <Link to={`/admin/orders/${order._id}`}>
                    <button className="py-1 px-2 bg-black text-white">
                      Open
                    </button>
                  </Link>
                </td>
              </tr>
            ))}

            {/* Additional rows */}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default OrdersList;
