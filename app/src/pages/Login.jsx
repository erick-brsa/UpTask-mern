import { Link } from "react-router-dom"
import { useState } from "react"
import { Alert } from "../components"
import clientAxios from "../config/clientAxios"
import useAuth from "../hooks/useAuth"

export const Login = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [alert, setAlert] = useState({})

	const { setAuth, loading } = useAuth()

	if (loading) {
		return (
			<div></div>
		)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if ([email, password].includes("")) {
			setAlert({
				message: "Todos los campos son obligatorios",
				error: true
			})
			return
		}
		try {
			const { data } = await clientAxios.post("/users/login", { 
				email, 
				password 
			})
			localStorage.setItem("token", data.token)
			setAuth(data)
			setAlert({})
			setEmail("")
			setPassword("")
		} catch (error) {
			setAlert({
				message: error.response.data.message,
				error: true
			})
		}
	}

	const { message } = alert

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Inicia sesión y administra tus {""}
				<span className="text-slate-700">Proyectos</span>
			</h1>

			{message && <Alert alert={alert} />}
			
			<form
				className="bg-white shadow rounded-lg px-10 py-5 my-10"
				onSubmit={handleSubmit}
			>
				<div className="my-5">
					<label
						htmlFor="email"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Correo electronico
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Ingresa tu correo"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="my-5">
					<label
						htmlFor="password"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Contraseña
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Ingresa tu contraseña"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					value="Iniciar sesión"
					className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mt-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>

			<nav className="lg:flex lg:justify-between">
				<Link
					className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
					to="/registrar"
				>
					¿No tienes una cuenta? Regístrate
				</Link>
				<Link
					className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
					to="/olvide-password"
				>
					Olvidé mi contraseña
				</Link>
			</nav>
		</>
	)
}
