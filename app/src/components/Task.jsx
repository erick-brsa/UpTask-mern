import { formatDate } from "../helpers"
import useProjects from "../hooks/useProjects"

export const Task = ({ task }) => {

    const { name, description, priority, dateDelivery, status  } = task

    const { handleModalEditTask, handleModalDeleteTask } = useProjects()
    
	return (
		<div className="border-b p-5 xl:flex justify-between items-center">
			<div>
                <p className="mb-2 text-xl font-bold">Nombre: {name}</p>
                <p className="mb-2 text-md text-gray-400 uppercase">Descripción: {description}</p>
                <p className="mb-2 text-md font-bold">Fecha de entrega: {formatDate(dateDelivery)}</p>
                <p className="mb-2 text-gray-600">Prioridad: {priority}</p>
            </div>
            <div className="flex gap-2">
                <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                    onClick={() => handleModalEditTask(task)}
                >
                    Editar
                </button>
                {status === true ? (
                    <button
                        className="bg-sky-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                    >
                        Completa
                    </button>
                ) : (
                    <button
                        className="bg-gray-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                    >
                        Incompleta
                    </button>
                )}
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                    onClick={() => handleModalDeleteTask(task)}
                >
                    Eliminar
                </button>
            </div>
		</div>
	)
}
