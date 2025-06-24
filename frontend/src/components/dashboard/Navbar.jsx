import React from 'react'
import { useAuth } from '../../context/authContext'
const Navbar = () => {
    const { user, logout } = useAuth()

    return (
        <>
            <div style={{ display: 'flex', alignItems:'center', color:'white', justifyContent: 'space-between', height: '48px', backgroundColor: '#7dd3fc', padding: '0px 20px' }}>
                <p>Welcome {user.name}</p>           
                    <button className='logout-button bg-teal-700 hover:bg:teal-800' style={{padding: '4px 16px', color:'white', border:'none', cursor:'pointer', borderRadius: '4px'}} onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Navbar;
