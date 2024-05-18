import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";

const EditPrductForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrls.push(event.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
    try {
      // Upload images
      await uploadProductImage(formData).unwrap();
      setImagePreview(imageUrls[0]);
      setImgUrl(imageUrls);
      toast.success("Images uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  const onSubmit = async (data) => {
    try {
      const {
        name,
        price,
        image,
        category,
        brand,
        description,
        stockQuantity,
      } = data;
      await updateProduct({
        productId,
        name,
        price,
        image: imgUrl,
        category,
        brand,
        description,
        stockQuantity,
      }).unwrap();
      toast.success("Product Updated Successfully");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (product) {
      setImagePreview(product.image[0]);
    }
  }, [product]);
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
              <div className="flex flex-col items-start space-y-5 w-full ">
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
                    {...register("stockQuantity")}
                    type="number"
                    min={0}
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

              <div className="w-full flex flex-col items-start justify-start ">
                <label className="block mb-2 text-base font-semibold">
                  Product Image
                </label>
                {/* Display image preview */}
                {imagePreview && (
                  <div className="w-full bg-white border rounded-lg mb-2 flex items-center justify-center ">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-auto mt-2 h-40 bg-white"
                    />
                  </div>
                )}
                <div className="w-full">
                  {errors.image && (
                    <p className="text-red-500">Please Upload image</p>
                  )}
                  <input
                    type="file"
                    multiple
                    accept=".jpg, .jpeg, .png"
                    placeholder="Product Image"
                    {...register("image", { required: true })}
                    onChange={(e) => uploadFileHandler(e)}
                    className="w-full py-2 px-2 text-base rounded-md outline-none bg-white border border-gray-500"
                  />
                </div>
                {loadingUpload && <Loader />}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditPrductForm;
