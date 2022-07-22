import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Alert } from '../components'
import clientAxios from '../config/clientAxios'

export const ResetPassword = () => {

  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === '' || email.length < 5) {
      setAlert({
        message: 'El correo electrónico es requerido',
        error: true
      })
      return
    }

    try {
      const { data } = await clientAxios.post(`/users/reset-password`, { email })
      console.log(data)
      setAlert({
        message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña',
        error: false
      })
      setEmail('')
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
      <h1 className='text-sky-600 font-black text-6xl '>
        Recupera tu acceso y no pierdas tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {message && <Alert alert={alert} />}

      <form className='bg-white shadow rounded-lg px-10 py-5 my-10'
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
            placeholder='Ingresa tu correo'
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input 
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mt-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="text-center">
        <Link 
          className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
          to="/"
        >
          Regresar
        </Link>
        <Link 
          className="block my-5 text-center text-slate-500 uppercase font-semibold hover:underline"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}
