import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"

export const Project = () => {	

    const { id } = useParams()

    const { getProject, project, loading } = useProjects()

    useEffect(() => {
        getProject(id)
    }, [])

    const { name, description, tasks } = project

    if (loading) {
        return null
    }

    return (
		<div className="flex justify-between items-center">
            <h1 className="font-black text-4xl">{name}</h1>
			<div className="flex items-center gap-2 text-gray-400 hover:text-gray-600">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                    />
                </svg>
                <Link
                    to={`/proyectos/editar/${id}`}
                    className="uppercase font-bold"
                >
                    Editar
                </Link>
            </div>
		</div>
	)
}
