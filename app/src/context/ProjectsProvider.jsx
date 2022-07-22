import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/clientAxios'

const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
    
    const [projects, setProjects] = useState([])    

    return (
        <ProjectsContext.Provider 
            value={{
                projects,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext