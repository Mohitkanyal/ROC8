import React from 'react';
import Footer from '../components/Footer';
import img1 from '../asset/Images/AI.jpg';
import img2 from '../asset/Images/meet.jpg';
import img3 from '../asset/Images/trends-s.jpg';
import { NavLink } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'AI-Powered Salary Prediction',
      description: 'Our advanced AI model predicts salaries based on experience, skills, and industry trends.',
      image: img1,
      to: '/SalaryPredictor',
    },
    {
      title: 'Career Growth Insights',
      description: 'We provide data-driven insights to help professionals make strategic career decisions.',
      image: img2,
      to: '/CareerInsights',
    },
    {
      title: 'Job Market Trends',
      description: 'Stay updated with salary trends and industry demand to make better career choices.',
      image: img3,
      to: '/JobTrends',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white overflow-x-hidden text-black ">
      <div className="max-w-screen mx-6 md:mx-12 py-20 px-4 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-16 mt-8">Our Services</h1>

        <div className="space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-10 w-full min-h-[350px] ${
                  isEven ? '' : 'md:flex-row-reverse'
                } hover:scale-[1.01] transition-transform`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full md:w-[50%] h-[350px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="w-full md:w-[50%] flex flex-col justify-center text-center md:text-left px-4 md:px-12">
                  <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>
                  <p className="text-lg leading-relaxed text-black">{service.description}</p>
                  {service.to && (
                    <NavLink
                      to={service.to}
                      className="mt-6 inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition w-fit mx-auto md:mx-0"
                    >
                      Explore
                    </NavLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
