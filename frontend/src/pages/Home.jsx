// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar';
// import { Link, NavLink } from 'react-router-dom'
// import Footer from '../components/Footer';
// import home1 from "../asset/Images/home3.jpg";
// import img1 from '../asset/Images/predictsalary.jpg';
// import img2 from '../asset/Images/career.jpg';
// import img3 from '../asset/Images/job1.jpg';
// import CountUp from 'react-countup';

// const Home = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [animate, setAnimate] = useState(true); 
//   const [countKey, setCountKey] = useState(0);
  
//   useEffect(() => {
//     const interval1 = setInterval(() => {
//       setAnimate(false);
//       setTimeout(() => setAnimate(true), 100);
//     }, 3000);
  
//     const interval2 = setInterval(() => {
//       setCountKey(prevKey => prevKey + 1);
//     }, 5000);

//     return () => {
//       clearInterval(interval1);
//       clearInterval(interval2);
//     };
//   }, []);
  
//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };
//   return (
//     <div className="font-sans text-gray-800 bg-gradient-to-tl from-purple-200 via-purple-100 to-purple-300 min-h-screen">
//         <div className="relative h-[725px] w-[1520px] bg-gradient-to-b from-deep-purple-600 to-purple-500 text-center py-20 text-white border-b border-gray-300">
//           <div 
//             className="absolute inset-0 bg-no-repeat bg-cover bg-center "
//             style={{
//               backgroundImage: `url(${home1})`,
//               opacity:"0.5",
//             }}
//           ></div>
//         </div>
//           <div className="z-50 transform -translate-y-[500px] text-center">
//           <h1 className={`text-7xl text-purple-500 mb-4 transition-transform duration-700 ${animate ? 'animate-train' : 'opacity-0'}`}>
//             Welcome to ROC8
//           </h1>
//           <div className="w-40 h-1 bg-purple-400 -mt-2 mx-auto"></div>
//           <h4 className='text-lg text-purple-400'>Boost your career by predicting salary and get more things.</h4>
//           <h4 className="text-lg text-purple-400">Use our AI-powered tool to predict your salary based on experience and skills.</h4>
//           </div>

//         <div className="container px-8">
//           <div className="grid grid-cols-1 gap-16">
//             <section className="bg-purple-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
//               <h2 className="text-3xl text-deep-purple-800 mb-4">About Us</h2>
//               <p className="text-gray-700 leading-relaxed">ROC8 is dedicated to helping individuals understand their worth in the job market. Our AI-powered tool analyzes various factors to provide accurate salary predictions and many more..</p>
//               <div className='bg-[#C7D2FE] rounded-2xl m-4 h-[350px]'>
//                 <div class="flex items-center gap-3 ml-8">
//                   <div class="w-5 h-5 bg-purple-300 rounded-full "></div>
//                   <div>
//                     <h4 class="text-lg mt-[30px]">We predicted over</h4>
//                     <h2 class="text-purple-700 text-2xl ">
//                         <span id="count1"><CountUp key={countKey} start={100} end={1200} duration={2}/></span>+ Peoples
//                     </h2>
//                     <p class="text-gray-400">We have successfully predicted the salary for 1200+ peoples.</p>
//                   </div>
//                 </div>
//                 <div class="flex items-center gap-3 ml-8">
//                     <div class="w-5 h-5 bg-purple-300 rounded-full"></div>
//                     <div>
//                         <h4 class="text-lg mt-2">We have </h4>
//                         <h2 class="text-purple-700 text-2xl">
//                           <span id="count2"><CountUp key={countKey} start={0} end={25} duration={2}/></span>+ In demand skills category
//                         </h2>
//                         <p class="text-gray-400">We have successfully found the 25+ in-demand skills.</p>
//                     </div>
//                 </div>
//                 <div class="flex items-center gap-3 ml-8">
//                     <div class="w-5 h-5 bg-purple-300 rounded-full"></div>
//                     <div>
//                         <h4 class="text-lg mt-2">We have support of</h4>
//                         <h2 class="text-purple-700 text-2xl">
//                           <span id="count3"><CountUp key={countKey} start={10} end={100} duration={2}/></span>+ Companies
//                         </h2>
//                         <p class="text-gray-400 mb-4">We have a huge number of supporters willing to help you.</p>
//                     </div>
//                 </div>
//               </div>
//               <div className="mr-4 flex justify-end">
//                 <NavLink to='/Aboutus' className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
//                   Know More
//                 </NavLink>
//               </div>
//             </section>

