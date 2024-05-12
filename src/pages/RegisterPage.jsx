import React from 'react'
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    const initialValues = {
        name:"",
        email: "",
        password: "",
      };
  return (
    <section className="flex items-center justify-center mx-auto mb-16 mt-20 pb-16 pt-8 rounded-lg w-1/3">
        <RegisterForm initialValues={initialValues}/>
    </section>
  )
}

export default RegisterPage