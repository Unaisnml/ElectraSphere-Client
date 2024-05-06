import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from "./Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterForm = (initialValues) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

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

  const onSubmitHandler = async (values, { setSubmitting }) => {
    console.log(values, "Submit");
    setSubmitting(true);
    const { name, email, password } = values;
    
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("Hellloooooo");
        // console.log(userInfo.email);
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ isLoading }) => (
        <Form className="flex flex-col w-full md:gap-8 gap-4">
          <h1 className="text-xl font-semibold">Sign Up</h1>

          <div className="gap-2">
            <label htmlFor="name" className=" text-sm text-gray-500">
              Name
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="input  focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="gap-2">
            <label htmlFor="email" className=" text-sm text-gray-500">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="email@email.com"
              className="input  focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="gap-2">
            <label htmlFor="password" className=" text-sm  text-gray-500">
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="input  focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
              // autocomplete="current-password"
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
              className=" text-sm  text-gray-500"
            >
              Repeat Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="input  focus:outline-none w-full bg-gray-200 text-sm px-4 py-2"
              // autocomplete="current-password"
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
            disabled={isLoading}
          >
            {isLoading ? "Resitering..." : "Signup"}
          </button>
          {isLoading ? (<Loader />) : ""}

          <div className="flex md:flex-row flex-col justify-center items-center md:mt-2 space-y-2 text-sm">
            {/* <Link to="/forgot-password">Forgot Password?</Link> */}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Existing Customer? <span className="text-blue-700"> Login</span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
