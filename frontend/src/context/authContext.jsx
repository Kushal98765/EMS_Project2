import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react'
import { API_BASE_URL } from '../../utils';

const userContext = createContext()

const authContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token')
                if(token){
                    const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
                        headers: {
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    if (response.data.success) {
                        setUser(response.data.user)
                    }
                } else {
                    setUser(null)
                    setLoading(false)
                }
                
            } catch (error) {
                console.log(error)
                if (error.response && !error.response.data.error) {
                    setUser(null)
                }
            } finally{
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token");
    }

    return (
        <div>
            <userContext.Provider value={{ user, login, logout, loading }}>
                {children}
            </userContext.Provider>
        </div>
    )
}


export const useAuth = () => useContext(userContext)
export default authContext;

