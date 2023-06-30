import { Formik, Form } from 'formik'
import FormikInput from './FormikInput'
import * as yup from 'yup'

const initialValues = { url: '' }
const validationSchema = yup.object({
	url: yup.string().url('invalid url format').required('url is required'),
})

interface FormValues {
	url: string
}

interface AddURLFormProps {
	hideForm: () => unknown
	addURL: (URL: string) => unknown
}

const AddURLForm = ({ hideForm, addURL }: AddURLFormProps) => {
	const onSubmit = ({ url }: FormValues) => {
		addURL(url)
		hideForm()
	}

	return (
		<>
			<div
				onClick={hideForm}
				className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 backdrop-blur-md z-10"
			></div>
			<div className="fixed w-full right-0 left-0 top-40 max-w-md bg-dark-2 mx-auto border-white/5 border py-9 px-11 rounded-3xl z-20">
				<h1 className="text-white font-semibold text-xl">Add New URL</h1>
				<div className="h-8"></div>
				<Formik
					validateOnMount={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isValid }) => (
						<Form>
							<FormikInput
								type="text"
								formikName="url"
								placeholder="https://google.com/"
							/>
							<div className="h-10"></div>
							<button
								disabled={!isValid}
								className="bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-blue-500 block w-full  py-5 font-bold text-white rounded-2xl hover:bg-blue-600 transition-colors text-center focus:outline-none focus:ring-4 focus:ring-blue-500/20"
								type="submit"
							>
								Add
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	)
}

export default AddURLForm
