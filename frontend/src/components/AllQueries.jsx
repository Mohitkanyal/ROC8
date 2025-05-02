import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const AllQueries = () => {

  const [allQueries,setAllQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllQueries = async() =>{
    setLoading(true);
    try {
      const fetchData = await fetch(SummaryApi.allQueries.url,{
        method: SummaryApi.allQueries.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();

      if(dataResponse.success){
        setAllQueries(dataResponse.data)
      } else {
        toast.error(dataResponse.message || "Failed to fetch queries.");
        setAllQueries([]);
      }
    } catch (error) {
        toast.error("Failed to fetch queries.");
        setAllQueries([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllQueries()
  },[])


  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-lg"> 
       <h2 className="text-2xl font-bold text-gray-800 mb-4">All Queries (Contact Us)</h2>
       {loading ? (
          <p className="text-center text-gray-600">Loading queries...</p>
       ) : allQueries.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden"> 
              <thead className="bg-gray-200"> 
                  <tr className="text-left border-b border-gray-300 text-gray-700"> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Sr_No.</th> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Name</th> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Email</th> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Phone</th> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Message (Snippet)</th> 
                      <th className="p-3 border-r border-gray-300 text-gray-800">Sent On</th>
                      <th className="p-3 text-gray-800">View</th> 
                  </tr>
              </thead>
              <tbody>
                  {allQueries.map((el, index) => (
                      <tr key={el._id || index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"> 
                          <td className="p-3 border-r border-gray-200">{index + 1}</td> 
                          <td className="p-3 border-r border-gray-200">{el.name}</td> 
                          <td className="p-3 border-r border-gray-200">{el.email}</td> 
                          <td className="p-3 border-r border-gray-200">{el.number}</td> 
                          <td className="p-3 border-r border-gray-200 text-sm">{el.message?.substring(0, 100)}...</td> 
                          <td className="p-3 border-r border-gray-200">{el?.sendedAt ? formatDate(el.sendedAt) : 'N/A'}</td> 
                          <td className="p-3">
                              <NavLink to={`/ViewQuery/${el?._id}`} className='text-blue-600 hover:text-blue-800 transition-colors' > 
                                  <FaEye size={18} /> 
                              </NavLink>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
       ) : (
           <p className="text-center text-gray-600">No queries available.</p>
       )}
    </div>
  )
}

export default AllQueries;