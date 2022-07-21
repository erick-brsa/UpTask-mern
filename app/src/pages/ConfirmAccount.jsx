import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Alert } from "../components"

export const ConfirmAccount = () => {
	const [alert, setAlert] = useState({})
	const [confirmAccount, setConfirmAccount] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		const confirm = async () => {
			try {
				// TODO: Mover hacia un cliente axios
				const url = `${
					import.meta.env.VITE_BACKEND_URL
				}/api/users/confirm/${id}`
				const { data } = await axios(url)

				setAlert({
					message: data.message,
					error: false
				})

				setConfirmAccount(true)
			} catch (error) {
				setAlert({
					message: error.response.data.message,
					error: true
				})
			}
		}
		confirm()
	}, [])

	const { message } = alert

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">
				Confirma tu cuenta y comienza a crear tus {""}
				<span className="text-slate-700">proyectos</span>
			</h1>
			<div className="bg-white mt-20 md:mt-10 px-5 py-10 rounded-xl shadow-lg">
				
				{message && <Alert alert={alert} />}

				<nav className="text-center">
					{confirmAccount ? (
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
			</div>
		</>
	)
}
