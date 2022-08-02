import { Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Sidebar, Header } from "../components"

export const ProtectedRoute = () => {

	const { auth, loading } = useAuth()
	const navigate = useNavigate()

	if (loading) {
		return null
	}

	if (!auth._id) {
		navigate("/")
	}

	return (
		<>
			<div className="bg-gray-100">
				<Header />
				<div className="md:flex md:min-h-screen">
					<Sidebar />
					<main className="flex-1 p-10">
            			<Outlet />
					</main>
				</div>
			</div>	
		</>
	)
}
