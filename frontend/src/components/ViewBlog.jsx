import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { formatDate } from "../utils/dateFormator";
import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const ViewBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [creatorNames, setCreatorNames] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const params = useParams();

  const fetchViewBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.viewblogDetails.url, {
        method: SummaryApi.viewblogDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          blogId: params?.id,
        }),
      });
      setLoading(false);

      const dataResponse = await response.json();
      if (dataResponse.success && dataResponse.data) { 
         setData(dataResponse.data);
         setEditedTitle(dataResponse.data.title);
         setEditedContent(dataResponse.data.content);
         if (dataResponse.data?.creator && !creatorNames[dataResponse.data.creator]) {
           fetchUserData(dataResponse.data.creator);
         }
      } else {
          toast.error(dataResponse.message || "Failed to fetch blog details.");
          setData({}); 
          setEditedTitle("");
          setEditedContent("");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      toast.error("Failed to fetch blog details.");
      setLoading(false);
      setData({}); 
      setEditedTitle("");
      setEditedContent("");
    }
  };

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
      setCreatorNames(prev => ({
        ...prev,
        [userId]: dataResponse.data?.name || 'Anonymous',
      }));
    } catch (error) {
      console.error("User fetch error:", error);
      setCreatorNames(prev => ({
           ...prev,
           [userId]: 'Anonymous',
      }));
    }
  };

  useEffect(() => {
    fetchViewBlogDetails();
  }, [params.id]); 

  const handleUpdateBlog = async () => {
     if (!editedTitle.trim() || !editedContent.trim()) {
         toast.error("Title and content cannot be empty.");
         return;
     }

    const response = await fetch(SummaryApi.updateBlog.url, {
      method: SummaryApi.updateBlog.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: params?.id,
        title: editedTitle,
        content: editedContent,
      }),
    });

    const result = await response.json();
    if (result.success) {
      toast.success("Blog updated successfully!");
      setIsEditing(false);
      fetchViewBlogDetails(); 
    } else {
      toast.error(result.message || "Failed to update blog");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans p-4"> 
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8 mt-4">View Blog</h2> 
        {loading ? (
           <p className="text-center text-gray-600">Loading blog...</p>
        ) : data._id ? ( 
           <div className="relative bg-white/90 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6"> 
               {data.image && (
                   <div className="w-full md:w-1/3 flex-shrink-0"> 
                       <img src={data.image} alt={data.title} className="w-full h-auto rounded object-cover shadow-md" /> 
                   </div>
               )}
               <div className="flex-grow"> 
                 {isEditing ? (
                   <>
                     <input
                       type="text"
                       value={editedTitle}
                       onChange={(e) => setEditedTitle(e.target.value)}
                       className="w-full border border-gray-300 p-2 rounded text-xl font-semibold mb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                     />
                     <textarea
                       value={editedContent}
                       onChange={(e) => setEditedContent(e.target.value)}
                       className="w-full border border-gray-300 p-2 rounded text-gray-700 mb-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                     />
                   </>
                 ) : (
                   <>
                     <h3 className="text-2xl font-bold mb-3 text-gray-900">{data.title}</h3> 
                     <p className="text-gray-700 mb-4 leading-relaxed">{data.content}</p> 
                   </>
                 )}
                 <div className="mt-4 text-sm text-gray-600">
                   <p>
                     <strong>Author:</strong> {creatorNames[data.creator] || "Anonymous"}
                   </p>
                   <p>
                     <strong>Published On:</strong> {data?.createdAt ? formatDate(data.createdAt) : 'N/A'}
                   </p>
                 </div>
               </div>
               <div className="absolute right-4 top-[200px] bottom-4 flex flex-col justify-end gap-4">
                  {isEditing ? (
                    <button
                      onClick={handleUpdateBlog}
                      className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all font-semibold shadow-md w-full md:w-auto"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all flex items-center gap-2 font-semibold shadow-md w-full md:w-auto justify-center"
                    >
                      Edit Blog
                      <MdEdit className="text-lg" />
                    </button>
                  )}
                </div>
             </div>
        ) : (
           <p className="text-center text-gray-600">Blog not found.</p>
        )}


      </div>
    </div>
  );
};

export default ViewBlog;