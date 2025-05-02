import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../asset/Images/logo2.png';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white py-6 pl-6 pr-6">
      <div className="container mx-auto border-t border-gray-400 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left px-6">
        <div className="mb-6 md:mb-0 justify-between">
          <div className='flex'>
          <a href="/Home" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-16" />
          </a>
          <div className='text-4xl'>ROC8</div>
          </div>
          <div className="mt-3">
            <p className="text-lg">+91-9930089196</p>
            <p className="text-lg">help@ROC8.com</p>
            <p className="text-lg">APSIT, Kasarvadvali, Thane(W), India</p>
          </div>
        </div>
        <div className='space-y-20'>
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-7 md:mb-0">
          <NavLink className='text-2xl hover:text-gray-300 transition' to='/Home'>How it works</NavLink>
          <NavLink className='text-2xl hover:text-gray-300 transition' to='/Aboutus'>Why ROC8</NavLink>
          <NavLink className='text-2xl hover:text-gray-300 transition' to='/Home'>Common Questions</NavLink>
          <NavLink className='text-2xl hover:text-gray-300 transition' to='/Contact'>Help Center</NavLink>
          <NavLink className='text-2xl hover:text-gray-300 transition' to='/Blog'>Blog</NavLink>
        </div>
        <div className='flex text-center justify-end'>
          <h1 className='text-2xl font-medium mb-2 ml-10'>Connect with us</h1>
          <div className='flex justify-center space-x-4 ml-5'>
            <a href="#" className="hover:text-purple-400"><FaFacebook size={30} /></a>
            <a href="#" className="hover:text-purple-400"><FaInstagram size={30} /></a>
            <a href="#" className="hover:text-purple-400"><FaTwitter size={30} /></a>
            <a href="#" className="hover:text-purple-400"><FaYoutube size={30} /></a>
            <a href="#" className="hover:text-purple-400"><FaLinkedin size={30} /></a>
          </div>
        </div>
        </div>
      </div>
      <div className="flex justify-between border-t border-gray-400 mt-6 pt-4 text-center">
        <p className="text-sm pl-5">&copy; 2024. All rights reserved</p>
        <p className="text-sm">Designed and developed by <a href="#" target="_blank" className="text-gray-400 hover:text-gray-300 pr-4">APSIT Students</a></p>
      </div>
    </footer>
  );
};

export default Footer;