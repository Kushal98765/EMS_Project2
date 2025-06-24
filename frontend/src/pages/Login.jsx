import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useAuth } from '../context/authContext';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // const {user} = useContext(userContext);

    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      if(response.data.success) {
        login(response.data.user)
        console.log(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role === "admin") {
          navigate('/admin-dashboard')
        } else {
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      // console.error("Login error:", error);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className='top'>
      <h2 style={{paddingTop:'50px'}}>Employee Management System</h2>
      <div className='login-card'>
      <h2 className='login'>Login</h2>
      {error && <p className='text-red-500 text-center'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form'>
            <label htmlFor="email">Email</label><br />
            <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form'>
            <label htmlFor="password">Password</label><br />
            <input type="password" placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='forgot-password'>
          <label className='condition'>
            <input type="checkbox" />
            <span>Remember me</span>
            </label>
            {/* <a href="#" className='forgot'>Forgot Password?</a> */}
        </div>

        <button className='btn' type='submit'>Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login;
