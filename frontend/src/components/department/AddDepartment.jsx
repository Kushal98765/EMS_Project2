import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../../utils";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department, [name] : value})
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${API_BASE_URL}/api/department/add`, department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin-dashboard/departments')
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <div className='max-w-3xl bg-white rounded-md shadow-md' style={{margin:'0px auto', marginTop:'40px', padding:'32px', width:'384px'}}>
        <h2 className='text-2xl font-bold' style={{marginBottom:'24px'}}>Add New Deaprtment</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
                <input type="text" name="dep_name" style={{backgroundColor:'white',marginTop:'4px', width:'100%', padding:'8px'}} onChange={handleChange} placeholder='Department Name' className='border border-gray-300 rounded-md' />
            </div>
            <div style={{marginTop:'12px'}}>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea name="description" onChange={handleChange} placeholder='Description' style={{backgroundColor:'white', marginTop:'4px', padding:'8px', width:'100%'}} className='block border border-gray-300 rounded-md' rows="4" />
            </div>
            <button type='submit' className='bg-teal-600 hover:bg-teal-700 text-white font-bold rounded' style={{width:'100%', marginTop:'24px', padding:'8px 16px', cursor:'pointer'}}>Add Department</button>
        </form>
    </div>
  )
}

export default AddDepartment;