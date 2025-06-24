import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils'

const EditDepartment = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false);
            }
        }
        fetchDepartments();
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${API_BASE_URL}/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }


    return (
        <>{depLoading ? <div>Loading ...</div> :
            <div className='max-w-3xl bg-white rounded-md shadow-md' style={{ margin: '0px auto', marginTop: '40px', padding: '32px', width: '384px' }}>
                <h2 className='text-2xl font-bold' style={{ marginBottom: '24px' }}>Edit Deaprtment</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
                        <input type="text" name="dep_name" style={{ backgroundColor: 'white', marginTop: '4px', width: '100%', padding: '8px' }} onChange={handleChange} value={department.dep_name} placeholder='Department Name' className='border border-gray-300 rounded-md' />
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea name="description" onChange={handleChange}
                            value={department.description} placeholder='Description' style={{ backgroundColor: 'white', marginTop: '4px', padding: '8px', width: '100%' }} className='block border border-gray-300 rounded-md' rows="4" />
                    </div>
                    <button type='submit' className='bg-teal-600 hover:bg-teal-700 text-white font-bold rounded' style={{ width: '100%', marginTop: '24px', padding: '8px 16px', cursor: 'pointer' }}>Edit Department</button>
                </form>
            </div>
        }</>
    )
}

export default EditDepartment
