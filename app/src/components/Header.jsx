import { Link } from "react-router-dom"

export const Header = () => {	return (
		<header className="px-4 py-5 bg-white border-b">
			<div className="md:flex md:justify-between items-center">
				<h2 className="text-4xl font-black text-center text-sky-600">
					UpTask
				</h2>
				<input 
					type="search" 
					placeholder="Buscar Proyecto"
					className="rounded-lg lg:w-96 block border p-2"
				/>
				<div className="flex items-center gap-4">
					<Link 
						to="/proyectos"
						className="font-bold uppercase"
					>
						Proyectos
					</Link>
					<button
						type="button"
						className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
					>
						Cerrar sesión
					</button>
				</div>
			</div>
		</header>
	)
}
