import { Alert } from '../components/Alert'
import { Form } from '../components/Form'
import useProjects from '../hooks/useProjects'

export const NewProject = () => {	
    const { alert } = useProjects()
    const { message } = alert
    return (
		<>
			<h1 className="text-4xl font-black">Nuevo Proyecto</h1>
			<div className="mt-10 mx-auto">
				<div className='md:w-1/2 mx-auto'>
					{message && <Alert alert={alert} />}   
				</div>
				<Form />
			</div>
		</>
	)
}