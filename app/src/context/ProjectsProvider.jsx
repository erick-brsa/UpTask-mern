import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
    
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})

    const navigate = useNavigate()

    const showAlert = (alert) => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const submitProject = async (project) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clientAxios.post('/projects', project, config)

            setAlert({
                message: 'Proyecto creado',
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/proyectos')
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProjectsContext.Provider 
            value={{
                alert,
                showAlert,
                projects,
                submitProject
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext