import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils";

export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        width: "100px",
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        width: "90px",
    },
    {
        name: 'Department',
        selector: (row) => row.dep_name,
        width: "120px",
    },
    {
        name: 'DOB',
        selector: (row) => row.dob,
        sortable: true,
        width: "130px",
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: true,
    },
]


export const fetchDepartments = async () => {
  let departments
  try {
    const response = await axios.get(`${API_BASE_URL}/api/department`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return departments;
}


// employees for salary form 
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/employee/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return employees;
}



export const EmployeeButtons = ({ Id, refreshData }) => {
  const navigate = useNavigate();

   const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/api/employee/${Id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert("Employee deleted successfully");
        if (refreshData) refreshData();  // refresh list after deletion
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex" style={{ gap: '12px' }}>
      <button className="bg-teal-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >View</button>

      <button className="bg-blue-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >Edit</button>

      <button className="bg-yellow-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >Salary</button>

      <button className="bg-red-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >Leave</button>

      <button className="bg-red-800 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
        onClick={handleDelete}
      >Delete</button>
    </div>
  );
};