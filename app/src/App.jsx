import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthLayout, ProtectedRoute } from "./layouts"
import {
	Login,
	Register,
	ResetPassword,
	NewPassword,
	ConfirmAccount,
	Projects
} from "./pages"
import { AuthProvider } from "./context/AuthProvider"

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path="registrar" element={<Register />} />
						<Route
							path="olvide-password"
							element={<ResetPassword />}
						/>
						<Route
							path="olvide-password/:token"
							element={<NewPassword />}
						/>
						<Route
							path="confirmar/:id"
							element={<ConfirmAccount />}
						/>
					</Route>
					<Route path="/proyectos" element={<ProtectedRoute />}>
						<Route index element={<Projects />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
