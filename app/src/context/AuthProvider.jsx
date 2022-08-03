import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const authUser = async () => {
            
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const { data } = await clientAxios('/users/account', config)
                setAuth(data)
                // navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }  finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext