import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import { Loader } from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const ProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const products = data;
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // Create new Product
  const createProductHandler = async () => {
    // Show confirmation dialog using SweetAlert
    const confirmed = await Swal.fire({
      title: "Do you want to create a new product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmed.isConfirmed) {
      try {
        await createProduct();
        // Refetch product data
        refetch();
        toast.success("New Product Created");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  //Delete Product Handler
  const deleteHandler = async (id) => {
    // Show confirmation dialog using SweetAlert
    const confirmed = await Swal.fire({
      title: "Do you want to Delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (confirmed.isConfirmed) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };


  return (
    <section className="w-full pl-[18rem]  h-auto bg-gray-200 mt-20 pr-4 py-6 mx-auto max-container  ">
      <div className="flex justify-between w-full">
        <h3 className="font-semibold text-xl mb-3 "> Products</h3>
        <button
          className="py-2 px-4 bg-black text-white text-base"
          onClick={createProductHandler}
        >
          Create Product
        </button>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
      </div>
      <div className="w-full my-8 mx-auto grid md:grid-cols-3 grid-cols-1 gap-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">No Products Available</Message>
        ) : (
          <>
            {products.map((product, index) => (
              <div
                key={index}
                className="w-full h-auto rounded-lg bg-white p-6 overflow-hidden"
              >
                <div className="flex w-full gap-4 mb-2">
                  <Link to="/product">
                    <img
                      src={product.image}
                      alt="product"
                      className="h-32 w-30 rounded-md"
                    />
                  </Link>
                  <div className="flex  justify-between w-full gap-1">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm">{product.category}</p>
                      <p className="text-lg font-semibold">{product.price}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        className="px-2 py-1 shadow rounded-md text-lg text-red-700"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <MdDeleteForever />
                      </button>
                      <Link to={`/admin/products/${product._id}/edit`}>
                      <button className="px-2 py-1 shadow rounded-md text-lg text-blue-800">
                        <FiEdit />
                      </button>
                      </Link>

                     
                        

                    </div>
                  </div>
                </div>

                <h3 className="text-base font-semibold">Summary</h3>
                <p className="text-sm text-gray-600 max-w-auto my-3 overflow-hidden">
                  {product.description}
                </p>
                <div className="flex flex-col gap-2 border p-2 rounded-md">
                  <div className="flex justify-between">
                    <p className="text-sm">Sales</p>
                    <p className="text-sm">Sales count</p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <p className="text-sm">Remaining Products</p>
                    <p className="text-sm">stockQuantity</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductList;
