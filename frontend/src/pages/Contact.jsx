import React, { useState } from "react";
import Aboutusimg from "../asset/Images/contact.jpg";
import Footer from "../components/Footer";
import { MdMap, MdCall } from "react-icons/md";
import { IoIosMailUnread } from "react-icons/io";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Banner1 from "../components/Banner1"; 

const Contact = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    if (!/^[A-Za-z\s]{2,}$/.test(data.name)) {
      toast.error("Name must be at least 2 characters and contain only letters.");
      errors.name = "Invalid name.";
    }
    if (!/^\d{10,15}$/.test(data.number)) {
         toast.error("Phone number must be 10 to 15 digits.");
         errors.number = "Invalid phone number.";
       }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      errors.email = "Invalid email.";
    }
    if (!data.message.trim()) {
       toast.error("Message cannot be empty.");
       errors.message = "Message cannot be empty.";
     }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const dataResponse = await fetch(SummaryApi.aboutusDetail.url, {
      method: SummaryApi.aboutusDetail.method,
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi?.message);
      // navigate("/Aboutus"); 
      setData({ name: "", email: "", number: "", message: "" });
    } else {
      toast.error(dataApi?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900 font-sans"> 
        <div className="container mx-auto py-16 px-8">
          <h1 className="text-4xl font-bold text-center mt-12 mb-4 text-gray-900">Contact Us</h1>
          <div className="flex items-center justify-center gap-2 border-b border-gray-300 pb-4 text-gray-800"> 
            <h1 className="text-xl font-semibold">Need help? Get in touch</h1>
          </div>
          <div className="text-center text-gray-700 text-sm py-4"> 
            <p>We're here to listen, advise, and help you successfully realize your dream job.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10 mt-10"> 
            <div className="flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-lg p-6 rounded-xl shadow-lg bg-white/90"> 
              <MdCall className="text-3xl text-gray-700" /> 
              <div>
                <h1 className="text-base font-semibold text-gray-800">Ring us</h1> 
                <a className="text-sm text-gray-600 hover:underline" href="tel:9930089196">
                  (+91) 99300 89196
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-lg p-6 rounded-xl shadow-lg bg-white/90">
              <MdMap className="text-3xl text-gray-700" /> 
              <div>
                <h1 className="text-base font-semibold text-gray-800">Visit us</h1> 
                <p className="text-sm text-gray-600">APSIT, Thane(W) India</p> 
              </div>
            </div>
            <div className="flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-lg p-6 rounded-xl shadow-lg bg-white/90">
              <IoIosMailUnread className="text-3xl text-gray-700" />
              <div>
                <h1 className="text-base font-semibold text-gray-800">Send us an Email</h1> 
                <a className="text-sm text-gray-600 hover:underline" href="mailto:help@Roc8.com"> 
                  help@Roc8.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center gap-10 p-4">
            <img className="w-full md:w-1/2 rounded-xl shadow-lg" src={Aboutusimg} alt="Contact" /> 
            <div className="w-full md:w-1/2 bg-white/90 p-6 rounded-xl shadow-lg"> 
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-800">Name *</label> 
                  <input
                    type="text"
                    className={`w-full p-3 rounded-lg bg-gray-100 text-gray-800 outline-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 transition duration-200`} 
                    placeholder="Apsit Jain"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-800">Email *</label> 
                  <input
                    type="email"
                    className={`w-full p-3 rounded-lg bg-gray-100 text-gray-800 outline-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 transition duration-200`} 
                    placeholder="example@gmail.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-800">Phone Number *</label>
                  <input
                    type="text" 
                    className={`w-full p-3 rounded-lg bg-gray-100 text-gray-800 outline-none border ${errors.number ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 transition duration-200`} 
                    placeholder="Phone Number"
                    name="number"
                    value={data.number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-800">Message *</label> 
                  <textarea
                    className={`w-full p-3 rounded-lg bg-gray-100 text-gray-800 outline-none border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 transition duration-200`}
                    placeholder="Start typing..."
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Send Message"
                    className="w-full bg-gray-800 text-white font-bold py-3 rounded-full hover:bg-gray-700 transition-all cursor-pointer shadow-lg" 
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      <Footer /> 
    </>
  );
};

export default Contact;