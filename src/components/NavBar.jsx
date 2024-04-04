import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../constants";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const NavBar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="padding-x py-8 max-lg:py-4 z-30 w-full bg-white">
      <nav className="flex justify-between items-center max-container">
        <Link to="/">
          <h3 className="text-3xl font-semibold flex text-green-600">
            Shopelio
          </h3>
        </Link>
        <ul className="flex felx-1 justify-center items-center gap-16 md:gap-10 font-semibold  max-lg:hidden">
          {navItems.map(({ name, path }) => (
            <li key={path}>
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
          <div className="relative max-lg:hidden">
            <input
              className="border-none focus:outline-none bg-gray-200 rounded-3xl px-2 py-1/2 pl-8  "
              type="text"
              placeholder="Search for Products..."
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-300 " />
          </div>
          <Link to="/cart" className="relative">
            <FaShoppingCart />
            <span className="count-div">5</span>
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
              className="text-white hover:text-gray-600 font-medium text-xl"
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
  );
};

export default NavBar1;
