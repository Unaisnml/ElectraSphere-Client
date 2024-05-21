import React from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import OrdersAndUsersChart from "./Chart";
import { useGetOrdersQuery } from "../slices/orderApiSlice";
import { useGetUsersQuery } from "../slices/usersApiSlice";

const Dashboard = () => {
  const { data: orders, refetch, isLoading: isLoadingOrders, error: errorOrders } = useGetOrdersQuery();
  const { data: users,  isLoading: isLoadingUsers, error: errorUsers } = useGetUsersQuery();
  const nonAdminUsers = users ? users.filter((user) => !user.isAdmin) : [];
  const nonAdminUsersCount = nonAdminUsers.length;
  const totalOrderPrice = orders ? orders.reduce((total, order) => total + order.totalPrice, 0) : 0;
  const activeOrders = orders
  ? orders.filter((order) => !order.isDelivered)
           .reduce((total, order) => total + order.totalPrice, 0)
  : 0;
  return (
    <section className="w-full mx-auto pr-5">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 w-full mb-4 ">
        <div className="w-full flex  justify-center items-center bg-blue-200 hover:bg-blue-300 rounded-xl p-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer">
          <div className="w-full flex flex-col justify-between items-start">
            <h1 className="text-md text-blue-900 font-semibold mb-2">
              Total Orders
            </h1>
            <div className="flex items-center justify-center gap-4 my-2">
              <button className="py-2 px-2 text-2xl bg-blue-900 text-white rounded-md">
                <IoBagHandleOutline />
              </button>{" "}
              <h2 className="text-md text-blue-900 font-semibold mb-2">₹ {Math.round(totalOrderPrice)}</h2>
            </div>
          </div>
        </div>
        <div className="w-full flex  justify-center items-center bg-violet-200 hover:bg-violet-300 rounded-xl p-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer">
          <div className="w-full flex flex-col justify-between items-start">
            <h1 className="text-md text-violet-900 font-semibold mb-2">
              Active Orders
            </h1>
            <div className="flex items-center justify-center gap-4 my-2">
              <button className="py-2 px-2 text-2xl bg-blue-900 text-white rounded-md">
                <IoBagHandleOutline />
              </button>{" "}
              <h2 className="text-md text-violet-900 font-semibold mb-2">₹ {Math.round(activeOrders)}</h2>
            </div>
          </div>
        </div>
        <div className="w-full flex  justify-center items-center bg-pink-200 hover:bg-pink-300 rounded-xl p-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer">
          <div className="w-full flex flex-col justify-between items-start">
            <h1 className="text-md text-pink-900 font-semibold mb-2">Users</h1>
            <div className="flex items-center justify-center gap-4 my-2">
              <button className="py-2 px-2 text-2xl bg-blue-900 text-white rounded-md">
                <FaUsers />
              </button>{" "}
              <h2 className="text-md text-pink-900 font-semibold mb-2">{nonAdminUsersCount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto h-auto py-6 rounded-xl shadow-lg bg-white">
        <OrdersAndUsersChart />
      </div>
    </section>
  );
};

export default Dashboard;
