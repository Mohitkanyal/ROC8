import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';

const AllFeedbacks = () => {
  const [data, setData] = useState([]); // Changed from object to array for feedback list
  const [loading, setLoading] = useState(false);
  const [creatorNames, setCreatorNames] = useState({}); // State for creator names

  const fetchFeedbackDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.feedbackDetails.url, {
        method: SummaryApi.feedbackDetails.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: 'include'
      });

      const dataResponse = await response.json();

      if (Array.isArray(dataResponse.data)) {
        setData(dataResponse.data);
        // Fetch creator names for all feedbacks
        dataResponse.data.forEach(item => {
             if (item.creator && !creatorNames[item.creator]) {
                  fetchUserData(item.creator);
             }
        });
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching feedback details:", error);
      setData([]);
      toast.error("Failed to fetch feedbacks.");
    }
    setLoading(false);
  };

  const fetchUserData = async (userId) => {
    if (!userId || creatorNames[userId]) return; // Avoid fetching if already exists

    try {
      const response = await fetch(SummaryApi.feedbackuser.url, {
        method: SummaryApi.feedbackuser.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const dataResponse = await response.json();
      setCreatorNames(prev => ({
        ...prev,
        [userId]: dataResponse.data?.name || 'Anonymous', // Store name by user ID
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
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-lg"> {/* Changed background, added roundedness and shadow */}
       <h2 className="text-2xl font-bold text-gray-800 mb-4">All Feedbacks</h2> {/* Added heading */}
       {loading ? (
          <p className="text-center text-gray-600">Loading feedbacks...</p>
       ) : data.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden"> {/* Changed background, border, roundedness, overflow */}
              <thead className="bg-gray-200"> {/* Changed background */}
                  <tr className="text-left border-b border-gray-300 text-gray-700"> {/* Changed text color, border */}
                      <th className="p-3 border-r border-gray-300 text-gray-800">Sr_No.</th> {/* Changed border, text color */}
                      <th className="p-3 border-r border-gray-300 text-gray-800">Feedback</th> {/* Changed border, text color */}
                      <th className="p-3 border-r border-gray-300 text-gray-800">User</th> {/* Changed border, text color */}
                      <th className="p-3 text-gray-800">Created On</th> {/* Changed text color */}
                  </tr>
              </thead>
              <tbody>
                  {data.map((el, index) => (
                      <tr key={el._id || index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"> {/* Changed border, text color, hover background */}
                          <td className="p-3 border-r border-gray-200">{index + 1}</td> {/* Changed border */}
                          <td className="p-3 border-r border-gray-200">{el.feedback}</td> {/* Changed border */}
                          <td className="p-3 border-r border-gray-200">{creatorNames[el.creator] || 'Loading...'}</td> {/* Changed border, display name */}
                          <td className="p-3">{el?.createdAt ? formatDate(el.createdAt) : 'N/A'}</td> {/* Added check and formatted date */}
                      </tr>
                  ))}
              </tbody>
          </table>
       ) : (
          <p className="text-center text-gray-600">No feedbacks available.</p>
       )}
    </div>
  );
}

export default AllFeedbacks;