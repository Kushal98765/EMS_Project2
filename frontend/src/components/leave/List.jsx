import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { API_BASE_URL } from '../../../utils';

const List = () => {
    const [leaves, setLeaves] = useState(null);
    let sno = 1;
    const {id} = useParams();
    const {user} = useAuth();


    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);


    if(!leaves) {
        return <div>Loading ...</div>
    }

    return (
        <div style={{ padding: '24px' }}>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Leaves</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search By Dep Name' className='border-none' style={{ padding: '2px 16px', backgroundColor: 'white' }} />

                {user.role === "employee" && (
                <Link to='/employee-dashboard/add-leave' className='bg-teal-600 rounded text-white' style={{ padding: '4px 16px' }}>Add New Leave</Link>
                )}
            </div>

            <table className='w-full text-sm text-left text-gray-500' style={{marginTop:'24px'}}>
                <thead className='text-xs uppercase bg-gray-50'>
                    <tr>
                        <th style={{ padding: '24px 12px' }}>SNO</th>
                        <th style={{ padding: '24px 12px' }}>Leave Type</th>
                        <th style={{ padding: '24px 12px' }}>From</th>
                        <th style={{ padding: '24px 12px' }}>To</th>
                        <th style={{ padding: '24px 12px' }}>Description</th>
                        <th style={{ padding: '24px 12px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr
                            key={leave._id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gary-700'>
                            <td style={{ padding: '24px 12px' }}>{sno++}</td>
                            <td style={{ padding: '24px 12px' }}>{leave.leaveType}</td>
                            <td style={{ padding: '24px 12px' }}>
                                {new Date(leave.startDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '24px 12px' }}>
                                {new Date(leave.endDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '24px 12px' }}>{leave.reason}</td>
                            <td style={{ padding: '24px 12px' }}>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default List
