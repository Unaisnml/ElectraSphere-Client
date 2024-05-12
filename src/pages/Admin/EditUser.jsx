import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
// import CreatableSelect from 'react-select/creatable';

const EditUserForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUserDetails, { isLoading: updateLoading }] =
    useUpdateUserDetailsMutation();

  const onSubmit = async (data) => {
    try {
      const { name, email,isAdmin } = data;
      await updateUserDetails({ userId, name, email, isAdmin });
      toast.success("User Updated Successfully");
      refetch();
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <section className="w-full pl-[18rem]  h-auto bg-gray-200 mt-20 pr-4 py-6 mx-auto max-container  ">
      <Link
        to="/admin/users"
        className="py-2 px-2 my-4 bg-black text-white text-base"
      >
        Go Back
      </Link>
      <h3 className="font-semibold text-xl my-3 ">Edit User</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">User data not found</Message>
      ) : (
        <div className="  mx-auto md:px-1 px-4">
          <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="flex flex-col items-start space-y-5">
                <div className="md:w-1/2 w-full">
                  <label className="block mb-2 text-base">User Name</label>
                  <input
                    placeholder="Name"
                    defaultValue={user.name}
                    {...register("name")}
                    className="w-full py-2 px-2 text-base outline-none bg-blue-100"
                  />
                </div>

                <div className="md:w-1/2 w-full">
                  <label className="block mb-2 text-base">Email</label>
                  <input
                    placeholder="Email"
                    defaultValue={user.email}
                    {...register("email")}
                    className="w-full py-2 px-2 outline-none bg-blue-100"
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block mb-2 text-base">Make Admin</label>
                  <Controller
                    name="isAdmin"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <input
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-black text-white text-base px-2 py-2"
                // disabled={isLoading}
              >
                Update
                {/* {isLoading ? "Logging in..." : "Login"} */}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditUserForm;
