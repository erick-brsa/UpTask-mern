import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Alert } from "../components"
import clientAxios from '../config/clientAxios'

export const NewPassword = () => {

	const [password, setPassword] = useState('')
	const [validToken, setValidToken] = useState(false)
	const [alert, setAlert] = useState({})
	const [updatedPassword, setUpdatedPassword] = useState(false)

	const { token } = useParams()

	useEffect(() => {
		const compareToken = async () => {
			try {
				await clientAxios(`/users/reset-password/${token}`)
				setValidToken(true)
			} catch (error) {
				setAlert({
					message: error.response.data.message,
					error: true
				})
			}
		}
		compareToken()
	}, [])

	const { message } = alert

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password.length < 6) {
			setAlert({
				message: 'La contraseña debe tener al menos 6 caracteres',
				error: true
			})
		}

		try {
			const url = `/users/reset-password/${token}`
			const { data } = await clientAxios.post(url, { password })
			setUpdatedPassword(true)
			setPassword('')
			setAlert({
				message: data.message,
				error: false
			})
		} catch (error) {
			setAlert({
				message: error.response.data.message,
				error: true
			})
		}
	}
	
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">
				Reestablece tu contraseña y no pierdas acceso a tus {""}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{message && <Alert alert={alert} />}

			{validToken && (
				<form
				 	className="bg-white shadow rounded-lg px-10 py-5 my-10"
					onSubmit={handleSubmit}
				>
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					value="Guardar nuevo password"
					className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mt-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>
			)}
			<nav className="text-center">
					{updatedPassword ? (
						<Link
							className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
							to="/"
						>
							Iniciar sesión
						</Link>
					) : (
						<Link
							className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
							to="/"
						>
							Volver
						</Link>
					)}
				</nav>
		</>
	)
}
