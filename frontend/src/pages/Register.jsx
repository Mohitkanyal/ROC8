import React, { useState } from 'react';
import loginimg from "../asset/Images/login.png";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import SummaryApi from '../common';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    number: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const errors = {};
    if (!/^[A-Za-z\s]{2,}$/.test(data.name)) {
      toast.error("Name must be at least 2 characters and contain only letters.");
      errors.name = "Invalid Name";
    }

    if (!/^[6-9]\d{9}$/.test(data.number)) {
      toast.error("Phone number must be 10 digits.");
      errors.number = "Invalid Phone Number";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      errors.email = "Invalid Email";
    }

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passPattern.test(data.password)) {
      toast.error("Password must be at least 6 characters, with one uppercase, one lowercase, one number and one special character.");
      errors.password = "Weak Password";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const response = await fetch(SummaryApi.register.url, {
      method: SummaryApi.register.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative Boxes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gray-100 rounded-lg shadow-lg opacity-70 transform rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-gray-200 rounded-lg shadow-lg opacity-70 transform -rotate-12"></div>
      <div className="absolute bottom-20 right-16 w-60 h-60 bg-gray-100 rounded-lg shadow-lg opacity-80 transform -rotate-6"></div>
      <div className="absolute top-32 right-32 w-52 h-52 bg-gray-200 rounded-lg shadow-lg opacity-80 transform rotate-3"></div>

      {/* Main Content */}
      <div className="w-[90%] top-12 md:w-[70%] lg:w-[60%] bg-white p-10 rounded-lg shadow-2xl relative z-10">

        <h1 className="text-left text-black text-3xl font-bold mb-8">Join ROC8</h1>

        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Image */}
          <div className="md:w-1/2">
            <img className="w-full rounded-lg" src={loginimg} alt="register-img" />
          </div>

          {/* Form */}
          <div className="md:w-1/2 bg-gray-100 p-10 rounded-lg">
            <h2 className="text-start text-gray-700 text-xl mb-6">Please Register to Continue..</h2>
            <form className="space-y-6" onSubmit={handleSubmit} method='post'>

              <div className="flex items-center border rounded-md p-3 bg-white">
                <FaUser className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-white text-black"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="flex items-center border rounded-md p-3 bg-white">
                <FaPhone className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  name="number"
                  value={data.number}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-white text-black"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <div className="flex items-center border rounded-md p-3 bg-white">
                <FaEnvelope className="text-gray-500 text-xl mr-3" />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-white text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex items-center border rounded-md p-3 bg-white">
                <FaLock className="text-gray-500 text-xl mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-white text-black"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 text-xl ml-3 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-all"
              >
                Register
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Already have an account? <NavLink to="/login" className="text-black font-medium hover:underline">Login here</NavLink>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
