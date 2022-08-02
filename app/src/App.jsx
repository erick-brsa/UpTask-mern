import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthLayout, ProtectedRoute } from "./layouts"
import {
	Login,
	Register,
	ResetPassword,
	NewPassword,
	ConfirmAccount,
	Projects,
	NewProject,
	NewMember,
	EditProject,
	Project,
} from "./pages"
import { AuthProvider } from "./context/AuthProvider"
import { ProjectsProvider } from "./context/ProjectsProvider"

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProjectsProvider>
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
							<Route path="crear-proyecto" element={<NewProject />} />
							<Route path="nuevo-colaborador/:id" element={<NewMember />} />
							<Route path="editar/:id" element={<EditProject />} />
							<Route path=":id" element={<Project />} />
						</Route>
					</Routes>
				</ProjectsProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
