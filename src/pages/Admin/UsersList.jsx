import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    if (await confirmDelete()) {
      try {
        await deleteUser(userId);
        toast.success("Deleted Succesfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const confirmDelete = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to delete User?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        icon: "warning",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  return (
    <section className="w-full pl-[18rem]  min-h-screen max-h-auto bg-gray-200 mt-20 pr-4 py-6 mx-auto max-container  ">
      <h3 className="font-semibold text-xl mb-3 ">Registered Users</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">No User Found</Message>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-base bg-gray-50 font-semibold text-green-500 uppercase">
              <th className="px-6 py-3   tracking-wider">Name</th>
              <th className="px-6 py-3   tracking-wider">Email</th>
              <th className="px-6 py-3   tracking-wider">Admin</th>
              <th className="px-6 py-3   tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center ">
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex ">
                  {!user.isAdmin && (
                    <div className="flex items-center justify-center gap-2 text-xl">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="text-green-600 px-3 py-1 ">
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 px-3 py-1 "
                        onClick={() => deleteHandler(user._id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {/* Additional rows */}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UsersList;
