import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
        } else {
            try {
                const response = await axios.put(
                    `${API_BASE_URL}/api/setting/change-password`,
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    }

    return (
        <div className='max-w-3xl bg-white rounded-md shadow-md' style={{ margin: '40px auto', padding: '32px', width: '384px' }}>
            <h2 className='text-2xl font-bold' style={{ marginBottom: '24px' }}>Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div>
                    <label className='text-sm font-medium text-gray-700'>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Change Password"
                        style={{ marginTop: '4px', width: '100%', padding: '8px' }}
                        onChange={handleChange} className='border border-gray-300 rounded-md' required />
                </div>
                {/* New Password */}
                <div>
                    <label className='text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        style={{ marginTop: '4px', width: '100%', padding: '8px' }}
                        onChange={handleChange} className='border border-gray-300 rounded-md' required />
                </div>
                {/* Confirm Password */}
                <div>
                    <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        style={{ marginTop: '4px', width: '100%', padding: '8px' }}
                        onChange={handleChange} className='border border-gray-300 rounded-md' required />
                </div>

                <button type='submit'
                className='bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md cursor-pointer'
                style={{width:'100%', marginTop:'24px', padding:'8px 8px'}}
                >
                    Change Password
                </button>

            </form>
        </div>
    )
}

export default Setting
