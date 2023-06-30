import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { ApiClient } from '../lib/api/api'
import { useEffect } from 'react'

interface LoginProps {
	c: ApiClient
}

function Login({ c }: LoginProps) {
	const navigate = useNavigate()

	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await c.getLoggedIn()
			if (!res.ok) console.error('failed to check')
			else if (res.data.isLoggedIn) navigate('/dashboard')
		}
		checkLoggedIn()
	}, [c, navigate])

	return (
		<div className="min-h-screen w-screen bg-dark-1">
			<div className="h-32"></div>
			<LoginForm c={c} />
			<div className="h-4"></div>
			<div className="w-full max-w-md mx-auto text-white/70 font-light">
				Don't have an account?
				<Link
					to="/sign_up"
					className="text-blue-500 active:text-blue-600 font-normal ml-2"
				>
					Create an account
				</Link>
			</div>
			<div className="h-5"></div>
		</div>
	)
}

export default Login
