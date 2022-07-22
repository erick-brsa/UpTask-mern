import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const ProtectedRoute = () => {

	const { auth, loading } = useAuth()

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<>
			{auth._id ? ('Autenticado') : <Navigate to="/" />}
            <Outlet />
		</>
	)
}
