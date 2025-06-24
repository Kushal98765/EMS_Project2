import React from 'react'
import { FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaTachometerAlt, FaUsers, FaCog, FaRegCalendarAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import '../../App.css'
import {AiOutlineFileText} from 'react-icons/ai'


const AdminSidebar = () => {

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '5px',
    padding: '.625rem 1rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    color: 'inherit'
  };

  const spanStyle = {
    marginLeft: '0.5rem',
  }
  return (
    <div>
      <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='mt-20 bg-sky-300 h-12 flex items-center justify-center'>
          <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
        </div>

        <div style={{ padding: '0 16px' }}>
          <NavLink to="/admin-dashboard" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle} end>
            <FaTachometerAlt />
            <span style={spanStyle}>Dashboard</span>
          </NavLink>
          <NavLink to="/admin-dashboard/employees" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}
          >
            <FaUsers />
            <span style={spanStyle}>Employee</span>
          </NavLink>
          <NavLink to="/admin-dashboard/departments" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaBuilding />
            <span style={spanStyle}>Department</span>
          </NavLink>
          <NavLink to="/admin-dashboard/leaves" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaCalendarAlt />
            <span style={spanStyle}>Leave</span>
          </NavLink>
          <NavLink to="/admin-dashboard/salary/add" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaMoneyBillWave />
            <span style={spanStyle}>Salary</span>
          </NavLink>

          <NavLink to="/admin-dashboard/attendence" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaRegCalendarAlt />
            <span style={spanStyle}>Attendence</span>
          </NavLink>

          <NavLink to="/admin-dashboard/attendence-report" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <AiOutlineFileText />
            <span style={spanStyle}>Attendence Report</span>
          </NavLink>

          <NavLink to="/admin-dashboard/setting" style={navStyle}>
            <FaCog />
            <span style={spanStyle}>Settings</span>
          </NavLink>
        </div>
      </div >
    </div >
  )
}

export default AdminSidebar;

