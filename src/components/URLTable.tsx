import { CopySimple } from 'phosphor-react'

export interface URLTableProps {
	items: ShortURLItem[]
	onCopy: (shortID: string) => unknown
}

export interface ShortURLItem {
	url: string
	shortID: string
	views: number
	createdAt: Date
}

const URLTable = ({ items, onCopy }: URLTableProps) => {
	const child =
		items.length === 0 ? (
			<EmptyState />
		) : (
			items.map((item, i) => (
				<TableItem
					onCopy={onCopy}
					key={item.shortID}
					item={item}
					isOdd={i % 2 === 1} // i starts from 0 and not 1
					isLast={i === items.length - 1}
				/>
			))
		)

	return (
		<div className="w-full bg-dark-2 mx-auto border-white/5 border rounded-3xl text-white text-sm">
			<div className="w-full min-w-[40px] py-5 rounded-t-3xl bg-[#1C1C1C] font-bold flex">
				<div className="flex-1 text-center"> URL </div>
				<div className="w-2/6 text-center"> Short URL </div>
				<div className="w-1/6 text-center"> Views </div>
				<div className="w-1/6 text-center"> Created At </div>
			</div>
			{child}
		</div>
	)
}

interface TableItemProps {
	item: ShortURLItem
	isOdd: boolean
	isLast: boolean
	onCopy: (shortID: string) => unknown
}

const TableItem = ({ item, isOdd, isLast, onCopy }: TableItemProps) => {
	let itemClassName =
		'url-item flex relative w-full py-3 border-b border-b-whit-4 hover:bg-white/5'
	if (isOdd) itemClassName += ' bg-whit-2'
	if (isLast) itemClassName += ' rounded-b-3xl'

	return (
		<div className={itemClassName}>
			<div className="flex-1 text-center text-ellipsis whitespace-nowrap overflow-hidden px-4">
				{item.url}
			</div>
			<div className="w-2/6 box-border text-center px-4">{item.shortID}</div>
			<div className="w-1/6 box-border text-center px-4">{item.views}</div>
			<div className="w-1/6 box-border text-center px-4">
				{formatDate(item.createdAt)}
			</div>
			<div className="absolute left-6 top-0 h-full items-center space-x-2 hidden url-item-buttons">
				<button
					onClick={() => onCopy(item.shortID)}
					className="bg-dark-2 border border-white/5 rounded-lg p-2 active:bg-neutral-950 transition-colors"
				>
					<CopySimple color="white" size={16} />
				</button>
				{/* <button className="bg-red-500 rounded-lg p-2">
					<TrashSimple color="white" size={16} />
				</button> */}
			</div>
		</div>
	)
}

const EmptyState = () => (
	<div className="text-center text-white py-10">
		<div className="text-7xl">(⌐▀͡ ̯ʖ▀)</div>
		<div className="h-6"></div>
		<div>You have no urls! Add a url to get started!</div>
	</div>
)

const formatDate = (date: Date) =>
	date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()

export default URLTable
