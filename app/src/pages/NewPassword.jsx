import { Link } from "react-router-dom";

export const NewPassword = () => {
  return (
    <>
			<h1 className="text-sky-600 font-black text-6xl">
				Reestablece tu contraseña y no pierdas acceso a tus {""}
				<span className="text-slate-700">proyectos</span>
			</h1>
			<form className="bg-white shadow rounded-lg px-10 py-5 my-10">
				<div className="my-5">
					<label
						htmlFor="password"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Nueva contraseña
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Escribe tu nueva contraseña"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
					/>
				</div>
				<input
					type="submit"
					value="Guardar nuevo password"
					className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mt-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
		</>
  )
}
