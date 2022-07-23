import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/clientAxios'

const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
    
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState(false)

    const showAlert = (alert) => {
        setAlert(alert)
    }

    return (
        <ProjectsContext.Provider 
            value={{
                projects,
                showAlert
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext