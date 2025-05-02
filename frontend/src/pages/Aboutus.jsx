import React from "react";
import Footer from '../components/Footer';
import img1 from '../asset/Images/mission.jpg';
import img2 from '../asset/Images/abu2.jpg';
import img3 from '../asset/Images/abu3.jpg';
import img4 from '../asset/Images/abu4.jpg';
import img5 from '../asset/Images/vision.jpg';

const sections = [
  {
    title: "Our Mission",
    text: "Empower individuals with data-driven career decisions by providing personalized job trends and salary insights. We aim to remove guesswork and bring transparency to job markets through intelligent technology that understands user potential and market demands.",
    img: img1,
  },
  {
    title: "Who We Are",
    text: "We're a team of passionate developers, data scientists, and career mentors working to create a smarter path to career success. Our diverse background in HR tech, software development, and analytics helps us build user-centric tools with real-world value.",
    img: img2,
  },
  {
    title: "What We Offer",
    text: "From real-time salary prediction to personalized career growth plans, we offer a variety of features tailored to both freshers and experienced professionals. Our recommendation engine adapts as you grow, suggesting new skills and roles for your evolving goals.",
    img: img3,
  },
  {
    title: "Why Choose Us",
    text: "Our platform is not only powerful but easy to use. With advanced AI, secure data handling, and constant improvements based on user feedback, we ensure you stay ahead in your career journey. We’re committed to helping you grow with confidence.",
    img: img4,
  },
  {
    title: "Our Vision",
    text: "To build a world where everyone has access to smart career planning. We envision a global community empowered by insights, growth paths, and clarity—no matter the starting point. Join us as we redefine the future of work and opportunity.",
    img: img5,
  },
];

const Aboutus = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-white via-white to-white px-4 py-16 mt-10">
        <div className="mx-6 md:mx-16">
          <h2 className="text-4xl text-black font-bold text-center mb-16">About Us</h2>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-16 gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 p-4">
                <img
                  src={section.img}
                  alt={section.title}
                  className="w-full h-[350px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="md:w-1/2 p-4 text-black">
                <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                <p className="text-lg leading-relaxed">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
