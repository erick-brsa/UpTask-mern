import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layouts'
import { Login, Register, ResetPassword, NewPassword, ConfirmAccount} from './pages'

const App = () => {

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Register />} />
          <Route path="olvide-password" element={<ResetPassword />} />
          <Route path="olvide-password/:token" element={<NewPassword />} />
          <Route path="confirmar/:id" element={<ConfirmAccount />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App