import { Info, WarningCircle } from 'phosphor-react'

export interface AlertBoxOptions {
	type: 'info' | 'error'
	text: string
}

function AlertBox(o: AlertBoxOptions) {
	const bgColor = o.type === 'info' ? 'bg-green-500' : 'bg-red-500'
	const icon =
		o.type === 'info' ? (
			<Info size={20} color="white" />
		) : (
			<WarningCircle size={20} color="white" />
		)
	return (
		<div
			className={`flex px-4 py-3 ${bgColor} rounded-2xl text-white text-sm items-center`}
		>
			<div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5">
				{icon}
			</div>
			<div className="w-3"></div>
			{o.text}
		</div>
	)
}

export default AlertBox
