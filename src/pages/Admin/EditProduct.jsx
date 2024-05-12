import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productApiSlice";

import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";

const EditPrductForm = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const onSubmit = async (data) => {
    try {
      const { name, email, isAdmin } = data;
      await updateProduct({ productId, name, email, isAdmin });
      toast.success("User Updated Successfully");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <section className="w-full pl-[18rem]  h-auto bg-gray-200 mt-20 pr-4 py-6 mx-auto max-container  ">
      <h3 className="font-semibold text-xl my-3 ">Product Details</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Product data not found</Message>
      ) : (
        <div className="  mx-auto md:px-1 px-4">
          <div className="bg-[#FAFAFA] py-10 px-4 lg:px-10 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-full flex justify-between gap-6"
            >
              {/* Left part of the form */}
              <div className="flex flex-col items-start space-y-5 w-full border">
                <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    defaultValue={product.name}
                    {...register("name")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Description
                  </label>
                  <textarea
                    placeholder="Description"
                    defaultValue={product.description}
                    {...register("description")}
                    className="w-full h-24 py-2 px-2 outline-none border border-gray-500 rounded-md text-base"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Category"
                    defaultValue={product.category}
                    {...register("category")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="Brand Name"
                    defaultValue={product.brand}
                    {...register("brand")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Stock Quantity
                  </label>
                  <input
                    placeholder="Stock Quantity"
                    defaultValue={product.stockQuantity}
                    type="number"
                    min={0}
                    {...register("stockQuantiy")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>
                <div className=" w-full">
                  <label className="block mb-2 text-base font-semibold">
                    Product Price
                  </label>
                  <input
                    placeholder="Price"
                    min={0}
                    type="number"
                    defaultValue={product.price}
                    {...register("price")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>
                <div className="w-full flex justify-start gap-4 my-4">
                  <button
                    type="submit"
                    className="bg-black text-white text-base px-2 py-2"
                    // disabled={loadingUpdate}
                  >
                    Update
                    {/* {loadingUpdate ? "Updating..." : "Update"} */}
                  </button>
                  <Link
                    to="/admin/products"
                    className="py-2 px-2  bg-black text-white text-base"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
              {/* Right part of form */}

              <div className="w-full flex flex-col items-start justify-start border">
              <div className="w-full">
                  <label className="block mb-2 text-base font-semibold">
                  Product Image
                  </label>
                  <input
                    type="file"
                    placeholder="Product Image"
                    defaultValue={product.image}
                    {...register("image")}
                    className="w-full py-2 px-2 text-base rounded-md outline-none border border-gray-500"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditPrductForm;
