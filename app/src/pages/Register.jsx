import { Link } from "react-router-dom"
import { useState } from 'react'
import { Alert } from "../components/Alert"
import axios from 'axios'

export const Register = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [alert, setAlert] = useState({})
		
	const handleSubmit = async (e) => {
		e.preventDefault()
		if([name, email, password, passwordConfirmation].includes('')) {
			setAlert({
				message: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}

		if(password !== passwordConfirmation) {
			setAlert({
				message: 'Las contraseñas no coinciden',
				error: true
			})
			return
		}

		if (password.length < 6) {
			setAlert({
				message: 'La contraseña debe tener al menos 6 caracteres',
				error: true
			})
			return
		}

		setAlert({})

		try {
			const response = await axios.post('http://localhost:4000/api/users', {
				name, email, password
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}

		console.log("Creando usuario...")
	}

	const { message } = alert

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">
				Crea una cuenta y administra tus {""}
				<span className="text-slate-700">proyectos</span>
			</h1>
			
			{message && <Alert alert={alert} />}
			<form 
				className="bg-white shadow rounded-lg px-10 py-5 my-10"
				onSubmit={handleSubmit}
			>
				<div className="my-5">
					<label
						htmlFor="name"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Nombre
					</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Nombre"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
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
						placeholder="Correo electronico"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
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
						placeholder="Contraseña"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="my-5">
					<label
						htmlFor="confirm-password"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Repetir Contraseña
					</label>
					<input
						type="password"
						name="confirm-password"
						id="confirm-password"
						placeholder="Repetir Contraseña"
						className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					value="Crear cuenta"
					className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mt-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>

			<nav className="text-center">
				<Link
					className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
					to="/"
				>
					¿Ya tienes una cuenta? Inicia sesión
				</Link>
			</nav>
		</>
	)
}
