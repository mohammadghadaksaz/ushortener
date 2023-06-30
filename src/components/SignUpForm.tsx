import { Form, Formik } from 'formik'
import * as yup from 'yup'
import FormikInput from './FormikInput'
import { ApiClient } from '../lib/api/api'
import { useState } from 'react'
import AlertBox from './AlertBox'

interface FormValues {
	username: string
	email: string
	password: string
	passwordConfirm: string
}

const initialValues = { email: '', username: '', password: '', passwordConfirm: '' }
const validationSchema = yup.object({
	email: yup.string().email('invalid email format').required('email is required'),
	username: yup.string().required('username is required'),
	password: yup
		.string()
		.min(8, 'password must be at least 8 characters')
		.required('password is required'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'passwords do not match')
		.required('repeat password is required'),
})

interface SignUpFormOptions {
	c: ApiClient
}

const SignUpForm = ({ c }: SignUpFormOptions) => {
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitResult, setSubmitResult] = useState<'error' | 'info'>('error')

	const onSubmit = async (values: FormValues) => {
		const result = await c.signUp(values)
		if (result.ok) {
			setSubmitResult('info')
			setSubmitMessage(
				`Signed up successfully! Activation link was sent to ${values.email}.`
			)
		} else {
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
					SignUp
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
								<FormikInput type="email" formikName="email" placeholder="email" />
								<FormikInput
									type="password"
									formikName="password"
									placeholder="password"
								/>
								<FormikInput
									type="password"
									formikName="passwordConfirm"
									placeholder="confirm password"
								/>
							</div>
							<div className="h-10"></div>
							<button
								disabled={!isValid}
								className="bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-blue-500 block w-full  py-5 font-bold text-white rounded-2xl hover:bg-blue-600 transition-colors text-center focus:outline-none focus:ring-4 focus:ring-blue-500/20"
								type="submit"
							>
								Create an account
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default SignUpForm
