import { ErrorMessage, Field, useField } from 'formik'

interface FormikInputProps {
	type?: string
	placeholder?: string
	formikName: string
}

const errorInputClass =
	'w-full py-4 px-6 text-white placeholder:text-white/50 bg-whit-2 border-whit-4 border rounded-xl text-sm focus:outline-none ring-2 ring-red-400'
const inputClass =
	'w-full py-4 px-6 text-white placeholder:text-white/50 bg-whit-2 border-whit-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

const FormikInput = ({
	type = 'text',
	placeholder = '',
	formikName,
}: FormikInputProps) => {
	const [, data] = useField(formikName)
	const hasErr = data.touched && data.error !== undefined

	return (
		<div className="relative w-full">
			<Field
				className={hasErr ? errorInputClass : inputClass}
				type={type}
				placeholder={placeholder}
				name={formikName}
			/>
			<div className="absolute -bottom-5 text-xs text-red-400 w-full">
				<ErrorMessage name={formikName} />
			</div>
		</div>
	)
}

export default FormikInput
