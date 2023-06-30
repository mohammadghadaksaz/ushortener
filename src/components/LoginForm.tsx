import { Form, Formik } from 'formik'
import * as yup from 'yup'
import FormikInput from './FormikInput'
import { ApiClient } from '../lib/api/api'
import { useEffect, useState } from 'react'
import AlertBox from './AlertBox'
import { useNavigate } from 'react-router-dom'

interface FormValues {
	username: string
	password: string
}

const initialValues = { username: '', password: '' }
const validationSchema = yup.object({
	username: yup.string().required('username is required'),
	password: yup
		.string()
		.min(8, 'password must be at least 8 characters')
		.required('password is required'),
})

interface LoginFormProps {
	c: ApiClient
}

const LoginForm = ({ c }: LoginFormProps) => {
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitResult, setSubmitResult] = useState<'error' | 'info'>('error')
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams(document.location.search)
		const activatedParam = params.get('activated')
		if (activatedParam === '1') {
			setSubmitResult('info')
			setSubmitMessage('Email activated successfully.')
		}
	}, [])

	const onSubmit = async (values: FormValues) => {
		const result = await c.login(values)
		localStorage.setItem('username', values.username)
		if (result.ok) navigate('/dashboard')
		else {
			setSubmitResult('error')
			setSubmitMessage(result.error)
		}
	}

	return (
		<div className="w-full max-w-md mx-auto">
			{submitMessage !== '' && <AlertBox type={submitResult} text={submitMessage} />}
			<div className="h-4"></div>
			<div className="w-full bg-dark-2 border-white/5 border py-9 px-11 rounded-3xl">
				<h1 className="text-white font-semibold text-2xl">
					<span className="text-blue-500">/</span>
					Login
				</h1>
				<div className="h-8"></div>
				<Formik
					validateOnMount={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isValid }) => (
						<Form>
							<div className="flex flex-col space-y-7">
								<FormikInput type="text" formikName="username" placeholder="username" />
								<FormikInput
									type="password"
									formikName="password"
									placeholder="password"
								/>
							</div>
							<div className="h-10"></div>
							<button
								disabled={!isValid}
								className="bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-blue-500 block w-full  py-5 font-bold text-white rounded-2xl hover:bg-blue-600 transition-all text-center focus:outline-none focus:ring-4 focus:ring-blue-500/20"
								type="submit"
							>
								Login
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default LoginForm
