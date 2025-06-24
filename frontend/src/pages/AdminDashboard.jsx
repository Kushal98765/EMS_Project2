import React from 'react'
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {
  const { user } = useAuth()

  return (
      <div className='flex'>
        <AdminSidebar /> 
        <div style={{flexGrow: 1, marginLeft:'256px', backgroundColor: 'whitesmoke', height: '100vh'}}>
        <Navbar />
        <Outlet />
        </div>
      </div>

  )

}

export default AdminDashboard;
