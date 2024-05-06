import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, savePaymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("selected", paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="flex flex-col px-6 w-full  items-start">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
      <form onSubmit={submitHandler} className="w-full ">
        <div className="flex flex-col gap-6">
          <label className="block mb-2">Available Payment Methods</label>
          <div className="space-y-8">
            <div>
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={() => setPaymentMethod("PayPal")}
                className="cursor-pointer"
              />
              <label htmlFor="PayPal" className="ml-2">
                PayPal or Card
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="cursor-pointer"
              />
              <label htmlFor="PayPal" className="ml-2">
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-black w-full text-white py-2 px-4 rounded-sm  focus:outline-none "
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;
