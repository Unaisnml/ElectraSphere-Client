import React from "react";
import { VscSend } from "react-icons/vsc";

const Footer = () => {
  return (
    <footer className=" bg-black fixed bottom-0 w-full z-10">
      <div className=" container flex flex-wrap justify-center mx-auto py-20 text-white md:justify-between  ">
        <div className="flex flex-col justify-between items-start">
          <h1 className="text-xl font-semibold ">Exclusive</h1>
          <h3 className="text-lg font-medium">Subscribe</h3>
          <p className="text-base ">Get 10% off your first order</p>
          <div className="relative">
            <input
              placeholder="Enter your email"
              className="text-md focus:outline-none rounded-sm p-2 border-[1px] border-white bg-transparent"
            />
            <VscSend className=" absolute right-3 top-3 text-xl text-white" />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex flex-col justify-between space-y-8">
            <h1 className="text-xl font-semibold ">Support</h1>
            <p className="text-sm ">Block- 5, MG Road, Ernakulam</p>
            <p className="text-sm ">support.techify@gmail.com</p>
            <p className="text-sm ">+91 9500100100</p>
          </div>
        </div>
        <div className="flex flex-col justify-between space-y-4 items-start ">
          <h1 className="text-xl font-semibold mb-3">Account</h1>
          <a className="text-sm ">My Account</a>
          <a href="#" className="text-sm ">
            Login / Register
          </a>
          <a href="#" className="text-sm ">
            Cart
          </a>
          <a href="#" className="text-sm ">
            Whishlist
          </a>
          <a href="#" className="text-sm ">
            Shop
          </a>
        </div>
        <div className="flex flex-col justify-between space-y-4 items-start ">
          <h1 className="text-xl font-semibold mb-3">Quick Links</h1>
          <a className="text-sm ">Privacy policy</a>
          <a href="#" className="text-sm ">
            Terms of Use
          </a>
          <a href="#" className="text-sm ">
            FAQ
          </a>
          <a href="#" className="text-sm ">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
