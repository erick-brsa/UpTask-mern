import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FormMember } from "../components"
import useProjects from "../hooks/useProjects"

export const NewMember = () => {	

    const { getProject, project, loading } = useProjects()

    const { id } = useParams()

    useEffect(() => {
        getProject(id)
    }, [])

    if (loading) return null
    
    return (
		<>
            <h1 className="text-4xl font-black">Añadir colaborador(a) al Proyecto: {project.name}</h1>
            <div className="mt-10 flex justify-center">
                <FormMember />
            </div>
		</>
	)
}
