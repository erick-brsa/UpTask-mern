import { Link } from 'react-router-dom'

export const PreviewProject = ({ project }) => {
    const { _id, name, client } = project
	return (
		<div className='border-b p-5 flex items-center'>
            
			<p className='flex-1 font-medium'>
                {name}
                <span className="text-sm text-gray-400 uppercase ml-2">
                    {''}{client}
                </span>
            </p>
            <Link 
                to={`/proyectos/${_id}`}
                className="text-gray-600 hover;text-gray-8000 uper text-sm font-bold"
            >
                Ver
            </Link>
		</div>
	)
}
