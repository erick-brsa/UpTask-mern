import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert, Form } from "../components"
import useProjects from "../hooks/useProjects"

export const EditProject = () => {

    const { id } = useParams()

    const { getProject, project, loading, alert } = useProjects()
    const { name } = project

    useEffect(() => {
        getProject(id)
    }, [])

    const { message } = useProjects()

    if (loading) return null

    return (
		<>
            <h1 className="font-black text-4xl">
                Editar proyecto: {name}
            </h1>
            <div className="mt-10 mx-auto">
                <div className='md:w-1/2 mx-auto'>
                    {message && <Alert alert={alert} />}   
                </div>
                <Form />
            </div>
		</>
	)
}
