import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import skills from "../utils/skills";

const CareerInsights = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">

  {/* HERO SECTION */}
  <div className="flex justify-center px-4">
    <div className="w-full max-w-5xl mt-24 bg-white/90 text-center py-20 rounded-2xl shadow-2xl backdrop-blur-md">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Career Growth Insights</h1>
      <p className="text-xl font-medium mb-8 text-gray-700">Stay ahead in your career with top skills.</p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/CourseRecommendation" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg">
          Get Recommendation
        </Link>
        <Link to="/Course" className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full border hover:bg-gray-100 transition-all">
          Explore Courses
        </Link>
      </div>
    </div>
  </div>

  {/* SKILLS SECTION */}
  <div className="container mx-auto py-16 px-6">
    <section className="p-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">In-Demand Skills</h2>
      <p className="text-gray-600 mb-10">Industries evolve fast. Stay relevant by learning the right skills.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.slice(0, showAllSkills ? skills.length : 6).map((skill, index) => (
          <div key={index} className="bg-white/90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{skill.name}</h3>
            <p className="text-sm text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={() => setShowAllSkills(!showAllSkills)} className="flex items-center gap-2 bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-all">
          {showAllSkills ? "Show Less" : "Show More"}
          {showAllSkills ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </button>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="mt-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
      {[
        "Why should I learn new skills?",
        "Which skills are most in demand?",
        "How do I choose which course to take?"
      ].map((question, index) => (
        <div key={index} className="mb-6">
          <h3
            onClick={() => toggleFAQ(index)}
            className="cursor-pointer text-lg font-semibold p-4 bg-white/90 rounded-lg shadow-md hover:shadow-lg flex justify-between items-center transition-all text-gray-800"
          >
            {question}
            <span>{activeIndex === index ? '-' : '+'}</span>
          </h3>
          {activeIndex === index && (
            <p className="text-gray-700 mt-2 pl-4 border-l-4 border-gray-300">{[
              "Learning new skills ensures career growth and better salary opportunities.",
              "Tech, AI, Data Analysis, Cloud Computing, and Project Management are hot skills.",
              "Pick a course based on your career goals, interest, and industry demands."
            ][index]}</p>
          )}
        </div>
      ))}
    </section>
  </div>

  <Footer />
</div>

  );
};

export default CareerInsights;