//             <section className="bg-purple-100 p-8 h-[500px] rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
//               <h2 className="text-3xl text-deep-purple-800 mb-4">How It Works</h2>
//               <div className="mt-8 flex justify-between">
//                 <div className="bg-[#C7D2FE] p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
//                   <img src={img1} alt="img1" className="h-20 w-20 rounded-full" />
//                   <h3 className="text-xl text-deep-purple-600 mb-2">Predict Your Salary</h3>
//                   <p className="text-gray-600">Get an estimate of your expected salary based on your skills, experience, and job role</p>
//                 </div>
//                 <div className="bg-[#C7D2FE] ml-2 p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
//                   <img src={img2} alt="img2" className="h-20 w-20 rounded-full" />
//                   <h3 className="text-xl text-deep-purple-600 mb-2">Career Growth Insights</h3>
//                   <p className="text-gray-600">Discover the most in-demand skills and technologies to boost your career.</p>
//                 </div>
//                 <div className="bg-[#C7D2FE] ml-2 p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
//                   <img src={img3} alt="img3" className="h-20 w-20 rounded-full" />
//                   <h3 className="text-xl text-deep-purple-600 mb-2">Job Trends</h3>
//                   <p className="text-gray-600">Stay updated with the latest job market trends and hiring demands in your industry.</p>
//                 </div>
//               </div>
//             </section>

//             <section className="bg-purple-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
//               <h2 className="text-3xl text-deep-purple-800 mb-4">What Our Users Say</h2>
//               <blockquote className="text-gray-700 italic">"This tool helped me negotiate my salary effectively!" - Jane D.</blockquote>
//               <blockquote className="text-gray-700 italic mt-4">"I was amazed at how accurate the predictions were!" - John S.</blockquote>
//             </section>

//             <section className="bg-purple-100 p-8 rounded-xl shadow-xl">
//               <h2 className="text-3xl text-deep-purple-800 mb-4">Frequently Asked Questions</h2>
//               <div className="mb-4">
//                 <h3
//                   onClick={() => toggleFAQ(0)}
//                   className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
//                 >
//                   Is my data safe?
//                   <span className="text-purple-600">{activeIndex === 0 ? '-' : '+'}</span>
//                 </h3>
//                 {activeIndex === 0 && (
//                   <p className="text-gray-600 mt-2 ml-2"> Your privacy is our priority. We do not store personal data.</p>
//                 )}
//               </div>
//               <div className='mb-4'>
//                 <h3
//                   onClick={() => toggleFAQ(1)}
//                   className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
//                 >
//                   How accurate are the predictions?
//                   <span className="text-purple-600">{activeIndex === 1 ? '-' : '+'}</span>
//                 </h3>
//                 {activeIndex === 1 && (
//                   <p className="text-gray-600 mt-2 ml-2"> Our predictions are based on extensive industry data and trends.</p>
//                 )}
//               </div>
//               <div className='mb-4'>
//                 <h3
//                   onClick={() => toggleFAQ(2)}
//                   className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
//                 >
//                   How can ROC8 help me grow my career?
//                   <span className="text-purple-600">{activeIndex === 2 ? '-' : '+'}</span>
//                 </h3>
//                 {activeIndex === 2 && (
//                   <p className="text-gray-600 mt-2 ml-2"> We provide insights into in-demand skills, industry trends, and personalized career recommendations.</p>
//                 )}
//               </div>
//               <div className='mb-4'>
//                 <h3
//                   onClick={() => toggleFAQ(3)}
//                   className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
//                 >
//                   What skills should I learn to increase my salary?
//                   <span className="text-purple-600">{activeIndex === 3 ? '-' : '+'}</span>
//                 </h3>
//                 {activeIndex === 3 && (
//                   <p className="text-gray-600 mt-2 ml-2"> Our platform suggests high-paying skills based on your current experience and career goals.</p>
//                 )}
//               </div>
//               <div className='mb-4'>
//                 <h3
//                   onClick={() => toggleFAQ(4)}
//                   className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
//                 >
//                   Can I see which industries are hiring the most?
//                   <span className="text-purple-600">{activeIndex === 4 ? '-' : '+'}</span>
//                 </h3>
//                 {activeIndex === 4 && (
//                   <p className="text-gray-600 mt-2 ml-2"> Yes, we provide insights into high-growth industries and the skills they require.</p>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Call to Action Section */}
//           <section className="bg-deep-purple-600 text-white text-center py-12 rounded-xl mt-12">
//             <h2 className="text-4xl mb-6">Ready to Find Out Your Worth?</h2>
//             <Link to="/SalaryPredictor" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block">
//               Predict My Salary
//             </Link>
//           </section>
//         </div>

