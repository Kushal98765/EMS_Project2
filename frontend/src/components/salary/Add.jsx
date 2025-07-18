import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import { API_BASE_URL } from '../../../utils';

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps);
    }




    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/api/salary/add`, 
                salary, {
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
        <>{departments ? (
            <div className='max-w-4xl mx-auto bg-white rounded-md shadow-md' style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px', padding: '32px' }}>
                <h2 className='text-2xl font-bold' style={{ marginBottom: '24px' }}>Add Salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                            {/* Department */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Department</label>
                            <select name="department" className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} onChange={handleDepartment} required>
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                         {/* Employees */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Employee</label>
                            <select name="employeeId" className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} onChange={handleChange} required>
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>

                        {/* Basic Salary */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Basic Salary</label>
                            <input type="number" name='basicSalary' placeholder='Basic Salary' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* allowances */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Allowances</label>
                            <input type="number" name='allowances' onChange={handleChange} placeholder='allowances' className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* Deductions */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Deductions</label>
                            <input type="number" name='deductions' onChange={handleChange} placeholder='deductions' className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                        {/* Pay Date */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Pay Date</label>
                            <input type="date" name='payDate' onChange={handleChange} className='block w-full border border-gray-300 rounded-md' style={{ marginTop: '4px', padding: '8px' }} required />
                        </div>

                    

                    </div>

                    <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md' style={{ marginTop: '24px', padding: '8px 16px' }}>Add Salary</button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Add;
