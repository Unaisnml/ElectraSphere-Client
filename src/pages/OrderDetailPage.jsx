import OrderDetails from "../components/OrderDetails";
import { useSelector } from "react-redux";

const OrderDetailPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section
      className={`container mx-auto py-20 my-4 md:my-10 h-auto max-w-[85%]   ${
        userInfo.isAdmin ? "pl-44" : ""
      }`}
    >
      <h2 className="my-3 container text-2xl font-bold  ">
        {!userInfo?.isAdmin ? "Order Details" : "Order item Details"}
      </h2>
      <OrderDetails />
    </section>
  );
};

export default OrderDetailPage;
