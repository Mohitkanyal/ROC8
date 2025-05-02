import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name, email, role, onClose, userId, callFunc
}) => {
    const [userRole, setUserRole] = useState(role);
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        });
        const responseData = await fetchResponse.json();
        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        }
        if (responseData.error) {
            toast.success(responseData.error);
        }
    };

    return (
        <div className='fixed inset-0 bg-gray-200 bg-opacity-10 backdrop-blur-md flex justify-center items-center z-50'>
            <div className="bg-white p-8 w-96 shadow-lg rounded-lg relative">
                <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
                    <IoMdClose size={25} />
                </div>
                <p className='text-xl font-semibold text-center mb-4'>Change User Role</p>
                <div className='text-lg mb-2'>Name: {name}</div>
                <div className='text-lg mb-4'>Email: {email}</div> 
                <div className="flex justify-between items-center mb-4">
                    <label className='text-lg'>Role:</label> 
                    <select 
                        value={userRole} 
                        onChange={handleOnChangeSelect} 
                        className='border border-gray-300 rounded p-2 w-40'
                    >
                    {/* {Object.values(ROLE).map(el => {
                        return( */}
                        <option value="ADMIN">ADMIN</option>
                        <option value="GENERAL">GENERAL</option>
                        {/* )
                    })} */}
                    </select>
                </div>
                <button 
                    className='w-full mt-8 bg-purple-500 text-white py-2 rounded-lg text-lg hover:bg-purple-600'
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;