import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const PreviewProject = ({ project }) => {
    
    const { auth } = useAuth()
    
    const { _id, name, client, creator } = project

	return (
		<div className='border-b p-5 flex flex-col md:flex-row items-center justify-between'>
            
            <div className="flex items-center gap-2">
                <p className='flex-1 font-medium'>
                    {name}
                    <span className="text-sm text-gray-400 uppercase ml-2">
                        {''}{client}
                    </span>
                </p>
                
                {auth._id !== creator && (
                    <p className='p-1.5 text-xs rounded-lg text-white bg-green-600 font-bold uppercase'>Colaborador</p>
                )}
            </div>

            <Link 
                to={`/proyectos/${_id}`}
                className="text-gray-600 hover;text-gray-8000 uper text-sm font-bold"
            >
                Ver
            </Link>
		</div>
	)
}
