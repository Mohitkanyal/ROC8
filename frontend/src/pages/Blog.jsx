import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Blog() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [creatorName, setCreatorName] = useState('');

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        content: "",
        creator: user?._id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const transformFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(SummaryApi.createBlog.url, {
            method: SummaryApi.createBlog.method,
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (result.success) {
            toast.success(result.message);
            setFormData({ title: "", image: "", content: "", creator: user?._id });
            fetchBlogDetails();
        } else {
            toast.error(result.message);
        }
    };

    const fetchBlogDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.blogDetails.url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const json = await response.json();
            if (Array.isArray(json.data)) {
                setData(json.data);
                fetchUserData(json?.data?.creator);
            } else {
                setData([]);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setData([]);
        }
        setLoading(false);
    };

    const fetchUserData = async (userId) => {
        if (!userId) return;
        try {
            const response = await fetch(SummaryApi.bloguser.url, {
                method: SummaryApi.bloguser.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });
            const json = await response.json();
            setCreatorName(json.data);
        } catch (error) {
            console.error("User fetch error:", error);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    return (
        <>
            <div className="w-full min-h-screen bg-gradient-to-br from-white via-white to-white relative overflow-x-hidden text-black">
            <div className="absolute inset-0 bg-[radial-gradient(black_1.5px,transparent_1.15px)] bg-[size:14px_14px] opacity-10 z-0" />
            <div className="absolute top-10 left-10 w-40 h-40 bg-gray-100 rounded-lg shadow-lg opacity-70 rotate-12"></div>
                <div className="absolute bottom-20 left-10 w-60 h-60 bg-gray-200 rounded-lg shadow-lg opacity-70 -rotate-12"></div>
                <div className="absolute bottom-20 right-16 w-60 h-60 bg-gray-100 rounded-lg shadow-lg opacity-80 -rotate-6"></div>
                <div className="absolute top-32 right-32 w-52 h-52 bg-gray-200 rounded-lg shadow-lg opacity-80 rotate-3"></div>

                <div className="relative z-10 max-w-5xl mx-auto p-6 pt-24">
                    <h1 className="text-3xl font-bold text-center mb-10 text-black">Latest Blogs on Salary Prediction</h1>

                    {/* Blog list */}
                    <div className="overflow-y-auto min-h-64 bg-gray-100 text-black p-6 rounded-xl shadow-2xl space-y-4">
                        <h2 className="text-2xl font-semibold mb-4">Blogs:</h2>
                        <div className="space-y-4">
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((el, index) => (
                                    <div key={index} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
                                        <div
                                            className="flex items-center space-x-4 cursor-pointer"
                                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        >
                                            <img src={el.image} alt={el.title} className="w-16 h-16 rounded object-cover" />
                                            <h2 className="text-lg font-semibold flex-1">{el.title}</h2>
                                            <span className="text-black text-xl">
                                                {expandedIndex === index ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />}
                                            </span>
                                        </div>
                                        {expandedIndex === index && (
                                            <p className="mt-2 text-gray-700">{el.content}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No blogs available...</p>
                            )}
                        </div>
                    </div>

                    {/* Submit blog form */}
                    <div className="mt-16 p-6 border rounded-xl shadow-2xl bg-gray-100 text-black">
                        <h2 className="text-xl mb-6 flex items-center font-semibold">
                            <FaRegEdit className="mr-2" /> Submit Your Blog
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm mb-2 font-medium">Blog Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-white"
                                required
                            />

                            <label className="block text-sm mt-4 mb-2 font-medium">Upload Image *</label>
                            <input
                                type="file"
                                name="image"
                                onChange={transformFile}
                                className="w-full p-2 border rounded bg-white"
                                required
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="mt-4 w-32 h-32 rounded object-cover shadow-md" />
                            )}

                            <label className="block text-sm mt-4 mb-2 font-medium">Blog Content *</label>
                            <textarea
                                name="content"
                                rows="4"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full p-2 border rounded bg-white"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4 font-semibold"
                            >
                                Submit Blog
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
