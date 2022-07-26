import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"

export const Project = () => {	

    const { id } = useParams()

    const { getProject } = useProjects()

    useEffect(() => {
        getProject(id)
    }, [])
    
    return (
		<>
			<div>Project</div>
		</>
	)
}
