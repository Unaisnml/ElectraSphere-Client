import { apiSlice } from "./apiSlice";
import { ORDERS_URL, RAZORPAY_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkoutOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/checkout`,
        method: "POST",
        body: order,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/verifyPayment`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders:builder.query({
      query: ()=> ({
        url:`${ORDERS_URL}/myorders`
      }),
      keepUnusedDataFor: 5,
    }),
    packOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pack`,
        method: "PUT",
      }),
    }),

    shipOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCheckoutOrderMutation,
  useVerifyPaymentMutation,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  usePackOrderMutation,
  useShipOrderMutation,
  useDeliverOrderMutation,
} = orderApiSlice;
