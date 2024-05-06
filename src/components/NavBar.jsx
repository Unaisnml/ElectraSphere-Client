import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navItems } from "../constants/index";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const NavBar1 = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    console.log("logout");
    try {
      await logutApiCall().unwrap();
      dispatch(logout());
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <header className="padding-x md:py-6 py-5 z-30 w-full bg-white shadow">
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
                  {/* {cartItems.reduce((a, c) => a + c.count, 0)} */}
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/whishlist" className="relative">
              <FaHeart />
              <span className="count-div">5</span>
            </Link>
            {/* <Link to='/login' className="flex items-center justify-center text-lg gap-1">
            <CgProfile className="cursor-pointer" />
            Login
            </Link> */}
            {/* ---------------------------------------------------------------------------------- */}
            <div className="relative inline-block text-left">
              <div>
                {userInfo ? (
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-1 items-center text-base font-semibold text-gray-900 shadow-sm   hover:bg-gray-100"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={handleButtonClick}
                  >
                    <CgProfile className="cursor-pointer text-lg" />
                    {userInfo.name.slice(0, 5)}
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="border text-base py-1 px-2  shadow-md"
                  >
                    Login
                  </Link>
                )}
              </div>
              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                    <Link
                      to="/profile"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      My Profile
                    </Link>
                    <button
                      className="text-gray-700  px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ---------------------------------------------- */}

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
      {/* <hr className="w-full h-0.5 border-gray-400" /> */}
    </section>
  );
};

export default NavBar1;
