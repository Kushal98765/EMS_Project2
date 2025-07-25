import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../../utils'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments()
  }

  const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/department`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
            }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setDepLoading(false);
      }
    }

  useEffect(() => {
    fetchDepartments();
  }, [])


  const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records); 
  }


  return (
    <>{depLoading ? <div>Loading ...</div> : 
    <div style={{ padding: '20px' }}>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Dep Name' className='border-none' style={{ padding: '2px 16px', backgroundColor: 'white' }} onChange={filterDepartments} />
        <Link to='/admin-dashboard/add-department' className='bg-teal-600 rounded text-white' style={{ padding: '4px 16px' }}>Add New Department</Link>
      </div>
      <div>
        <DataTable
          columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>
    }</>
  )
}

export default DepartmentList;
