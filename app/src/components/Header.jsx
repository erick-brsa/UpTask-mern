import { Link } from "react-router-dom"
import { Browser } from "./Browser"
import useProjects from "../hooks/useProjects"
import useAuth from "../hooks/useAuth"

export const Header = () => {	
	
	const { closeSessionAuth } = useAuth()
	const { handleBrowser, closeSessionProjects } = useProjects()

	const handleCloseSession = () => {
		closeSessionAuth()
		closeSessionProjects()
		localStorage.removeItem('token')
	}

	return (
		<header className="px-4 py-5 bg-white border-b">
			<div className="md:flex md:justify-between items-center">
				<h2 className="text-4xl font-black text-center text-sky-600 mb-5 md:mb-0">
					UpTask
				</h2>
				<div className="flex flex-col md:flex-row items-center gap-4">
					<button
						type="button"
						className="font-bold uppercase"
						onClick={handleBrowser}
					>
						Buscar Proyecto
					</button>
					<Link 
						to="/proyectos"
						className="font-bold uppercase"
					>
						Proyectos
					</Link>
					<button
						type="button"
						className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
						onClick={handleCloseSession}
					>
						Cerrar sesión
					</button>
					<Browser />
				</div>
			</div>
		</header>
	)
}
