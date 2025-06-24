import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: 'Emp ID',
        selector: (row) => row.employeeId,
        width: "100px",
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        width: "90px",
    },
    {
        name: 'Leave Type',
        selector: (row) => row.leaveType,
        width: "150px",
    },
    {
        name: 'Department',
        selector: (row) => row.department,
        width: "180px",
    },
    {
        name: 'Days',
        selector: (row) => row.days,
        width: "100px"
    },
    {
        name: 'Status',
        selector: (row) => row.status,
        width: "120px",
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: true,
    },
];


export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

 
  return (
    <div>
      <button
        className="bg-teal-500 rounded text-white hover:bg-teal-600"
        style={{padding:'4px 16px', cursor:'pointer'}}
        onClick={() => handleView(Id)}
      >View</button>
    </div>
  )
}