import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer'; 
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false); 
  const userId = user?._id;
  const [data, setData] = useState({
    feedback: '',
    creator: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.feedback.trim()) {
        toast.error("Feedback message cannot be empty.");
        return;
    }
    if (!userId) {
         toast.error("You must be logged in to submit feedback.");
         // Optionally redirect to login
         // navigate('/login');
         return;
    }


    const dataResponse = await fetch(SummaryApi.feedback.url, {
      method: SummaryApi.feedback.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...data, creator: userId }) 
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      setShowFeedback(false);
      setData({ feedback: '', creator: userId }); 
      fetchAllFeedback();
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const [allFeedback, setAllFeedback] = useState([]); 
  const [feedbackLoading, setFeedbackLoading] = useState(false);


  const fetchAllFeedback = async () => {
    if (!user?._id) {
        setAllFeedback([]);
        return;
    }
    setFeedbackLoading(true);
    try {
      const response1 = await fetch(SummaryApi.userfeedback.url, {
        method: SummaryApi.userfeedback.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id
        })
      });
      const dataResponse1 = await response1.json();
      setAllFeedback(Array.isArray(dataResponse1?.data) ? dataResponse1?.data : []); 
    } catch (error) {
        console.error("Error fetching user feedback:", error);
        setAllFeedback([]); 
        toast.error("Failed to fetch your feedback.");
    } finally {
       setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, [user?._id]); 

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans"> 
      <div className="container mx-auto w-full px-6 md:px-28 pt-20">
        <h1 className="text-3xl font-semibold pb-4 mt-12 text-gray-900">Profile</h1> 

        <div className="mb-10 p-6 bg-white/90 rounded-xl shadow-lg"> 
          <h1 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-800">User</h1>
          <div className="text-lg pt-4 max-w-4xl text-gray-700"> 
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex gap-2">
                <span className="font-medium w-40 text-gray-800">Email:</span> 
                <span>{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-40 text-gray-800">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-medium w-40 text-gray-800">Password:</span> 
                <div className="flex items-center gap-6">
                  <span className="flex gap-1 text-gray-500"> 
                    {[...Array(7)].map((_, index) => (
                      <FaStarOfLife key={index} size={10} />
                    ))}
                  </span>
                  <Link
                    to="/forgotPassword"
                    className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 font-bold py-2 px-6 rounded-full transition-all text-sm shadow-md" 
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 p-6 bg-white/90 rounded-xl shadow-lg"> 
          <h1 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-800">Give Feedback</h1>
          <div className="pt-4 max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feedback:</h2>
            {feedbackLoading ? (
               <div className="text-gray-600 italic mb-6">Loading feedback...</div>
            ) : allFeedback.length > 0 ? (
              <div className="space-y-4 mb-6">
                {allFeedback.map((item, index) => (
                  <div
                    key={item._id || index} 
                    className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 text-gray-800" 
                  >
                    <p className="text-base">{item?.feedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 italic mb-6"> 
                No feedbacks are given yet.
              </div>
            )}
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all font-semibold shadow-lg mb-4" 
            >
              {showFeedback ? 'Close Feedback' : 'Give Feedback'}
            </button>

            {showFeedback && (
              <div className="bg-white p-4 rounded-lg shadow-md"> 
                <textarea
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800" 
                  placeholder="Enter your feedback here..."
                  name='feedback'
                  value={data.feedback}
                  onChange={handleChange}
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all font-semibold shadow-lg"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Profile;