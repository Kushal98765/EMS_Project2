import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';


const EmployeeDashboard = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div style={{flexGrow: 1, marginLeft:'256px', backgroundColor: 'whitesmoke', height: '100vh'}}>
        <Navbar />
        <Outlet />
        </div>
      </div>
  )
}

export default EmployeeDashboard;
