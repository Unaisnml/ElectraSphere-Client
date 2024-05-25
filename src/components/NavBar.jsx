import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navItems } from "../constants/index";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSearchProductsQuery } from "../slices/productApiSlice";
import { logout } from "../slices/authSlice";
import AdminNav from "./AdminNav";

const NavBar1 = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishList);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [] } = useSearchProductsQuery(searchQuery, {
    skip: searchQuery.length < 2,
  });

  const handleSearchChange = (event) => {
    console.log("value", event.target.value);
    setSearchQuery(event.target.value);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      // setSearchQuery("");
      setIsSearchDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsSearchDropdownOpen(true);
    } else {
      setIsSearchDropdownOpen(false);
    }
  }, [searchQuery]);

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
    <section className="fixed z-50 top-0 right-0 left-0">
      {userInfo?.isAdmin && (
        <div className="fixed md:w-1/5 z-40 left-0 top-0 bottom-0 border-r bg-white flex flex-col items-center">
          <AdminNav />
        </div>
      )}
      <header className="padding-x md:py-6 py-5 z-30 w-full bg-white shadow">
        <nav className="flex justify-between items-center max-container ">
          <Link to="/">
            <h2 className="md:text-4xl text-2xl font-bold flex text-black ">
              SHOP.CO
            </h2>
          </Link>
          {!userInfo?.isAdmin && (
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
          )}

          <div className="flex justify-center items-center gap-10 md:gap-6 text-2xl text-black max-lg:gap-3">
            <div className="relative max-lg:hidden " ref={searchRef}>
              <input
                className=" border-none focus:outline-none bg-blue-100 text-base rounded-xl px-2 py-1 pl-8  "
                type="text"
                placeholder="Search for Products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className="absolute  left-2 top-1/2 text-base transform -translate-y-1/2 text-gray-400 " />
              {isSearchDropdownOpen && searchResults.length > 0 && (
                <ul className="absolute bg-white shadow-lg text-base rounded w-full mt-1 max-h-40 overflow-y-auto z-10">
                  {searchResults.map((product) => (
                    <li
                      key={product._id}
                      className="p-1  hover:bg-blue-100 flex items-center lowercase gap-1"
                    >
                      <img src={product.image[0]} alt="" className="w-5 h-5" />
                      <Link
                        to={`/products/${product._id}`}
                        onClick={() => setSearchQuery("")}
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!userInfo?.isAdmin && (
              <>
                <Link to="/cart" className="relative">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="count-div w-24">{cartItems.length}</span>
                  )}
                </Link>
                <Link to="/wishList" className="relative">
                  <FaHeart />
                  {wishlistItems.length > 0 && (
                    <span className="count-div">{wishlistItems.length}</span>
                  )}
                </Link>
              </>
            )}

            {/*dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
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
                  <div className="py-1 w-full" role="none">
                    {!userInfo?.isAdmin && (
                      <>
                        <Link
                          to="/profile"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/order/my-orders"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          My Orders
                        </Link>
                      </>
                    )}

                    <button
                      className="text-gray-700  px-4 py-2 text-sm w-full text-start"
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

            {/* Hamburger mernu*/}
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

        {/* Search bar for small devices */}
        <div className="hidden relative  max-lg:block my-2">
          <input
            className="focus:outline-none border-none w-full mt-1 bg-gray-200 rounded-xl px-2 py-1/2 pl-8 "
            type="text"
            placeholder="Search for Products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-300 " />
          {searchResults.length > 0 && (
            <ul className="absolute bg-white shadow-lg text-base rounded w-full mt-1 max-h-40 overflow-y-auto z-10">
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className="p-1  hover:bg-blue-100 flex items-center lowercase gap-1"
                >
                  <img src={product.image[0]} alt="" className="w-5 h-5" />
                  <Link
                    to={`/products/${product._id}`}
                    onClick={() => setSearchQuery("")}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </section>
  );
};

export default NavBar1;
