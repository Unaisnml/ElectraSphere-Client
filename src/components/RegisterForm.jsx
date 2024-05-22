import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import {
  useRegisterMutation,
  useVerifyotpMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyotpMutation();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const otpSchema = Yup.object({
    otp: Yup.string().required("OTP is required"),
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    const { name, email, password } = values;
    setEmail(email);
    setSubmitting(true);
    try {
      const res = await register({ name, email, password }).unwrap();
      setOtpSent(true);
      toast.success("OTP sent to your email. Please verify.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setSubmitting(false);
  };

  const onOtpSubmitHandler = async (values, { setSubmitting }) => {
    const { otp } = values;
    setSubmitting(true);
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("OTP verified successfully!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setSubmitting(false);
  };

  return (
    <div>
      {otpSent ? (
        <Formik
          initialValues={{ otp: " " }}
          validationSchema={otpSchema}
          onSubmit={onOtpSubmitHandler}
        >
          {({ isSubmitting }) => (
            <Form
              className="flex flex-col w-full md:gap-8 gap-4"
              autoComplete="off"
            >
              <h1 className="text-xl font-semibold">Verify OTP</h1>
              <div className="gap-2">
                <label htmlFor="otp" className="text-sm text-gray-500">
                  OTP
                </label>
                <Field
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="input focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
                   autocomplete="off"
                  autoFocus
                  inputMode="numeric"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white text-sm py-1"
                disabled={isVerifying}
              >
                {isSubmitting || isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
              {isVerifying && <Loader />}
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({ isSubmitting }) => (
            <Form
              className="flex flex-col w-full md:gap-8 gap-4"
              autoComplete="off"
            >
              <h1 className="text-xl font-semibold">Sign Up</h1>
              <div className="gap-2">
                <label htmlFor="name" className="text-sm text-gray-500">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  autoComplete="name"
                  className="input focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                  autoComplete="email"
                  className="input focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="input focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-500"
                >
                  Repeat Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="input focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white text-sm py-1"
                disabled={isRegistering}
              >
                {isSubmitting || isRegistering ? "Registering..." : "Signup"}
              </button>
              {isRegistering && <Loader />}

              <div className="flex md:flex-row flex-col justify-center items-center md:mt-2 space-y-2 text-sm">
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Existing Customer?{" "}
                  <span className="text-blue-700"> Login</span>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default RegisterForm;
