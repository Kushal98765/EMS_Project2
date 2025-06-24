import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';

const Add = () => {
    const {user} = useAuth();

    const [leave, setLeave] = useState({
        userId: user._id,
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target
        setLeave((prevState) => ({...prevState, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
                const response = await axios.post(`${API_BASE_URL}/api/leave/add`, leave, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    navigate(`/employee-dashboard/leaves/${user._id}`)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
    }

    return (
        <div className='max-w-4xl bg-white rounded-md shadow-md' style={{ margin: '40px auto', padding: '32px' }}>
            <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col" style={{marginTop:'16px'}}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            onChange={handleChange}
                            className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required
                        >
                            <option value="">Select Department</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginTop:'10px' }}>
                        {/* from date */}
                        <div>
                            <label htmlFor="block text-sm font-medium text-gray-700">
                                From Date
                            </label>
                            <input type="date" name='startDate' onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md" style={{ marginTop: '4px', padding: '8px' }} required
                            />
                        </div>

                        {/* to date */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                To Date
                            </label>
                            <input type="date"
                                name='endDate'
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md" style={{ marginTop: '8px', padding: '8px' }} required />
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{marginTop:'10px'}}>
                        <label className='block text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea name="reason" placeholder='Reason' onChange={handleChange}
                            className='w-full border border-gray-300 rounded-md' style={{marginTop:'10px', paddingTop:'10px', paddingLeft:'10px'}}
                        ></textarea>
                    </div>
                </div>

                <button type='submit'
                    className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md'
                    style={{ marginTop: '24px', padding: '8px 8px', cursor:'pointer' }}
                >Add Leave</button>
            </form>
        </div>
    )
}

export default Add