//         <Footer />
//         <style>
//         {`
//           @keyframes trainMove {
//             0% {
//               opacity: 0;
//               transform: translateX(-50px);
//             }
//             50% {
//               opacity: 1;
//               transform: translateX(0);
//             }
//             100% {
//               opacity: 0;
//               transform: translateX(50px);
//             }
//           }
//           .animate-train {
//             animation: trainMove 3s ease-in-out infinite;
//           }
//         `}
//       </style>
      

//     </div>
//   )
// }

// export default Home
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'; 
import { Link, NavLink, useParams } from 'react-router-dom'
import Footer from '../components/Footer'; 
import home1 from "../asset/Images/home6.webp";
import img1 from '../asset/Images/money.jpg';
import img2 from '../asset/Images/growth.jpg';
import img3 from '../asset/Images/trends-b.jpg';
import CountUp from 'react-countup';
import Banner from '../components/Banner.jsx'; 
import Banner1 from '../components/Banner1'; 
import Banner2 from '../components/Banner2';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [countKey, setCountKey] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const fetchFeedbackDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.feedbackDetails.url, {
      method: SummaryApi.feedbackDetails.method,
      headers: {
        "content-type": "application/json",
      },
      credentials: 'include'
    });
    setLoading(false);

    const dataResponse = await response.json();
    setData(dataResponse.data);
    if (Array.isArray(dataResponse.data)) {
      dataResponse.data.forEach(item => {
        if (item.creator && !creatorNames[item.creator]) {
          fetchUserData(item.creator);
        }
      });
    }
  };

  const [creatorNames, setCreatorNames] = useState({});
  const fetchUserData = async (userId) => {
    if (!userId || creatorNames[userId]) return;

    try {
      const response = await fetch(SummaryApi.feedbackuser.url, {
        method: SummaryApi.feedbackuser.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const dataResponse = await response.json();
      console.log("Fetched name for", userId, ":", dataResponse.data);

      setCreatorNames(prev => ({
        ...prev,
        [userId]: dataResponse.data?.name || 'Anonymous', 
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setCreatorNames(prev => ({
        ...prev,
        [userId]: 'Anonymous',
      }));
    }
  };


  useEffect(() => {
    fetchFeedbackDetails();
    const interval1 = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 3000);
    const interval2 = setInterval(() => {
      setCountKey(prevKey => prevKey + 1);
    }, 5000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">

      <div className="relative h-[725px] w-full flex flex-col justify-center items-center text-center text-white overflow-hidden rounded-b-3xl shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${home1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-gray-600/40"></div>
        </div>

        <div className="relative z-10 px-6">
          <h1 className={`text-6xl font-extrabold text-white drop-shadow-md mb-6 transition-all duration-700 ${animate ? 'animate-fade-in-down' : 'opacity-0'}`}>
            Welcome to <span className="text-gray-300">ROC8</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm mb-8">
            Unlock your potential with our <span className="text-gray-400 font-semibold"> career tools</span>
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <NavLink
              to="/Services"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg" 
            >
              Explore Services
            </NavLink>
            <NavLink
              to="/Contact"
              className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all" 
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </div>



      <main className="container mx-auto px-6 py-12 space-y-16">
        <section className="bg-white/90 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-[1.01]"> 
          <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2> 
          <p className="text-lg leading-relaxed mb-8 text-gray-700"> 
            ROC8 helps you discover your worth in today’s job market. Get personalized salary predictions and career guidance using our cutting-edge AI tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Predictions Made" 
              count={<CountUp key={countKey} start={100} end={1200} duration={2} />}
              label="1200+ People"
              className="transition-transform transform hover:scale-105 hover:shadow-lg" 
            />
            <StatCard
              title="Skills Identified" 
              count={<CountUp key={countKey} start={0} end={25} duration={2} />}
              label="25+ In-Demand Skills"
              className="transition-transform transform hover:scale-105 hover:shadow-lg" 
            />
            <StatCard
              title="Companies Supported" 
              count={<CountUp key={countKey} start={10} end={100} duration={2} />}
              label="100+ Partners"
              className="transition-transform transform hover:scale-105 hover:shadow-lg" 
            />
          </div>

          <div className="mt-8 text-right">
            <NavLink
              to="/Aboutus"
              className="inline-block bg-gray-800 text-white hover:bg-gray-700 font-bold py-3 px-8 rounded-full transition-all shadow-lg" 
            >
              Know More
            </NavLink>
          </div>
        </section>



        <Banner />
        <section className="bg-white/90 p-8 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">How It Works</h2> 
          <p className="text-center text-gray-700 mb-10 text-lg">Smarter career decisions in just 3 easy steps.</p> 

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <HowItWorksCard
              img={img1}
              title="Predict Your Salary"
              desc="Leverage AI to estimate your future salary based on your profile."
            />

            <HowItWorksCard
              img={img2}
              title="Career Growth Insights"
              desc="Get actionable insights to advance your career faster and smarter."
            />

            <HowItWorksCard
              img={img3}
              title="Job Trends"
              desc="Keep up with real-time hiring demands and trending job roles."
            />

          </div>
        </section>


        <section className="bg-white/90 p-10 rounded-2xl shadow-lg"> 
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">What Our Users Say</h2> 
          {Array.isArray(data) && data.length > 0 ? (
            data.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 text-gray-800 p-6 rounded-xl mb-6 shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-lg" 
              >
                <p className="italic text-lg mb-3 text-gray-700">“{item?.feedback}”</p> 
                <div className="flex justify-between text-sm text-gray-600"> 
                  <span>– {creatorNames[item?.creator] || 'Anonymous'}</span>
                  <span>{item?.submittedAt ? formatDate(item.submittedAt) : 'Date N/A'}</span> 
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 italic text-center">No feedback available yet.</p> 
          )}
        </section>

        <Banner1 />

        <section className="bg-white/90 p-10 rounded-2xl shadow-lg"> 
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2> 
          {[
            "Is my data safe?",
            "How accurate are the predictions?",
            "How can ROC8 help my career?",
            "What skills should I learn?",
            "Can I see hiring trends?"
          ].map((question, i) => (
            <div key={i} className="mb-4">
              <h3
                onClick={() => toggleFAQ(i)}
                className="cursor-pointer text-lg font-semibold p-4 bg-gray-100 rounded-lg hover:bg-gray-200 flex justify-between items-center transition-all text-gray-800 shadow-sm" 
              >
                {question}
                <span className="text-gray-600 text-xl">{activeIndex === i ? '−' : '+'}</span> 
              </h3>
              {activeIndex === i && (
                <p className="text-gray-700 mt-2 ml-2 pl-2 border-l-4 border-gray-300"> 
                  {[
                    "Your privacy is our priority. We do not store personal data.",
                    "Our predictions are based on real industry data and AI modeling.",
                    "We suggest in-demand skills and offer career insights.",
                    "Our AI highlights high-paying skills to focus on.",
                    "Yes! We display growth in hiring by industry."
                  ][i]}
                </p>
              )}
            </div>
          ))}
        </section>

        <Banner2 />
      </main>

      <Footer /> 

    </div>
  );
};

const StatCard = ({ title, count, label }) => (
  <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md hover:shadow-lg"> 
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4> 
    <div className="text-3xl font-bold text-gray-900">{count}</div> 
    <p className="text-gray-700 mt-2">{label}</p> 
  </div>
);

const HowItWorksCard = ({ img, title, desc }) => (
  <div className="bg-gray-100 p-6 rounded-2xl text-center shadow-md transform transition duration-500 hover:scale-105 hover:shadow-lg">
    <img src={img} alt={title} className="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-gray-300" /> 
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3> 
    <p className="text-gray-700 text-sm">{desc}</p> 
  </div>
);


export default Home;