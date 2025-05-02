import React, { useState } from 'react';
import Select from 'react-select';
import Confetti from 'react-confetti';
import SummaryApi from '../common'; 
import { useWindowSize } from 'react-use'; 
import Footer from "../components/Footer"; 
import Banner2 from "../components/Banner2"; 

const skillOptions = [
  { value: 'Python', label: 'Python' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Java', label: 'Java' },
  { value: 'SQL', label: 'SQL' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Django', label: 'Django' },
  { value: 'C++', label: 'C++' },
  { value: 'CSS', label: 'CSS' },
];

const SalaryPredictor = () => {
  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    location: '',
    job_title: '',
    skills: [], 
  });

  const [predictedSalary, setPredictedSalary] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData((prevData) => ({ ...prevData, skills: selectedOptions || [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsString = (formData.skills || []).map(skill => skill.value).join(', ');
    const submissionData = {
      ...formData,
      skills: skillsString, 
    };

    console.log("Submitting data:", submissionData); 

    try {
      const response = await fetch(SummaryApi.salaryDetails.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      setPredictedSalary(null);

      if (response.ok) {
        const result = await response.json();
        if (result && result.predicted_salary !== undefined) {
          setPredictedSalary(result.predicted_salary);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 8000); 
        } else {
          console.error('Predicted salary not found in response:', result);
          setPredictedSalary('Error: Invalid response format'); 
        }
      } else {
        const errorText = await response.text(); 
        console.error(`Failed to predict salary. Status: ${response.status}. Details: ${errorText}`);
        setPredictedSalary(`Error: ${response.statusText || 'Prediction failed'}`); 
      }
    } catch (error) {
      console.error('Error predicting salary:', error);
      setPredictedSalary('Error: Could not connect to server'); 
    }
  };

  const jobTitles = ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Full Stack Developer', 'Marketing Manager', 'Frontend Developer'];
  const locations = ['Pune', 'Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'];
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen bg-white py-10 px-4 font-sans text-gray-900"> 
        {showConfetti && <Confetti width={width} height={height} recycle={false} />} 

        <div className="max-w-6xl mx-auto text-center mb-12 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Discover Your Earning Potential!</h1> 
          <p className="text-lg text-gray-700"> 
            Get an estimated salary prediction based on your experience, skills, and job details.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto mb-12 p-6 md:p-8 rounded-2xl shadow-lg transition-all duration-500 ease-in-out bg-white/90`} 
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                min="0" 
                value={formData.experience}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-gray-800" 
                required
              />

              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-gray-800" 
                required
              >
                <option value="">Select Education</option>
                 <option value="Bachelor">Bachelors</option>
                 <option value="Master">Masters</option>
                 <option value="PhD">PhD</option>
              </select>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-gray-800" 
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => ( 
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-gray-800" 
                required
              >
                <option value="">Select Job Title</option>
                {jobTitles.map((job) => ( 
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>

              <Select
                isMulti 
                name="skills"
                options={skillOptions} 
                className="basic-multi-select" 
                classNamePrefix="select" 
                placeholder="Select Skills..."
                value={formData.skills} 
                onChange={handleSkillsChange}
                styles={{ 
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? 'rgb(107 114 128)' : 'rgb(209 213 219)', 
                    borderRadius: '0.5rem', 
                    padding: '0.2rem', 
                    minHeight: '46px', 
                    boxShadow: state.isFocused ? '0 0 0 1px rgb(107 114 128)' : base.boxShadow, 
                    backgroundColor: 'white',
                    color: 'rgb(55 65 81)', 
                  }),
                  input: (base) => ({ 
                    ...base,
                    color: 'inherit',
                  }),
                  placeholder: (base) => ({ 
                    ...base,
                    color: '#6b7280', 
                  }),
                  multiValue: (base) => ({ 
                    ...base,
                    backgroundColor: 'rgb(209 213 219)', 
                    borderRadius: '0.375rem', 
                  }),
                  multiValueLabel: (base) => ({ 
                    ...base,
                    color: 'rgb(55 65 81)', 
                    padding: '0.1rem 0.3rem',
                    fontSize: '0.875rem',
                  }),
                  multiValueRemove: (base) => ({ 
                    ...base,
                    color: 'rgb(55 65 81)', 
                    borderTopRightRadius: '0.375rem',
                    borderBottomRightRadius: '0.375rem',
                    ':hover': {
                      backgroundColor: 'rgb(156 163 175)', 
                      color: 'white',
                    },
                  }),
                  menu: (base) => ({ 
                    ...base,
                    zIndex: 10,
                  }),
                  option: (base, state) => ({ 
                    ...base,
                    backgroundColor: state.isFocused ? 'rgb(243 244 246)' : null, 
                    color: 'rgb(55 65 81)', 
                  }),
                }}
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg w-full md:w-auto" 
              >
                Predict Salary
              </button>
            </div>
          </form>
        </div>

        {predictedSalary !== null && ( 
          <div
            className="max-w-2xl mx-auto text-center p-6 rounded-xl bg-gray-100 border border-gray-300 shadow-md transition-all duration-500 ease-in-out animate-fade-in" 
          >
            <h3 className="text-xl font-semibold text-gray-800">Predicted Annual Salary Estimate:</h3> 
            
            {typeof predictedSalary === 'string' && predictedSalary.startsWith('Error:') ? (
              <p className="text-2xl font-bold text-red-600 mt-2">{predictedSalary}</p> 
            ) : (
              <p className="text-3xl font-bold text-green-700 mt-2"> 
                ₹
                {typeof predictedSalary === 'number' ? predictedSalary.toLocaleString('en-IN') : predictedSalary}
                <span className="text-base text-gray-600"> / annum</span> 
              </p>
            )}
          </div>
        )}


        
        <Banner2 /> 
        <section className="max-w-4xl mx-auto bg-white/90 p-6 md:p-8 rounded-2xl shadow-lg mt-12"> 
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Frequently Asked Questions</h2> 
          <div className="space-y-4">
            {[
              "How does the salary prediction model work?",
              "What factors most influence the prediction?",
              "Is the prediction 100% accurate?",
              "Can I get career suggestions too?"
            ].map((question, i) => (
              <div key={i} className="border border-gray-300 rounded-lg overflow-hidden"> 
                <h3
                  onClick={() => toggleFAQ(i)}
                  className="text-lg font-semibold p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer flex justify-between items-center text-gray-800" 
                >
                  {question}
                  <span className={`transform transition-transform duration-300 ${activeIndex === i ? 'rotate-180' : 'rotate-0'} text-gray-600`}> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </h3>
                {activeIndex === i && (
                  <div className="p-4 bg-white text-gray-700 transition-max-height duration-500 ease-in-out overflow-hidden max-h-screen"> 
                    <p>{[
                      "Our predictor uses machine learning algorithms trained on a diverse dataset of job postings and salary information. It analyzes factors like experience, education, location, job title, and skills to estimate a likely salary range.",
                      "Experience level, specific technical skills (especially in-demand ones), job title seniority, and geographic location (cost of living) are typically the most significant factors.",
                      "No, this is an estimate based on data patterns. Actual salaries can vary due to factors not captured by the model, such as specific company policies, individual negotiation, market fluctuations, and benefits packages.",
                      "Currently, this tool focuses on salary prediction. However, we are exploring features to provide career growth insights, including suggesting relevant skills to learn based on your profile in the future."
                    ][i]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Improve responsiveness of the form grid */
        @media (max-width: 768px) {
            .grid-cols-1.md\\:grid-cols-3, .grid-cols-1.md\\:grid-cols-2 {
                grid-template-columns: repeat(1, minmax(0, 1fr)); /* Stack elements on smaller screens */
            }
            .max-w-4xl {
                max-width: 100%; /* Allow form to take full width on mobile */
                padding-left: 1rem;
                padding-right: 1rem;
            }
            .text-4xl.md\\:text-5xl {
                font-size: 2.25rem; /* Adjust heading size for mobile */
            }
        }
        /* Custom styles for react-select to override some defaults if needed */
         .select__control {
            border-color: rgb(209 213 219) !important; /* Ensure border color matches */
            border-radius: 0.5rem !important; /* Ensure rounded corners match */
            min-height: 46px !important; /* Match height */
            box-shadow: none !important; /* Remove default box shadow */
            background-color: white !important;
         }
         .select__control--is-focused {
             border-color: rgb(107 114 128) !important; /* Focus border color */
             box-shadow: 0 0 0 1px rgb(107 114 128) !important; /* Focus ring */
         }
        .select__placeholder {
             color: #6b7280 !important; /* text-gray-500 */
        }
         .select__single-value {
             color: rgb(55 65 81) !important; /* text-gray-700 */
         }
         .select__multi-value {
             background-color: rgb(209 213 219) !important; /* bg-gray-300 */
             border-radius: 0.375rem !important; /* rounded-md */
         }
         .select__multi-value__label {
            color: rgb(55 65 81) !important; /* text-gray-700 */
            padding: 0.1rem 0.3rem !important;
            font-size: 0.875rem !important;
         }
         .select__multi-value__remove {
             color: rgb(55 65 81) !important; /* text-gray-700 */
         }
         .select__multi-value__remove:hover {
            background-color: rgb(156 163 175) !important; /* hover:bg-gray-400 */
            color: white !important;
         }
         .select__menu {
             z-index: 10 !important;
         }
         .select__option--is-focused {
             background-color: rgb(243 244 246) !important; /* hover:bg-gray-100 */
             color: rgb(55 65 81) !important; /* text-gray-700 */
         }
         .select__option--is-selected {
             background-color: rgb(229 231 235) !important; /* bg-gray-200 */
             color: rgb(17 24 39) !important; /* text-gray-900 */
         }

      `}</style>
    </>
  );
};

export default SalaryPredictor;