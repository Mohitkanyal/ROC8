import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa"; // Import FaSearch
import { motion } from "framer-motion"; // Assuming framer-motion is used for animations elsewhere

const AllJobTrends = () => {
  const [jobData, setJobData] = useState([]);
  const [data, setData] = useState({
    title: "",
    growth: "",
    demand: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const params = useParams(); // This seems unused

  const validateInputs = () => {
    const errors = {};
    if (!data.title.trim()) {
      toast.error("Job Title cannot be empty.");
      errors.title = "Job Title cannot be empty.";
    }
    if (!/^\d+$/.test(data.growth) || parseInt(data.growth) < 0) {
      toast.error("Growth must be a non-negative number.");
      errors.growth = "Growth must be a non-negative number.";
    }
    if (!/^\d+$/.test(data.demand) || parseInt(data.demand) < 0) {
      toast.error("Demand must be a non-negative number.");
      errors.demand = "Demand must be a non-negative number.";
    }
    if (!data.category.trim()) {
      toast.error("Category cannot be empty.");
      errors.category = "Category cannot be empty.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(SummaryApi.DeleteJob.url, {
        method: SummaryApi.DeleteJob.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: id }),
      });

      const dataApi = await response.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        fetchJobDetails();
      } else {
         toast.error(dataApi.message || "Failed to delete job.");
      }
    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const response = await fetch(SummaryApi.addJob.url, {
      method: SummaryApi.addJob.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      setData({ title: "", growth: "", demand: "", category: "" });
      fetchJobDetails();
    } else {
      toast.error(result.message || "Error adding job");
    }
  };

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.jobDetails.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setJobData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      toast.error("Failed to fetch job data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);


  const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-6 text-gray-900 rounded-xl shadow-lg"> {/* Changed background, text color, added roundedness and shadow */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Job Market Trends (Admin)</h1> {/* Changed text color, added (Admin) */}

       {user?.role === "ADMIN" && (
          <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-8"> {/* Changed background, roundedness, shadow, added mb */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Add New Job Role</h2> {/* Changed text color */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Added md:grid-cols-2, gap */}
              <input
                type="text"
                placeholder="Job Title"
                className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white`} // Styled input
                name="title"
                value={data.title} onChange={handleChange}
                 required
              />
              <input
                type="number"
                placeholder="Growth Rate (%)"
                 min="0" // Added min value
                className={`border ${errors.growth ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white`} // Styled input
                name="growth"
                value={data.growth} onChange={handleChange}
                 required
              />
              <input
                type="number"
                placeholder="Job Demand (%)"
                 min="0" // Added min value
                className={`border ${errors.demand ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white`} // Styled input
                name="demand"
                value={data.demand} onChange={handleChange}
                 required
              />
              <input
                type="text"
                placeholder="Category"
                className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white`} // Styled input
                name="category"
                value={data.category} onChange={handleChange}
                 required
              />
               <div className="md:col-span-2"> {/* Button spans two columns on medium screens */}
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full w-full transition-all font-semibold shadow-lg" // Matched CareerInsights primary button style
                >
                  Add Job Role
                </button>
               </div>
            </form>
          </div>
       )}


      <div className="flex justify-center mb-6">
         <div className="relative w-full max-w-md"> {/* Added max-width and relative positioning */}
            <input
              type="text"
              placeholder="Search job roles..."
              className="border border-gray-300 rounded-full px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white" // Styled input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Styled icon */}
         </div>
      </div>

      {loading ? (
          <p className="text-center text-gray-600">Loading job data...</p>
      ) : filteredJobs.length > 0 ? (
        <div className="w-full h-[400px] bg-gray-100 rounded-xl p-4 shadow-md mb-8"> {/* Changed background, roundedness, padding, shadow, added mb */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredJobs}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* Styled grid */}
              <XAxis dataKey="title" angle={-15} textAnchor="end" height={60} stroke="#4b5563" style={{ fontSize: '12px' }} /> {/* Styled axis text, added angle and size */}
              <YAxis stroke="#4b5563" /> {/* Styled axis text */}
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} labelStyle={{ color: '#4b5563' }} itemStyle={{ color: '#1f2937' }} /> {/* Styled tooltip */}
              <Legend />
              <Bar dataKey="growth" fill="#6b7280" name="Growth Rate (%)" /> {/* Changed bar color */}
              <Bar dataKey="demand" fill="#9ca3af" name="Job Demand (%)" /> {/* Changed bar color */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
          <p className="text-center text-gray-600">No jobs found matching your search.</p>
      )}


      {filteredJobs.length > 0 && (
         <div className="bg-white rounded-xl overflow-x-auto shadow-md"> {/* Changed background, roundedness, shadow */}
           <table className="min-w-full table-auto text-gray-800"> {/* Changed text color */}
             <thead className="bg-gray-200"> {/* Changed background */}
               <tr>
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Sr No</th> {/* Styled header cells */}
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Title</th> {/* Styled header cells */}
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Growth</th> {/* Styled header cells */}
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Demand</th> {/* Styled header cells */}
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Category</th> {/* Styled header cells */}
                 <th className="p-3 text-left border-b border-gray-300 text-gray-700">Action</th> {/* Styled header cells */}
               </tr>
             </thead>
             <tbody>
               {filteredJobs.map((job, index) => (
                 <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors"> {/* Styled row */}
                   <td className="p-3 text-gray-700">{index + 1}</td> {/* Styled cell */}
                   <td className="p-3 text-gray-700">{job.title}</td> {/* Styled cell */}
                   <td className="p-3 text-gray-700">{job.growth}%</td> {/* Styled cell, added % */}
                   <td className="p-3 text-gray-700">{job.demand}%</td> {/* Styled cell, added % */}
                   <td className="p-3 text-gray-700">{job.category}</td> {/* Styled cell */}
                   <td className="p-3">
                     <button
                       onClick={() => handleDelete(job._id)}
                       className="text-red-600 hover:text-red-800 transition-colors" // Styled delete button icon
                     >
                       <FaTrash size={16} /> {/* Styled icon */}
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      )}
    </div>
  );
};

export default AllJobTrends;