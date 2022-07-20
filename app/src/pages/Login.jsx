import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Inicia sesión y administra tus {''}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form className='bg-white shadow rounded-lg px-10 py-5 my-10'>
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
            placeholder='Ingresa tu contraseña'
            className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-blue-400"
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
