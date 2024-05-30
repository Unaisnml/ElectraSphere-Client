import React from "react";
import Dashboard from "../../components/Dashboard";

const AdminHome = () => {
  return (
    <section className="pl-[18rem] pb-6 pt-8 min-h-screen max-h-auto bg-gray-200  ">
      <h2 className="text-xl font-semibold my-3">Admin Home</h2>
      <Dashboard />
    </section>
  );
};

export default AdminHome;
