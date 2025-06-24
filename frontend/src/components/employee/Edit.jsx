import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { API_BASE_URL } from '../../../utils';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: '',
        department: ''
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    const employee = response.data.employee
                    setEmployee((prev) => ({...prev, 
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchEmployee();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${API_BASE_URL}/api/employee/${id}`, 
                employee, {
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
        <>{departments && employee ? (
            <div className='max-w-4xl mx-auto bg-white rounded-md shadow-md' style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px', padding: '32px' }}>
                <h2 className='text-2xl font-bold' style={{ marginBottom: '24px' }}>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                        {/* Name */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type="text" name='name' placeholder='Insert Name'
                                value={employee.name} onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* Merital Status */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                            <select name="maritalStatus" placeholder='Marital Status' className='block w-full border border-gray-300 rounded-md' value={employee.maritalStatus} onChange={handleChange} style={{ marginTop: '4px', padding: '8px' }} required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        {/* Designation */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Designation</label>
                            <input type="text" name='designation' placeholder='Designation' value={employee.designation} onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Salary</label>
                            <input type="number" name='salary' value={employee.salary} onChange={handleChange} placeholder='Salary' className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* Department */}
                        <div className='col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Department</label>
                            <select name="department" className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }}
                            value={employee.department} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md' style={{ marginTop: '24px', padding: '8px 16px' }}>Edit Employee</button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Edit;
