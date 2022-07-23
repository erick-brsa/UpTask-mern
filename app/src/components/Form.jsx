import { useState } from 'react'
import useProjects from '../hooks/useProjects'
import { Alert } from './Alert'

export const Form = () => {	

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [dateDelivery, setDateDelivery] = useState('')
    const [client, setClient] = useState('')

    const { showAlert, alert } = useProjects()

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([name, description, dateDelivery, client].includes('')) {
            showAlert({
                message: 'Todos los campos son obligatorios',
                error: true,
            })
        }
    }

    const { message } = alert
    
    return (
		<form 
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >

            {message && <Alert alert={alert} />}    

			<div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="name"
                >
                    Nombre del Proyecto
                </label>
                <input
                    className="b-2 w-full p-2 placeholder:text-gray-400 rounded-md border focus:outline-blue-400"
                    placeholder="Nombre del Proyecto"
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
			<div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="description"
                >
                    Descripción
                </label>
                <textarea
                    className="b-2 w-full p-2 placeholder:text-gray-400 rounded-md border focus:outline-blue-400"
                    placeholder="Descripción del Proyecto"
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
			<div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="date-delivery"
                >
                    Fecha de Entrega
                </label>
                <input
                    className="b-2 w-full p-2 placeholder:text-gray-400 rounded-md border focus:outline-blue-400"
                    type="date"
                    id="date-delivery"
                    value={dateDelivery}
                    onChange={e => setDateDelivery(e.target.value)}
                />
            </div>
			<div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="client"
                >
                    Nombre del cliente
                </label>
                <input
                    className="b-2 w-full p-2 placeholder:text-gray-400 rounded-md border focus:outline-blue-400"
                    type="text"
                    id="client"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>
            <input
                type="submit"
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                value="Crear Proyecto"
            />
		</form>
	)
}
