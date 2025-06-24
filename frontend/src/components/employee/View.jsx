import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee();
    }, [])
    return (
        <>{employee ? (
        <div className='max-w-3xl mx-auto bg-white rounded-md shadow-md' style={{ padding: '32px', margin:'40px auto' }}>
            <h2 className='text-2xl font-bold text-center' style={{ marginBottom: '32px' }}>
                Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
                <div>
                    <img src={`${API_BASE_URL}/${employee.userId.profileImage
                        }`} className='rounded-full border' style={{ width: '288px', height:'300px' }} />
                </div>
                <div>
                    <div className="flex space-x-3" style={{ marginBottom: '20px' }}>
                        <p className='text-lg font-bold'>Name:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>{employee.userId.name}</p>
                    </div>
                    <div className="flex space-x-3" style={{ marginBottom: '20px' }}>
                        <p className='text-lg font-bold'>Employee ID:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>{employee.employeeId}</p>
                    </div>
                    <div className="flex space-x-3" style={{ marginBottom: '20px' }}>
                        <p className='text-lg font-bold'>Date of Birth:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>
                            {new Date(employee.dob).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex space-x-3" style={{marginBottom: '20px'}}>
                        <p className='text-lg font-bold'>Gender:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>{employee.gender}</p>
                    </div>
                    <div className="flex space-x-3" style={{marginBottom: '20px'}}>
                        <p className='text-lg font-bold'>Department:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>{employee.department.dep_name}</p>
                    </div>
                    <div className="flex space-x-3" style={{marginBottom: '20px'}}>
                        <p className='text-lg font-bold'>Marital Status:</p>
                        <p className='font-medium' style={{marginTop:'2px', marginLeft:'10px'}}>{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
        ) : <div> Loading ... </div> }</>
    )
}

export default View
