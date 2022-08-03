import { useState } from "react"
import { Alert } from "./Alert"
import useProjects from "../hooks/useProjects"

export const FormMember = () => {

    const [email, setEmail] = useState("")

    const { showAlert, alert, submitMember } = useProjects()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            showAlert({
                message: "El campo email es obligatorio",
                error: true
            })
            return
        }
        submitMember(email)
        setEmail("")
    }

    const { message } = alert

    return (
		<form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        >
            {message && <Alert alert={alert} />}
            <div className="mb-5">
                <label 
                    htmlFor="email" 
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Email colaborador
                </label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email del usuario" 
                    className="border-2 w-full p-2 placeholder:text-gray-400 rounded-md "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <input 
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-sm w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded"
                value="Buscar colaborador"
            />
		</form>
	)
}
