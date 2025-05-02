import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { formatDate } from '../utils/dateFormator';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole'; 

const AllUsers = () => {
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });
  const [loading, setLoading] = useState(false);


  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch users.");
        setAllUsers([]); 
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
      setAllUsers([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-lg text-gray-900"> 
       <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2> 
       {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
       ) : allUsers.length > 0 ? (
          <table className='min-w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden'> 
              <thead className='bg-gray-200'> 
                  <tr className='text-left border-b border-gray-300 text-gray-700'> 
                      <th className='p-3 border-r border-gray-300 text-gray-800'>Sr No.</th> 
                      <th className='p-3 border-r border-gray-300 text-gray-800'>Name</th> 
                      <th className='p-3 border-r border-gray-300 text-gray-800'>Email</th> 
                      <th className='p-3 border-r border-gray-300 text-gray-800'>Role</th> 
                      <th className='p-3 border-r border-gray-300 text-gray-800'>Created Date</th> 
                      <th className='p-3 text-gray-800'>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {allUsers.map((el, index) => (
                      <tr key={el._id || index} className='border-b border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors'> 
                          <td className='border-r border-gray-200 p-3'>{index + 1}</td> 
                          <td className='border-r border-gray-200 p-3'>{el.name}</td> 
                          <td className='border-r border-gray-200 p-3'>{el.email}</td> 
                          <td className='border-r border-gray-200 p-3'>{el.role}</td> 
                          <td className='border-r border-gray-200 p-3'>{formatDate(el?.createdAt)}</td> 
                          <td className='p-3'>
                              <div
                                  className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition-colors text-gray-600' 
                                  onClick={() => {
                                      setUpdateUserDetails(el);
                                      setOpenUpdateRole(true);
                                  }}
                              >
                                  <FaEdit size={18} /> 
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
       ) : (
          <p className="text-center text-gray-600">No users found.</p>
       )}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;