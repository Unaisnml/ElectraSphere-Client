import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const AdminNav = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleDivClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <nav className="flex flex-col justify-between items-start mt-8 ">
      <div>
        <Link to="/">
          <h2 className="text-4xl font-bold  text-black font-[Poppins] ">
            SHOP.CO
          </h2>
        </Link>
      </div>
      <div className="flex flex-col my-12 items-start gap-6  w-full">
        <div className="admin-link">
          <MdOutlineDashboard />
          <Link to="/admin" className="">
            Dashboard
          </Link>
        </div>
        <div className="admin-link ">
          <RiShoppingBag2Fill />
          <Link to="/admin/products" className="">
            Products
          </Link>
        </div>
        <div className="admin-link ">
          <IoDocumentText />
          <Link to="/admin/orders" className="">
            Orders
          </Link>
        </div>
        <div className="admin-link ">
          <FaUsers />
          <Link to="/admin/users" className="">
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
