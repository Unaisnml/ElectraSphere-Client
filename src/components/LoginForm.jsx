import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginForm = (initialValues) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { email, password } = values;
    try {
      const res = await login({ email, password }).unwrap();
      console.log("response", res);
      dispatch(setCredentials({ ...res })); //new code

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
          <h1 className="text-xl font-semibold">Sign In</h1>
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
          <button
            type="submit"
            className="bg-black text-white text-sm py-1"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isLoading && <Loader />}

          <div className="flex md:flex-row flex-col justify-between items-center md:mt-2 space-y-2 text-sm">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              New Customer?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
