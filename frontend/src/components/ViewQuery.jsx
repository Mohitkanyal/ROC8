import React, { useEffect, useState } from "react";
import Aboutusimg from "../asset/Images/contact.jpg"; 
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { formatDate } from "../utils/dateFormator"; 


const ViewQuery = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchViewQueryDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.viewqueryDetails.url, {
        method: SummaryApi.viewqueryDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          aboutusId: params?.id,
        }),
      });
      setLoading(false);
      const dataResponse = await response.json();
      if(dataResponse.success && dataResponse.data) { 
         setData(dataResponse.data);
      } else {
         toast.error(dataResponse.message || "Failed to fetch query details.");
         setData({}); 
      }
    } catch (error) {
        console.error("Error fetching query details:", error);
        toast.error("Failed to fetch query details.");
        setLoading(false);
        setData({}); 
    }
  };
  useEffect(() => {
    fetchViewQueryDetails();
  }, [params.id]); 

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans p-4 mt-16">
      <div className="container mx-auto mt-4 flex flex-col md:flex-row items-center gap-8">
        <img className="w-full md:w-1/2 h-auto rounded-xl shadow-lg object-cover" src={Aboutusimg} alt="Query View" /> 

        <div className="w-full md:w-1/2 bg-white/90 p-6 rounded-xl shadow-lg"> 
           <h2 className="text-2xl font-bold text-gray-800 mb-6">Query Details</h2> 
           {loading ? (
              <p className="text-center text-gray-600">Loading query...</p>
           ) : data._id ? ( 
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label> 
                  <div className="p-3 bg-gray-100 rounded-md text-gray-700">{data.name}</div> 
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Email</label> 
                  <div className="p-3 bg-gray-100 rounded-md text-gray-700">{data.email}</div> 
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
                  <div className="p-3 bg-gray-100 rounded-md text-gray-700">{data.number}</div> 
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Message</label> 
                  <div className="p-3 bg-gray-100 rounded-md whitespace-pre-line text-gray-700">{data.message}</div> 
                </div>
                 {data.sendedAt && ( 
                   <div>
                     <label className="block text-sm font-semibold text-gray-800 mb-1">Sent On</label> 
                     <div className="p-3 bg-gray-100 rounded-md text-gray-700">{data.sendedAt ? formatDate(data.sendedAt) : 'N/A'}</div> 
                   </div>
                 )}
              </div>
           ) : (
              <p className="text-center text-gray-600">Query not found.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuery;