import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Client } from './lib/api/api'
import SignUp from './pages/SignUp'

const baseApiURL = 'http://localhost:8080/api/'

const App = () => {
	const c = Client(baseApiURL)
	const router = createBrowserRouter([
		{ path: '/', element: <Login c={c} /> },
		{ path: '/sign_up', element: <SignUp c={c} /> },
		{ path: '/dashboard', element: <Dashboard c={c} /> },
	])
	return <RouterProvider router={router} />
}

export default App
