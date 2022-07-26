import { PreviewProject } from "../components/PreviewProject"
import useProjects from "../hooks/useProjects"

export const Projects = () => {	

	const { projects } = useProjects()

	return (
		<>
			<h1 className="text-4xl font-black">Proyectos</h1>
			<div className="bg-white shadow mt-10 rounded-lg">
				{projects.length ? projects.map(project => (
					<PreviewProject
						key={project._id} 
						project={project}
					/>
				)) : <p className="text-gray-600 uppercase p-5 text-center">No hay proyectos</p>}
			</div>
		</>
	)
}
