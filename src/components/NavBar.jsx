import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../constants/index";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const NavBar1 = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log("Cartitems", cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section>
      <header className="padding-x md:py-6 py-5 z-30 w-full bg-white">
        <nav className="flex justify-between items-center max-container ">
          <Link to="/">
            <h2 className="text-4xl font-bold flex text-black font-[Poppins] ">
              SHOP.CO
            </h2>
          </Link>
          <ul className="flex felx-1 justify-center items-center gap-16 md:gap-8   max-lg:hidden">
            {navItems.map(({ name, path }) => (
              <li
                key={path}
                className="text-lg font-[Poppins] font-semibold hover:text-gray-600"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-10 md:gap-6 text-2xl text-black max-lg:gap-3">
            <div className="relative max-lg:hidden ">
              <input
                className=" border-none focus:outline-none bg-gray-200 text-base rounded-xl px-2 py-1 pl-8  "
                type="text"
                placeholder="Search for Products..."
              />
              <FaSearch className="absolute  left-2 top-1/2 text-base transform -translate-y-1/2 text-gray-300 " />
            </div>
            <Link to="/cart" className="relative">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="count-div w-24">
                  {cartItems.reduce((a, c) => a + c.count, 0)}
                </span>
              )}
            </Link>
            <Link className="relative">
              <FaHeart />
              <span className="count-div">5</span>
            </Link>
            <CgProfile className="cursor-pointer" />
            <button
              className="hidden focus:outline-none focus:text-gray-500 max-lg:block"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaXmark className="text-xl" />
              ) : (
                <FaBarsStaggered className="text-xl" />
              )}
            </button>
          </div>
          <div
            className={`gap-4 px-4  py-4 z-20 bg-gray-700 flex flex-col ${
              isMenuOpen ? "block absolute top-16 left-0 right-0" : "hidden"
            }`}
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={path}
                className="text-white hover:text-gray-600 font-medium text-xl font-[Poppins] "
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
              >
                {name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="hidden relative  max-lg:block my-2">
          <input
            className="focus:outline-none border-none w-full mt-1 bg-gray-200 rounded-xl px-2 py-1/2 pl-8 "
            type="text"
            placeholder="Search for Products..."
          />
          <FaSearch className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-300 " />
        </div>
      </header>
      <hr className="w-full h-0.5 border-gray-400" />
    </section>
  );
};

export default NavBar1;
