import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Summary = () => {
    const { user } = useAuth();
    return (
        <div style={{padding:'24px'}}>
            <div className='rounded flex bg-white'>
                <div className={`text-3xl flex justify-center items-center bg-sky-300 text-white`} style={{ padding: '0px 16px' }}>
                    <FaUser />
                </div>
                <div style={{ paddingLeft: '16px', padding: '4px 0px', marginLeft: '10px' }}>
                    <p className='text-lg font-semibold'>Welcome Back</p>
                    <p className='text-xl font-bold'>{user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Summary;
