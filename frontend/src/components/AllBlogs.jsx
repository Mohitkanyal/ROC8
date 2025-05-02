import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const AllBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [creatorNames, setCreatorNames] = useState({}); 

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.blogDetails.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const dataResponse = await response.json();
      console.log("API Response:", dataResponse);

      if (Array.isArray(dataResponse.data)) {
        setData(dataResponse.data);
        dataResponse.data.forEach(blog => {
             if (blog.creator && !creatorNames[blog.creator]) {
                  fetchUserData(blog.creator);
             }
        });
      } else {
        setData([]);
      }

    } catch (error) {
      console.error("Error fetching blog details:", error);
      setData([]);
    }
    setLoading(false);
  };

  const fetchUserData = async (userId) => {
    if (!userId || creatorNames[userId]) return;
    try {
      const response = await fetch(SummaryApi.bloguser.url, {
        method: SummaryApi.bloguser.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const dataResponse = await response.json();
      setCreatorNames(prev => ({
           ...prev,
           [userId]: dataResponse.data?.name || 'Anonymous'
      }));
      console.log("data:",dataResponse.data?.name)
    } catch (error) {
      console.error("Error fetching user data:", error);
       setCreatorNames(prev => ({
           ...prev,
           [userId]: 'Anonymous'
      }));
    }
  };
  


  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-lg"> 
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Blogs</h2> 
      {loading ? (
         <p className="text-center text-gray-600">Loading blogs...</p>
      ) : data.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden"> 
          <thead className="bg-gray-200">
            <tr className="text-left border-b border-gray-300 text-gray-700"> 
              <th className="p-3 border-r border-gray-300 text-gray-800">Sr_No.</th> 
              <th className="p-3 border-r border-gray-300 text-gray-800">Image</th>
              <th className="p-3 border-r border-gray-300 text-gray-800">Title</th> 
              <th className="p-3 border-r border-gray-300 text-gray-800">Content (Snippet)</th> 
              {/*<th className="p-3 border-r border-gray-300 text-gray-800">Created By</th> */}
              <th className="p-3 border-r border-gray-300 text-gray-800">Created On</th>
              <th className="p-3 text-gray-800">View</th> 
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => (
              <tr key={el._id || index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"> 
                <td className="border-r border-gray-200 p-3">{index + 1}</td> 
                <td className="border-r border-gray-200 p-3">
                  {el.image && <img src={el.image} alt={el.title} className="w-16 h-16 rounded object-cover shadow-sm" />} 
                </td>
                <td className="border-r border-gray-200 p-3">{el.title}</td> 
                <td className="border-r border-gray-200 p-3 text-sm">{el.content?.substring(0, 100)}...</td> 
                {/*<td className="border-r border-gray-200 p-3">{creatorNames[el.creator] || 'Loading...'}</td> */}
                <td className="border-r border-gray-200 p-3">{formatDate(el?.createdAt)}</td> 
                <td className="p-3">
                  <NavLink to={`/ViewBlog/${el?._id}`} className="text-blue-600 hover:text-blue-800 transition-colors"> 
                    <FaEye size={18} />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
         <p className="text-center text-gray-600">No blogs found.</p>
      )}
    </div>
  );
};

export default AllBlogs;