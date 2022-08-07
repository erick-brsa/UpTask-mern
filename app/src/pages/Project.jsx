import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Alert, Member, ModalDeleteMember, ModalDeleteTask, ModalFormTask, Task } from "../components"
import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"
import io from "socket.io-client"

let socket;

export const Project = () => {

	const { handleModalTask, alert, getProject, project, loading  } = useProjects()
	const admin = useAdmin()
	const { id } = useParams()

	useEffect(() => {
		getProject(id)
	}, [])

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL)
		socket.emit("openProject", id)
	}, [])

	useEffect(() => {
		socket.on('addedTask', (task) => {

		})
	})

	const { name } = project

	if (loading) {
		return null
	}

	const { message, error } = alert

	if (message && error) {
		return <Alert alert={alert} error />
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="font-black text-4xl">{name}</h1>
				{admin && (
					<div className="flex items-center gap-2 text-gray-400 hover:text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
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
				)}
			</div>
			{admin && (
				<button
					onClick={handleModalTask}
					type="button"
					className="flex gap-2 items-center justify-center text-sm mt-5 px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white hover:bg-sky-500 text-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clipRule="evenodd"
							/>
					</svg>
					Nueva tarea
				</button>
			)}

			<p className="font-bold text-xl mt-10 text-gray-800">Tareas del proyecto</p>

			<div className="bg-white shadow mt-10 rounded-lg">
				{project.tasks?.length ? (
					project.tasks.map((task) => (
						<Task key={task._id} task={task} />
					))
				) : (
					<p className="text-center my-5 p-10 font-semibold text-lg">
						No hay tareas en este proyecto
					</p>
				)}
			</div>

			<div>
				<div className="flex items-center justify-between mt-10">
					<p className="font-bold text-xl text-gray-800">Colaboradores</p>
					{admin && (
						<Link 
							to={`/proyectos/nuevo-colaborador/${project._id}`}
							className="text-gray-400 hover:text-gray-600 uppercase font-bold"
						>
							Añadir
						</Link>
					)}
				</div>

				<div className="bg-white shadow mt-10 rounded-lg">
					{project.members?.length ? (
						project.members.map((member) => (
							<Member key={member._id} member={member} />
							))
							) : (
								<p className="text-center my-5 p-10 font-semibold text-lg">
							No hay colaboradores en este proyecto
						</p>
					)}
				</div>
			</div>
			<ModalDeleteMember />
			<ModalFormTask />
			<ModalDeleteTask />
		</>
	)
}
