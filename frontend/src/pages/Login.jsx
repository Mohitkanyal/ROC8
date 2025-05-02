// import React, { useContext, useState } from 'react';
// import loginimg from "../asset/Images/login.png"; // Assuming this image fits the theme or is a placeholder
// import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import SummaryApi from "../common";
// import Context from "../context"; // Assuming Context is correctly imported and used
// import { useDispatch } from 'react-redux'; // Assuming Redux is set up


// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const navigate = useNavigate();
//   const { fetchUserDetails } = useContext(Context); // Assuming this function exists in Context
//   const dispatch = useDispatch(); // Assuming Redux dispatch is needed here (though fetchUserDetails is called directly after login)

//   const [data, setData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({}); // State for validation errors

//   const validateInputs = () => {
//      const errors = {};
//      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//      if (!data.email.trim()) {
//          toast.error("Email is required.");
//          errors.email = "Email is required.";
//      } else if (!emailPattern.test(data.email)) {
//          toast.error("Please enter a valid email address.");
//          errors.email = "Invalid email format.";
//      }

//      if (!data.password.trim()) {
//          toast.error("Password is required.");
//          errors.password = "Password is required.";
//      }
//      // Password pattern validation is typically done during registration, not login
//      // as the user might not remember the specific pattern rules.
//      // Basic check for empty is sufficient for login.

//      setErrors(errors);
//      return Object.keys(errors).length === 0;
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       };
//     });
//      // Clear validation error for the current field when user types
//      if (errors[name]) {
//           setErrors(prev => ({ ...prev, [name]: null }));
//      }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) {
//       return;
//     }

//     try {
//        const dataResponse = await fetch(SummaryApi.login.url, {
//          method: SummaryApi.login.method,
//          credentials: 'include',
//          headers: {
//            "content-type": "application/json"
//          },
//          body: JSON.stringify(data)
//        });

//        const dataApi = await dataResponse.json();

//        if (dataApi.success) {
//          toast.success(dataApi.message);
//          if (fetchUserDetails) { // Check if fetchUserDetails exists
//              fetchUserDetails(); // Fetch user details after successful login
//          } else {
//              console.warn("fetchUserDetails function not available in context.");
//          }
//          navigate('/Home'); // Navigate to Home on success
//        } else { // Handle API error response
//          toast.error(dataApi.message || "Login failed. Please check your credentials.");
//        }
//     } catch (error) { // Handle network or other errors
//         console.error("Login failed:", error);
//         toast.error("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900 font-sans flex items-center justify-center p-4"> {/* Changed background and text color, added padding */}
//       {/* Removed absolute positioned colored elements */}

//       <div className="w-full max-w-4xl bg-white/90 p-8 md:p-10 rounded-xl shadow-lg relative z-10"> {/* Changed background, padding, max-width, roundedness, shadow */}
//         <h1 className="text-left text-gray-900 text-3xl font-bold mb-8">Welcome Back</h1> {/* Changed text color */}

//         <div className="flex flex-col md:flex-row items-center gap-12">
//           <div className="md:w-1/2">
//             <img className="w-full rounded-lg shadow-md" src={loginimg} alt="login-img" /> {/* Added shadow */}
//           </div>

//           <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md"> {/* Changed background, padding, roundedness, shadow */}
//             <h2 className="text-left text-gray-800 text-xl mb-6">Please Login to Continue</h2> {/* Changed text color */}
//             <form className="space-y-6" onSubmit={handleSubmit}>

//               <div className={`flex items-center border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-gray-500 transition duration-200`}> {/* Styled input container */}
//                 <FaUser className="text-gray-600 text-xl mr-3" /> {/* Styled icon */}
//                 <input
//                   type="email" // Use type email for better accessibility and browser validation
//                   name='email' value={data.email} onChange={handleChange}
//                   className="w-full focus:outline-none bg-white text-gray-800 placeholder-gray-500" // Styled input
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className={`flex items-center border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-gray-500 transition duration-200`}> {/* Styled input container */}
//                 <FaLock className="text-gray-600 text-xl mr-3" /> {/* Styled icon */}
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name='password' value={data.password} onChange={handleChange}
//                   className="w-full focus:outline-none bg-white text-gray-800 placeholder-gray-500" // Styled input
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="text-gray-600 text-xl ml-3 focus:outline-none" // Styled icon button
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-all shadow-lg" // Styled as primary button
//               >
//                 Login
//               </button>
//             </form>
//             <div className="text-right mt-4"> {/* Added margin top */}
//               <NavLink to="/forgotpassword" className="text-gray-700 text-sm hover:underline font-medium"> {/* Styled link */}
//                 Forgot Password?
//               </NavLink>
//             </div>
//             <p className="text-center text-gray-700 mt-6"> {/* Styled text */}
//               Don't have an account? <NavLink to="/register" className="text-gray-800 font-medium hover:underline">Register here</NavLink> {/* Styled link */}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useContext, useState } from 'react';
import loginimg from "../asset/Images/login.png";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
import { useDispatch } from 'react-redux';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      errors.email = "Please enter a valid email address.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const dataResponse = await fetch(SummaryApi.login.url, {
      method: SummaryApi.login.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/Home');
      dispatch(fetchUserDetails());
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-10 left-10 w-40 h-40 bg-gray-100 rounded-lg shadow-lg opacity-70 transform rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-gray-200 rounded-lg shadow-lg opacity-70 transform -rotate-12"></div>
      <div className="absolute bottom-20 right-16 w-60 h-60 bg-gray-100 rounded-lg shadow-lg opacity-80 transform -rotate-6"></div>
      <div className="absolute top-32 right-32 w-52 h-52 bg-gray-200 rounded-lg shadow-lg opacity-80 transform rotate-3"></div>

      <div className="w-[90%] top-12 md:w-[70%] lg:w-[60%] bg-white p-10 rounded-lg shadow-2xl relative z-10">
        
        <h1 className="text-left text-black text-3xl font-bold mb-8">Welcome Back</h1>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <img className="w-full rounded-lg" src={loginimg} alt="login-img" />
          </div>
          
          <div className="md:w-1/2 bg-gray-100 p-10 rounded-lg">
            <h2 className="text-start text-gray-700 text-xl mb-6">Please Login to Continue..</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="flex items-center border rounded-md p-3 bg-white">
                <FaUser className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  name='email'
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
                  name='password'
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
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-all"
              >
                Login
              </button>
            </form>

            <div className="text-right">
              <NavLink to="/forgotpassword" className="text-sm text-black hover:underline font-medium">
                Forgot Password?
              </NavLink>
            </div>

            <p className="text-center text-gray-700 mt-6">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-black font-medium hover:underline">
                Register here
              </NavLink>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
