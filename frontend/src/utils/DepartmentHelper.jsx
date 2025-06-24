import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_BASE_URL } from "../../utils"

export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: 'Action',
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    onDepartmentDelete();
                }
            } catch (error) {
                console.error("Delete error:", error.response?.data || error.message);
                // if (error.response && !error.response.data.success) {
                //     alert(error.response.data.error)
                // }
            }
        }
    }
    return (
        <div className="flex" style={{ gap: '12px' }}>
            <button className="bg-teal-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }}
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="bg-red-600 text-white" style={{ padding: '4px 12px', cursor: 'pointer' }} onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}