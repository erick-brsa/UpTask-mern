import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalFormTask, setModalFormTask] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const getProjects = async () => {
            try {
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

                const { data } = await clientAxios('/projects', config)
                setProjects(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProjects()
    }, [])

    const showAlert = (alert) => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const submitProject = async (project) => {
        if (project.id) {
            await updateProject(project)
        } else {
            await createProject(project)
        }
    }

    const updateProject = async (project) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config)
            const updatedProject = projects.map(p => p._id === data._id ? data : p)
            setProjects(updatedProject)

            setAlert({
                message: 'Proyecto actualizado',
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

    const createProject = async (project) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/projects', project, config)

            setProjects([...projects, data])

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

    const getProject = async (id) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios(`/projects/${id}`, config)
            setProject(data)
        } catch (error) {
            navigate('/proyectos')
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }       

            const { data } = await clientAxios.delete(`/projects/${id}`, config)
            const updatedProjects = projects.filter(p => p._id !== data._id)
            setProjects(updatedProjects)

            setAlert({
                message: 'Proyecto eliminado',
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

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
    }

    const submitTask = async (task) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }       

            const { data } = await clientAxios.post('/tasks', task, config)

            // Agrega la tarea al state
            const updatedProject = {...project}
            updatedProject.tasks = [...project.tasks, data] 
            setProject(updatedProject)
            setAlert({})
            setModalFormTask(false)
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
                submitProject,
                project,
                getProject,
                loading,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsContext