import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Categories", path: "/categories" },
  ];
  return (
    <header className='bg-white fixed top-0 left-0 right-0 z-50'>
      {" "}
      <nav
        className={`w-[95%] py-3 lg:px-14 px-2 mx-auto ${isSticky ? "fixed top-0 left-0 right-0 border-b duration-300" : ""
          }`}
      >
        <div className='flex items-center justify-between '>
          <Link to="/"  className='text-3xl font-semibold flex text-green-600 mb-2 '>
            <span>Techify</span>
          </Link>
          {/* Nav items for large devices */}
          <ul className='hidden md:flex space-x-12  '>
            {navItems.map(({ name, path }) => (
              <li
                className='text-red-600 transition-all delay-75 hover:text-red-400  text-xl'
                key={path}
              >
                <Link to={path} spy={true} smooth={true} offset={-100}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* buttons for large devices */}
          <div className='flex justify-between items-center space-x-4 text-green-500'>
            <div className='relative hidden md:block'>
              <input
                className='focus:outline-none border-none bg-gray-200 rounded-xl px-2 py-1/2 pl-8'
                type='text'
                placeholder='Search...'
              />
              <FaSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-300 ' />
            </div>

            <div className='flex space-x-4  py-4'>
              <div className='relative'>
              <Link to="/cart">
                <FaShoppingCart className='text-2xl cursor-pointer text-green-500' /> 
                </Link>
                <span className='absolute -top-2 -right-2  bg-red-500 text-white rounded-full px-1 py-1/2 text-xs'>
                  0
                </span>
              </div>
              <div className='relative'>
              <Link to="/whishlist">
                <FaHeart className='text-2xl cursor-pointer' />
                </Link>
                <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 py-1/2 text-xs'>
                  0
                </span>
              </div>
              <div>
                <Link to="/profile">
                <CgProfile className='text-2xl cursor-pointer' />
                </Link>
              </div>
            </div>

            {/* Menu items for only for mobile devices */}
            <div className='md:hidden'>
              <button
                className='focus:outline-none focus:text-gray-500'
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <FaXmark className='xl md:text-2xl' />
                ) : (
                  <FaBarsStaggered className='xl md:text-2xl' />
                )}
              </button>
            </div>
          </div>
          {/* Nav items for mobile devices */}
          <div
            className={`space-y-4 px-4 mt-16 py-6 z-50 bg-green-600 flex flex-col ${isMenuOpen ? "block fixed top-0 left-0 right-0" : "hidden"
              }`}
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={path}
                className='text-white hover:text-gray-600 font-medium text-xl'
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className='relative block md:hidden'>
          <input
            className='focus:outline-none border-none w-full mt-1 bg-gray-200 rounded-xl px-2 py-1/2 pl-8 '
            type='text'
            placeholder='Search...'
          />
          <FaSearch className='absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-300 md:hidden' />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
