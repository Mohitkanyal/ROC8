import React, { useState } from "react";

const skillsList = [
  "Python", "Java", "C++", "SQL", "R", "HTML", "CSS", "JavaScript",
  "Node.js", "React", "Angular", "Django", "Flask", "TensorFlow",
  "PyTorch", "Keras", "Pandas", "NumPy", "Matplotlib", "Scikit-learn",
  "Machine Learning", "Deep Learning", "AWS", "Azure", "GCP", "Docker",
  "Kubernetes", "Linux", "Git", "Tableau", "Power BI"
];

const fieldList = [
  "Data Science", "Software Engineering", "Cybersecurity",
  "Cloud Computing", "DevOps", "Web Development", "AI/ML",
  "Business Intelligence", "Game Development", "IoT", "AR/VR"
];

const coursesData = [
  
    {
      "recommended_course": "Machine Learning A-Z",
      "platform": "Coursera",
      "course_link": "https://www.coursera.org/learn/machine-learning",
      "key_metrics_original": {
        "rating": 3.66,
        "enrollments": 196293
      }
    },
    {
      "recommended_course": "Machine Learning A-Z",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/playlist?list=PLulEtxNA34XSEZ0gC3g1Zhsa3JvNBzWFT",
      "key_metrics_original": {
        "likes": 70330,
        "views": 101928
      }
    },
    {
      "recommended_course": "Deep Learning Specialization",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/paths/introduction-to-deep-learning",
      "key_metrics_original": {
        "rating": 4.41,
        "enrollments": 87965
      }
    },
    {
      "recommended_course": "Deep Learning Specialization",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/playlist?list=PLkDaE6sCnH0m6SuQ1iLpG31QszJTh-rWi",
      "key_metrics_original": {
        "likes": 69864,
        "views": 613080
      }
    },
    {
      "recommended_course": "Deep Learning Specialization",
      "platform": "Coursera",
      "course_link": "https://www.coursera.org/specializations/deep-learning",
      "key_metrics_original": {
        "rating": 4.99,
        "enrollments": 97760
      }
    },
    {
      "recommended_course": "React for Beginners",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/courses/react-what-is",
      "key_metrics_original": {
        "rating": 4.28,
        "enrollments": 170637
      }
    },
    {
      "recommended_course": "React for Beginners",
      "platform": "edX",
      "course_link": "https://www.edx.org/learn/reactjs",
      "key_metrics_original": {
        "rating": 4.25,
        "enrollments": 52161
      }
    },
    {
      "recommended_course": "Full Stack Web Development",
      "platform": "Coursera",
      "course_link": "https://www.coursera.org/specializations/full-stack-react",
      "key_metrics_original": {
        "rating": 3.68,
        "enrollments": 126866
      }
    },
    {
      "recommended_course": "Full Stack Web Development",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/playlist?list=PL4cUxeGZceqThB_YjCCwJiknCpJEqqPmF",
      "key_metrics_original": {
        "likes": 16456,
        "views": 783291
      }
    },
    {
      "recommended_course": "Full Stack Web Development",
      "platform": "Udemy",
      "course_link": "https://www.udemy.com/course/the-web-developer-bootcamp/",
      "key_metrics_original": {
        "rating": 4.77,
        "enrollments": 166299
      }
    },
    {
      "recommended_course": "Full Stack Web Development",
      "platform": "edX",
      "course_link": "https://www.edx.org/certificates/professional-certificate/hkustx-full-stack-web-development-with-react",
      "key_metrics_original": {
        "rating": 5.0,
        "enrollments": 113538
      }
    },
    {
      "recommended_course": "Cloud Architecture with AWS",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/watch?v=73sP5PTkC6o",
      "key_metrics_original": {
        "likes": 84558,
        "views": 232652
      }
    },
    {
      "recommended_course": "Cloud Architecture with AWS",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/paths/aws-certified-solutions-architect-associate-saa-c03",
      "key_metrics_original": {
        "rating": 3.52,
        "enrollments": 57740
      }
    },
    {
      "recommended_course": "Cybersecurity Fundamentals",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/watch?v=bW7ay8W0yrk",
      "key_metrics_original": {
        "likes": 67412,
        "views": 586710
      }
    },
    {
      "recommended_course": "Cybersecurity Fundamentals",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/courses/cyber-security-essentials",
      "key_metrics_original": {
        "rating": 3.99,
        "enrollments": 6607
      }
    },
    {
      "recommended_course": "Cybersecurity Fundamentals",
      "platform": "Udemy",
      "course_link": "https://www.udemy.com/course/fundamentals-of-cybersecurity-a-practical-approach/",
      "key_metrics_original": {
        "rating": 3.67,
        "enrollments": 92368
      }
    },
    {
      "recommended_course": "Cybersecurity Fundamentals",
      "platform": "Coursera",
      "course_link": "https://www.coursera.org/specializations/intro-cyber-security",
      "key_metrics_original": {
        "rating": 4.01,
        "enrollments": 194896
      }
    },
    {
      "recommended_course": "Python for Data Science",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/paths/data-science-with-python",
      "key_metrics_original": {
        "rating": 4.0,
        "enrollments": 93588
      }
    },
    {
      "recommended_course": "Python for Data Science",
      "platform": "Udemy",
      "course_link": "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
      "key_metrics_original": {
        "rating": 4.88,
        "enrollments": 130595
      }
    },
    {
      "recommended_course": "Python for Data Science",
      "platform": "edX",
      "course_link": "https://www.edx.org/certificates/professional-certificate/harvardx-python-for-data-science-and-machine-learning",
      "key_metrics_original": {
        "rating": 4.87,
        "enrollments": 14321
      }
    },
    {
      "recommended_course": "Python for Data Science",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/playlist?list=PL5Xcy6dOVLWonDwZaF9KDK9ok6Y2WVDiI",
      "key_metrics_original": {
        "likes": 18793,
        "views": 514884
      }
    },
    {
      "recommended_course": "SQL Mastery",
      "platform": "edX",
      "course_link": "https://www.edx.org/learn/sql/stanford-university-databases-advanced-topics-in-sql",
      "key_metrics_original": {
        "rating": 4.19,
        "enrollments": 113515
      }
    },
    {
      "recommended_course": "SQL Mastery",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      "key_metrics_original": {
        "likes": 8342,
        "views": 885671
      }
    },
    {
      "recommended_course": "DevOps Engineering",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/watch?v=hW6hJ0zFw-0",
      "key_metrics_original": {
        "likes": 76680,
        "views": 728791
      }
    },
    {
      "recommended_course": "DevOps Engineering",
      "platform": "Pluralsight",
      "course_link": "https://www.pluralsight.com/paths/devops-foundations",
      "key_metrics_original": {
        "rating": 4.0,
        "enrollments": 97692
      }
    },
    {
      "recommended_course": "DevOps Engineering",
      "platform": "edX",
      "course_link": "https://www.edx.org/certificates/professional-certificate/linuxfoundationx-introduction-to-devops-practices-and-tools",
      "key_metrics_original": {
        "rating": 3.6,
        "enrollments": 44139
      }
    },
    {
      "recommended_course": "DevOps Engineering",
      "platform": "Udemy",
      "course_link": "https://www.udemy.com/course/learn-devops-the-complete-kubernetes-course/",
      "key_metrics_original": {
        "rating": 3.92,
        "enrollments": 13171
      }
    },
    {
      "recommended_course": "AI for Everyone",
      "platform": "edX",
      "course_link": "https://www.edx.org/learn/artificial-intelligence/ibm-ai-for-everyone-master-the-basics",
      "key_metrics_original": {
        "rating": 4.41,
        "enrollments": 54120
      }
    },
    {
      "recommended_course": "AI for Everyone",
      "platform": "Coursera",
      "course_link": "https://www.coursera.org/learn/ai-for-everyone",
      "key_metrics_original": {
        "rating": 4.39,
        "enrollments": 85814
      }
    },
    {
      "recommended_course": "AI for Everyone",
      "platform": "YouTube",
      "course_link": "https://www.youtube.com/watch?v=In09x7RYcWI",
      "key_metrics_original": {
        "likes": 42222,
        "views": 754321
      }
    }
  ];

  const CourseRecommendation = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
      skills: [],
      field: "",
      years_of_experience: 0,
      preferred_platform: "",
    });
    const [recommendedCourse, setRecommendedCourse] = useState(null);
    const [similarCourses, setSimilarCourses] = useState([]);
  
    const toggleSkill = (skill) => {
      setFormData((prev) => {
        const hasSkill = prev.skills.includes(skill);
        return {
          ...prev,
          skills: hasSkill ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
        };
      });
    };
  
    const selectField = (field) => {
      setFormData((prev) => ({ ...prev, field }));
    };
  
    const selectPlatform = (platform) => {
      if (!recommendedCourse) {
        setFormData((prev) => ({ ...prev, preferred_platform: platform }));
        return;
      }
      const altCourse = coursesData.find(
        (c) =>
          c.recommended_course.toLowerCase() === recommendedCourse.recommended_course.toLowerCase() &&
          c.platform.toLowerCase() === platform.toLowerCase()
      );
      if (altCourse) {
        setRecommendedCourse(altCourse);
        setFormData((prev) => ({ ...prev, preferred_platform: platform }));
        const similars = coursesData.filter(
          (c) =>
            c.recommended_course.toLowerCase() === altCourse.recommended_course.toLowerCase() &&
            c.platform.toLowerCase() !== altCourse.platform.toLowerCase()
        );
        setSimilarCourses(similars);
      }
    };
  
    const getRecommendation = () => {
      const { skills, field, years_of_experience } = formData;
      const exp = Number(years_of_experience) || 0;
      const scoredCourses = coursesData.map((course) => {
        let score = 0;
        let skillMatches = 0;
        skills.forEach((skill) => {
          if (course.recommended_course.toLowerCase().includes(skill.toLowerCase())) {
            skillMatches++;
          }
        });
        score += skillMatches * 10;
        if (field && course.recommended_course.toLowerCase().includes(field.toLowerCase())) {
          score += 15;
        }
        if (exp >= 3 && course.key_metrics_original?.rating >= 4.5) {
          score += 5;
        } else if (exp < 3 && course.key_metrics_original?.rating < 4.5) {
          score += 3;
        }
        score += (course.key_metrics_original?.rating || 0) * 5;
        score += course.key_metrics_original?.enrollments ? Math.min(course.key_metrics_original.enrollments / 20000, 5) : 0;
        return { ...course, score, skillMatches };
      });
      scoredCourses.sort((a, b) => b.score - a.score);
      const best = scoredCourses[0] || null;
      setRecommendedCourse(best);
      if (best) {
        const similars = coursesData.filter(
          (c) =>
            c.recommended_course.toLowerCase() === best.recommended_course.toLowerCase() &&
            c.platform.toLowerCase() !== best.platform.toLowerCase()
        );
        setSimilarCourses(similars);
        setFormData((prev) => ({ ...prev, preferred_platform: best.platform }));
      } else {
        setSimilarCourses([]);
      }
      setStep(3);
    };
  
    const canGoNext = () => {
      if (step === 0) return formData.skills.length > 0;
      if (step === 1) return formData.field !== "";
      if (step === 2) return formData.years_of_experience >= 0;
      return true;
    };
  
    const goToHome = () => {
      // Navigate to the home page (use a router or history if needed)
      window.location.href = "/"; // Or use a router link if using React Router
    };
  
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900 py-16 mt-8">
        <div className="container mx-auto px-6 flex justify-center items-start">
          <div className="max-w-3xl w-full bg-white/90 rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Personalized Course Recommendation
            </h1>
  
            {step === 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Select your skills:
                </h2>
                <div className="flex flex-wrap gap-3 max-h-44 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full border transition ${
                        formData.skills.includes(skill)
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </section>
            )}
  
            {step === 1 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Select your field:
                </h2>
                <div className="flex flex-wrap gap-3 max-h-36 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                  {fieldList.map((field) => (
                    <button
                      key={field}
                      onClick={() => selectField(field)}
                      className={`px-4 py-2 rounded-full border transition ${
                        formData.field === field
                          ? "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </section>
            )}
  
            {step === 2 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  How many years of experience do you have?
                </h2>
                <input
                  type="number"
                  min="0"
                  value={formData.years_of_experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      years_of_experience: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </section>
            )}
  
            {step === 3 && recommendedCourse && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Recommended Course:
                </h2>
                <div className="p-6 rounded-2xl bg-gray-100 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {recommendedCourse.recommended_course}
                  </h3>
                  <div className="flex flex-col gap-2 text-gray-700 mb-5">
                    <p>
                      <strong>Platform:</strong> {recommendedCourse.platform}
                    </p>
                    {recommendedCourse.key_metrics_original?.rating && (
                      <p>
                        <strong>Rating:</strong>{" "}
                        {recommendedCourse.key_metrics_original.rating.toFixed(2)}{" "}
                        ⭐
                      </p>
                    )}
                    {recommendedCourse.key_metrics_original?.enrollments && (
                      <p>
                        <strong>Enrollments:</strong>{" "}
                        {recommendedCourse.key_metrics_original.enrollments.toLocaleString()}
                      </p>
                    )}
                    {recommendedCourse.key_metrics_original?.likes && (
                      <p>
                        <strong>Likes:</strong>{" "}
                        {recommendedCourse.key_metrics_original.likes.toLocaleString()}
                      </p>
                    )}
                    {recommendedCourse.key_metrics_original?.views && (
                      <p>
                        <strong>Views:</strong>{" "}
                        {recommendedCourse.key_metrics_original.views.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <a
                    href={recommendedCourse.course_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all font-semibold"
                  >
                    Go to Course
                  </a>
                </div>
  
                {similarCourses.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Available on Other Platforms:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {similarCourses.map((course) => (
                        <button
                          key={course.platform}
                          onClick={() => selectPlatform(course.platform)}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
                        >
                          {course.platform}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
  
            <div className="mt-8 flex justify-between items-center">
              {step > 0 && step < 3 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-all font-semibold"
                >
                  Back
                </button>
              )}
  
              {step === 3 ? (
                <button
                  onClick={goToHome}
                  className="ml-auto bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all font-semibold"
                >
                  Back to Home
                </button>
              ) : (
                <button
                  disabled={!canGoNext()}
                  onClick={() => (step === 2 ? getRecommendation() : setStep(step + 1))}
                  className={`px-8 py-3 rounded-full text-white font-bold transition-all ${
                    canGoNext()
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {step === 2 ? "Get Recommendation" : "Next"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseRecommendation;
