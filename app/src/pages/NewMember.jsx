import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Alert, FormMember } from "../components"
import useProjects from "../hooks/useProjects"

export const NewMember = () => {	

    const { getProject, project, loading, member, addMember, alert } = useProjects()

    const { id } = useParams()

    useEffect(() => {
        getProject(id)
    }, [])

    if (!project?._id) return (
        <div className="w-full md:w-1/2">
            <Alert alert={alert} />
        </div>
    )

    return (
		<>
            <h1 className="text-4xl font-black">Añadir colaborador(a) al Proyecto: {project.name}</h1>
            <div className="mt-10 flex justify-center w-full">
                <FormMember />
            </div>
            {loading ? null : member?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 w-full md:w-1/2 shadow">
                        <h2 className="text-center mb-10 text-2xl font-bold">Resultado: </h2>
                            <div className="flex justify-between items-center">
                                {member.name}
                                <button
                                    className="bg-slate-500 hover:bg-slate-600 transition-colors px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                                    onClick={() => addMember({email: member.email})}    
                                >
                                    Agregar al proyecto
                                    </button>
                            </div>    
                    </div>
                </div>
            )}
		</>
	)
}
