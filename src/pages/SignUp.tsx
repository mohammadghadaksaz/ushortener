import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { ApiClient } from '../lib/api/api'
import { useEffect } from 'react'

interface SignUpProps {
	c: ApiClient
}

function SignUp({ c }: SignUpProps) {
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
			<SignUpForm c={c} />
			<div className="h-4"></div>
			<div className="w-full max-w-md mx-auto text-white/70 font-light">
				Already have an account?
				<Link to="/" className="text-blue-500 active:text-blue-600 font-normal ml-2">
					Login
				</Link>
			</div>
		</div>
	)
}

export default SignUp
