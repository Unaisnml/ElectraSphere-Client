import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { ShippingAddress } = cart;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(saveShippingAddress(data));
    navigate('/payment')
  };
  return (
    <div className="flex flex-col p-4 w-full  items-start">
      <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {/* first rows */}

        <div className="  flex flex-col text-base gap-1">
          <label className="">House Name</label>
          <input
            placeholder="House Name"
            {...register("houseName", { required: "House Name is required" })}
            className=" bg-gray-100 md:py-2 py-1 px-3 focus:outline-none"
            defaultValue={cart.shippingAddress.houseName || ""}
          />
          {errors.houseName && (
            <span className="text-red-500">{errors.houseName.message}</span>
          )}
        </div>
        <div className="  flex flex-col text-base gap-1">
          <label className="">Street</label>
          <input
            placeholder="Street"
            {...register("streetAdress")}
            defaultValue={cart.shippingAddress.streetAdress || ""}
            className=" bg-gray-100 md:py-2 py-1 px-3 focus:outline-none"
          />
        </div>
        <div className="  flex flex-col text-base gap-1">
          <label className="">Town/City</label>
          <input
            placeholder="Town/City"
            {...register("city")}
            defaultValue={cart.shippingAddress.city || ""}
            className=" bg-gray-100 md:py-2 py-1 px-3 focus:outline-none"
          />
        </div>
        <div className="  flex flex-col text-base gap-1">
          <label className="">State</label>
          <input
            placeholder="State"
            {...register("state")}
            defaultValue={cart.shippingAddress.state || ""}
            className=" bg-gray-100 md:py-2 py-1 px-3 focus:outline-none"
          />
        </div>
        <div className="  flex flex-col text-base gap-1">
          <label className="">Postal Code</label>
          <input
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal Code is required" })}
            defaultValue={cart.shippingAddress.postalCode || ""}
            className=" bg-gray-100 md:py-2 py-1 px-3 focus:outline-none"
          />
          {errors.postalCode && (
            <span className="text-red-500">{errors.postalCode.message}</span>
          )}
        </div>
        <button
          type="submit"
          class="mt-12 bg-black text-white font-semibold py-2 rounded-sm cursor-pointer"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
