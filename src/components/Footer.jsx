import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { footerLogo } from "../assets/images";
import { footerLinks, paymentMethods, socialMedia } from "../constants/index";
import Line from "../components/Line";
import { useSelector } from "react-redux";

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {/* Top black card */}
      {!userInfo?.isAdmin && (
        <footer className="max-container bg-[#dbdbdb] mt-20 relative  pb-16">
          <div className="flex md:flex-row flex-col md:justify-between  items-center justify-center bg-black rounded-xl container md:mx-44 mx-auto md:px-8 px-4 py-6 gap-8 absolute -top-16 ">
            <h1 className="text-white text-3xl font-bold md:max-w-96 max-w-64 font-[Poppins]">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h1>
            <div className="flex flex-col items-center justify-center relative gap-y-4">
              <input
                type="text"
                className="rounded-full border-none focus:outline-none w-full text-base font-[Poppins] text-gray-400 px-10 py-2"
                placeholder="Enter your email address"
              />
              <TfiEmail className="absolute left-4 top-3 text-lg" />
              <button className="px-11 py-2 bg-white rounded-full font-[Poppins] font-semibold text-base">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
          {/* Footer items container */}
          <div className="container mx-auto flex justify-between md:px-1 md:pt-32 pt-64  items-start gap-20 flex-wrap max-lg:flex-col">
            <div className="flex flex-col items-start">
              <a href="/">
                <img src={footerLogo} alt="" width={150} height={46} />
              </a>
              <p className="mt-6 text-base leading-7 font-[Poppins] md:max-w-[18rem] sm:max-w-sm text-white-400">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="mt-8 flex items-center gap-4 ">
                {socialMedia.map((icon) => (
                  <div
                    key={icon.alt}
                    className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer"
                  >
                    <img src={icon.src} alt={icon.alt} width={24} height={24} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 justify-between md:gap-10 gap-24 flex-wrap">
              {footerLinks.map((section) => (
                <div key={section}>
                  <h4 className="text-black font-[Poppins] text-2xl font-semibold leading-normal mb-6">
                    {section.title}
                  </h4>
                  <ul>
                    {section.links.map((link) => (
                      <li
                        className="mt-3 text-white-400 font-montserrat text-base hover:text-slate-gray cursor-pointer"
                        key={link.name}
                      >
                        <a>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="container mx-auto flex flex-col mt-8">
            <hr className="border-gray-300 mb-4" />
            <div className="flex md:flex-row justify-between items-center flex-col gap-8">
              <p className="text-base font-semibold font-[Poppins]">
                Shop.co &#169; 2024, All Rights Reserved
              </p>

              <div className=" flex items-center gap-4 ">
                {paymentMethods.map((icon) => (
                  <div
                    key={icon.alt}
                    className="flex justify-center items-center w-14 h-8 bg-white rounded-sm cursor-pointer"
                  >
                    <img src={icon.src} alt={icon.alt} width={28} height={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}

      {userInfo?.isAdmin && (
        <footer className="bg-gray-200">
          <div className="  flex flex-col  w-full relative right-0 left-0 bottom-0 py-4">
            <hr className="border-gray-300 mb-4 max-w-full" />
            <div className="flex md:flex-row justify-center items-center flex-col ">
              <p className="text-base font-semibold ">
                Shop.co &#169; 2024, All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
