import React, { useContext, useState } from 'react';
import loginimg from "../asset/Images/login.png";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
// import { useDispatch } from 'react-redux'; 

const ForgotPassword = () => {
 const [showOldPassword, setShowOldPassword] = useState(false);
 const [showNewPassword, setShowNewPassword] = useState(false);


 const navigate = useNavigate();
 // const {fetchUserDetails} = useContext(Context);
 // const dispatch = useDispatch(); 

 const [email, setEmail] = useState('');
 const [oldPassword, setOldPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');

 const [errors, setErrors] = useState({});

 const validateInputs = () => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  if (!email.trim()) {
   toast.error("Email is required.");
   errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
   toast.error("Please enter a valid email address.");
   errors.email = "Invalid email format.";
  }

  if (!oldPassword.trim()) {
   toast.error("Old Password is required.");
   errors.oldPassword = "Old Password is required.";
  } else if (!passpattern.test(oldPassword)) {
   toast.error("Old password does not meet criteria (8+ chars, uppercase, lowercase, number, special char).");
   errors.oldPassword = "Invalid old password format.";
  }


  if (!newPassword.trim()) {
   toast.error("New Password is required.");
   errors.newPassword = "New Password is required.";
  } else if (!passpattern.test(newPassword)) {
   toast.error("New password does not meet criteria (8+ chars, uppercase, lowercase, number, special char).");
   errors.newPassword = "Invalid new password format.";
  }


  setErrors(errors);
  return Object.keys(errors).length === 0;
 };


 const handleChange = (e, fieldName) => {
  const { value } = e.target;
  if (fieldName === 'email') setEmail(value);
  else if (fieldName === 'oldPassword') setOldPassword(value);
  else if (fieldName === 'newPassword') setNewPassword(value);

  if (errors[fieldName]) {
   setErrors(prev => ({ ...prev, [fieldName]: null }));
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateInputs()) {
   return;
  }

  try {
   const response = await fetch(SummaryApi.ChangePassword.url, {
    method: SummaryApi.ChangePassword.method,
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, oldPassword, newPassword })
   });

   const data = await response.json();

   if (data.success) {
    toast.success("Password changed successfully!");
    navigate('/Login');
   } else {
    toast.error(data.message || "Failed to change password.");
   }
  } catch (error) {
   console.error("Change password failed:", error);
   toast.error("An error occurred. Please try again.");
  }
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-white via-white to-white flex items-center justify-center p-4">
   <div className="absolute top-10 left-10 w-40 h-40 bg-gray-100 rounded-lg shadow-lg opacity-70 transform rotate-12"></div>
   <div className="absolute bottom-20 left-10 w-60 h-60 bg-gray-200 rounded-lg shadow-lg opacity-70 transform -rotate-12"></div>
   <div className="absolute bottom-20 right-16 w-60 h-60 bg-gray-100 rounded-lg shadow-lg opacity-80 transform -rotate-6"></div>
   <div className="absolute top-32 right-32 w-52 h-52 bg-gray-200 rounded-lg shadow-lg opacity-80 transform rotate-3"></div>

   <div className="w-[90%] max-w-4xl bg-white/90 p-8 md:p-10 rounded-xl shadow-lg relative z-10">
    <h1 className="text-left text-black text-3xl font-bold mb-8">Change Password</h1> 

    <div className="flex flex-col md:flex-row items-center gap-12">
     <div className="md:w-1/2">
      <img className="w-full rounded-lg shadow-md" src={loginimg} alt="Change Password" />
     </div>

     <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md"> 
      <h2 className="text-left text-gray-800 text-xl mb-6">Enter your details to change password</h2> 
      <form className="space-y-6" onSubmit={handleSubmit}>

       <div className={`flex items-center border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-gray-500 transition duration-200`}>
        <FaUser className="text-gray-600 text-xl mr-3" />
        <input
         type="email"
         value={email}
         onChange={(e) => handleChange(e, 'email')}
         className="w-full focus:outline-none bg-white text-gray-800 placeholder-gray-500"
         placeholder="Enter your email"
         required
        />
       </div>

       <div className={`flex items-center border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-gray-500 transition duration-200`}>
        <FaLock className="text-gray-600 text-xl mr-3" />
        <input
         type={showOldPassword ? "text" : "password"}
         value={oldPassword}
         onChange={(e) => handleChange(e, 'oldPassword')}
         className="w-full focus:outline-none bg-white text-gray-800 placeholder-gray-500"
         placeholder="Enter your old password"
         required
        />
        <button
         type="button"
         onClick={() => setShowOldPassword(!showOldPassword)}
         className="text-gray-600 text-xl ml-3 focus:outline-none"
        >
         {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
       </div>

       <div className={`flex items-center border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-gray-500 transition duration-200`}>
        <FaLock className="text-gray-600 text-xl mr-3" />
        <input
         type={showNewPassword ? "text" : "password"}
         value={newPassword}
         onChange={(e) => handleChange(e, 'newPassword')}
         className="w-full focus:outline-none bg-white text-gray-800 placeholder-gray-500"
         placeholder="Enter your new password"
         required
        />
        <button
         type="button"
         onClick={() => setShowNewPassword(!showNewPassword)}
         className="text-gray-600 text-xl ml-3 focus:outline-none"
        >
         {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
       </div>


       <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg" 
       >
        Change Password
       </button>
      </form>
      <p className="text-center text-gray-700 mt-6"> 
       Remember your password? <NavLink to="/login" className="text-gray-800 font-medium hover:underline">Login here</NavLink> 
      </p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ForgotPassword;