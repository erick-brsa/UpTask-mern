import { formatDate } from "../helpers"
import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"

export const Task = ({ task }) => {

    const { _id, name, description, priority, dateDelivery, status, completed  } = task

    const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProjects()
    const admin = useAdmin()
    
	return (
		<div className="border-b p-5 flex  justify-between items-center">
			<div>
                <p className="mb-2 text-xl font-bold">Nombre: {name}</p>
                <p className="mb-2 text-md text-gray-400 font-semibold uppercase">Descripción: {description}</p>
                <p className="mb-2 text-md font-semibold">Fecha de entrega: {formatDate(dateDelivery)}</p>
                <p className="mb-2 text-gray-600">Prioridad: {priority}</p>
                {completed && <p className="mb-2 text-xs bg-green-600 p-1.5 rounded-lg text-white w-fit font-semibold">
                    Completado por:
                    {''}{task.completed.name}
                </p>}
            </div>
            <div className="flex flex-col xl:flex-row gap-2">
                {admin && (
                    <button
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                        onClick={() => handleModalEditTask(task)}
                    >
                        Editar
                    </button>
                )}
                <button
                    className={`${status === true  ? ' bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold rounded-lg`}
                    onClick={() => completeTask(_id)}
                    >
                        {status === true ? 'Completa' : 'Incompleta'}
                </button>
                {admin && (
                    <button
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
                        onClick={() => handleModalDeleteTask(task)}
                    >
                        Eliminar
                    </button>
                )}
            </div>
		</div>
	)
}
