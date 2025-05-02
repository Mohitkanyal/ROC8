import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SummaryApi from "../common";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.CourseDetails.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();
      console.log("API Response:", dataResponse);

      if (Array.isArray(dataResponse.data)) {
        setCourses(dataResponse.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-16 text-gray-900">
          Explore Courses to Upgrade Your Skills
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading Courses...</div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white/90 text-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-transform hover:scale-[1.02]" // Adjusted hover effect slightly
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {course.name}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Platform:</strong> {course.platform}
                </p>
                {course.description && (
                  <p className="text-gray-600 mb-4 text-sm">
                    {course.description}
                  </p>
                )}
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all font-semibold text-sm flex items-center gap-2 w-max" // Matched button style from CareerInsights
                >
                  Study Now <FaExternalLinkAlt size={14} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">No courses available at the moment.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Course;