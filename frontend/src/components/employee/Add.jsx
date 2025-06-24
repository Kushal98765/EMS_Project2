import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { API_BASE_URL } from '../../../utils';

const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, [])


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })  

        try {
            const response = await axios.post(`${API_BASE_URL}/api/employee/add`, formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className='max-w-4xl mx-auto bg-white rounded-md shadow-md' style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px', padding: '32px' }}>
            <h2 className='text-2xl font-bold' style={{ marginBottom: '24px' }}>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input type="text" name='name' placeholder='Insert Name' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type="email" name='email' placeholder='Insert Email' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
                        <input type="text" name='employeeId' placeholder='Employee ID' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input type="date" name='dob' placeholder='DOB' className='block w-full border border-gray-300 rounded-md' onChange={handleChange} style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Gender</label>
                        <select name="gender" className='block w-full border border-gray-300 rounded-md' onChange={handleChange} style={{ marginTop: '4px', padding: '8px' }} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Merital Status */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                        <select name="maritalStatus" placeholder='Marital Status' className='block w-full border border-gray-300 rounded-md' onChange={handleChange} style={{ marginTop: '4px', padding: '8px' }} required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Designation</label>
                        <input type="text" name='designation' placeholder='Designation' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Department */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Department</label>
                        <select name="department" className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} onChange={handleChange} required>
                            <option value="">Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Salary</label>
                        <input type="number" name='salary' onChange={handleChange} placeholder='Salary' className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type="password" name='password' placeholder='******' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                    </div>

                    {/* Role */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Role</label>
                        <select name="role" onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* upload image */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Upload Image</label>
                        <input type="file" name='image' placeholder='Upload Image' accept='image/*' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} />
                    </div>
                </div>

                <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md' style={{ marginTop: '24px', padding: '8px 16px' }}>Add Employee</button>
            </form>
        </div>
    )
}

export default Add;
