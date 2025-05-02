import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer"; 
import { FaSearch } from "react-icons/fa";

const JobTrends = () => {
  const [jobs, setJobs] = useState([]); 
  const [newJob, setNewJob] = useState({ title: "", growth: "", demand: "", category: "" }); 

  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    growth: "",
    demand: "",
    category: ""
  });

  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    const errors = {};
    if (!/^\d+$/.test(data.growth) || parseInt(data.growth) < 0) { 
      toast.error("Growth must be a non-negative number.");
      errors.growth = "Growth must be a non-negative number.";
    }
    if (!/^\d+$/.test(data.demand) || parseInt(data.demand) < 0) { 
      toast.error("Demand must be a non-negative number.");
      errors.demand = "Demand must be a non-negative number.";
    }
    if (!data.title.trim()) {
        toast.error("Job Title cannot be empty.");
        errors.title = "Job Title cannot be empty.";
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
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    const response = await fetch(SummaryApi.DeleteJob.url, {
      method: SummaryApi.DeleteJob.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jobId: id })
    });
    const dataApi = await response.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchJobDetails();
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const dataResponse = await fetch(SummaryApi.addJob.url, {
      method: SummaryApi.addJob.method,
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchJobDetails();
      setData({ title: "", growth: "", demand: "", category: "" });
    } else {
      toast.error(dataApi.message);
    }
  };

  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState([]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.jobDetails.url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const dataResponse = await response.json();
      setJobData(Array.isArray(dataResponse.data) ? dataResponse.data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const [searchTerm, setSearchTerm] = useState(""); 

  const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-16"> 
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-gray-900 font-bold text-center mt-8 mb-8">Job Market Trends</h1> 

        <div className="flex justify-center mb-8">
          <div className="relative">
             <input
               type="text"
               placeholder="Search job roles..."
               className="border border-gray-300 rounded-full px-4 py-2 pr-10 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> 
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-5xl mx-auto mt-6"> 
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Growth & Demand Overview</h2> 
          {loading ? (
             <div className="text-center text-gray-600">Loading chart data...</div>
           ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredJobs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> 
                <XAxis dataKey="title" angle={-15} textAnchor="end" height={60} stroke="#4b5563" /> 
                <YAxis stroke="#4b5563" /> 
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} labelStyle={{ color: '#4b5563' }} itemStyle={{ color: '#1f2937' }} /> {/* Styled tooltip */}
                <Legend />
                <Bar dataKey="growth" fill="#6b7280" barSize={40} name="Growth Rate (%)" /> 
                <Bar dataKey="demand" fill="#9ca3af" barSize={40} name="Job Demand (%)" /> 
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto"> 
          {loading ? (
             <p className="text-center text-gray-600 col-span-full">Loading job details...</p>
           ) : filteredJobs.length > 0 ? (
            filteredJobs.map((el) => (
              <div key={el._id} className="bg-white/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition relative"> 
                <h2 className="text-xl font-bold text-gray-800 mb-2">{el.title}</h2> 
                <p className="text-gray-600 text-sm mb-1">Category: <span className="text-gray-700">{el.category}</span></p> 
                <p className="text-gray-600 text-sm mb-1">Growth Rate: <span className="font-bold text-gray-700">{el.growth}%</span></p> 
                <p className="text-gray-600 text-sm">Demand: <span className="font-bold text-gray-700">{el.demand}%</span></p> 
                {user?.role === "ADMIN" && (
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition" 
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No jobs found matching your search.</p> )}
        </div>

        {user?.role === "ADMIN" && (
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-12"> 
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add New Job Role</h2> 
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4"> 
              <input
                type="text"
                placeholder="Job Title"
                className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800`} // Styled input
                name="title"
                value={data.title} onChange={handleChange}
                 required
              />
              <input
                type="number"
                placeholder="Growth Rate (%)"
                className={`border ${errors.growth ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800`} // Styled input
                name="growth"
                value={data.growth} onChange={handleChange}
                 required
              />
              <input
                type="number"
                placeholder="Job Demand (%)"
                className={`border ${errors.demand ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800`} // Styled input
                name="demand"
                value={data.demand} onChange={handleChange}
                 required
              />
              <input
                type="text"
                placeholder="Category"
                className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800`} // Styled input
                name="category"
                value={data.category} onChange={handleChange}
                 required
              />
              <button
                type="submit" 
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full w-full transition-all font-semibold shadow-lg" // Matched CareerInsights primary button style
              >
                Add Job Role
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer /> 
    </div>
  );
};

export default JobTrends;