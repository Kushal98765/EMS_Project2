import React from 'react'
import { FaBuilding, FaCalendarAlt, FaTachometerAlt, FaUsers, FaCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import '../../App.css'
import { useAuth } from '../../context/authContext'


const Sidebar = () => {
  const {user} = useAuth();

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
          <NavLink to="/employee-dashboard" className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle} end>
            <FaTachometerAlt />
            <span style={spanStyle}>Dashboard</span>
          </NavLink>
          <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaUsers />
            <span style={spanStyle}>My Profile</span>
          </NavLink>
          <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaBuilding />
            <span style={spanStyle}>Leaves</span>
          </NavLink>
          <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaCalendarAlt />
            <span style={spanStyle}>Salary</span>
          </NavLink>
          <NavLink to="/employee-dashboard/setting"  className={({isActive}) => `${isActive ? "bg-sky-300 " : " "} {navStyle}`} style={navStyle}>
            <FaCog />
            <span style={spanStyle}>Settings</span>
          </NavLink>
        </div>
      </div >
    </div >
  )
}

export default Sidebar;

