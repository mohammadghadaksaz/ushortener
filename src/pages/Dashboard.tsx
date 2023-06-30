import { SignOut, UserCircle } from 'phosphor-react'
import URLTable from '../components/URLTable'
import AddURLForm from '../components/AddURLForm'
import { useEffect, useState } from 'react'
import { ApiClient } from '../lib/api/api'
import useSWR from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

interface DashboardProps {
	c: ApiClient
}

const Dashboard = ({ c }: DashboardProps) => {
	const navigate = useNavigate()
	const [showAddURLForm, setShowAddURLForm] = useState(false)
	const [showProfileList, setShowProfileList] = useState(false)
	const URLText = '<URL>'

	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await c.getLoggedIn()
			if (!res.ok) console.error('failed to check')
			else if (!res.data.isLoggedIn) navigate('/')
		}
		checkLoggedIn()
	}, [c, navigate])

	const getURLs = async () => {
		const res = await c.getURLs()
		if (!res.ok) throw new Error(res.error)
		return res.data.urls.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
	}

	const logout = async () => {
		const res = await c.logout()
		if (!res.ok)
			toast.error(`Error logging out: ${res.error}`, {
				position: 'bottom-right',
				theme: 'dark',
				hideProgressBar: true,
			})
		navigate('/')
	}

	const cacheKey = `${localStorage.getItem('username')}-urls`
	const { isLoading, error, data: shortURLs, mutate } = useSWR(cacheKey, getURLs)

	if (error) {
		toast.error('Error loading data!\nTry reloading the page.', {
			position: 'bottom-right',
			theme: 'dark',
			hideProgressBar: true,
		})
	}

	const addURL = async (URL: string) => {
		const res = await c.addURL(URL)
		if (!res.ok) {
			toast.error(`ERROR adding url: ${res.error}`, {
				position: 'bottom-right',
				theme: 'dark',
				hideProgressBar: true,
			})
		} else {
			toast.success('Added url!', {
				position: 'bottom-right',
				theme: 'dark',
				hideProgressBar: true,
			})
			mutate()
		}
	}

	const onURLCopy = (shortID: string) => {
		navigator.clipboard.writeText(c.fullURLFromShortID(shortID))
		toast.success('Copied!', {
			position: 'bottom-right',
			theme: 'dark',
			autoClose: 1000,
			hideProgressBar: true,
		})
	}

	return (
		<div
			onClick={() => showProfileList && setShowProfileList(false)}
			className="bg-dark-1 min-h-screen w-screen"
		>
			{showAddURLForm && (
				<AddURLForm hideForm={() => setShowAddURLForm(false)} addURL={addURL} />
			)}
			<header className="fixed h-16 w-screen top-0 right-0 left-0 flex justify-between items-center px-10 bg-dark-1 border-b border-b-white/5">
				<div className="font-bold text-white">
					<span className="text-blue-500 mr-2">{URLText}</span>
					Shortener
				</div>

				<div className="relative">
					<button
						onClick={() => setShowProfileList(true)}
						className="p-2 active:bg-white/5  rounded-2xl transition-colors"
					>
						<UserCircle weight="light" color="white" size={32} />
					</button>
					{showProfileList && <ProfileList logout={logout} />}
				</div>
			</header>

			<main className="w-full px-10 max-w-6xl mx-auto">
				<div className="h-32"></div>

				<div className="flex items-center justify-between">
					<h1 className="text-white font-semibold text-xl">URL List</h1>
					<button
						onClick={() => setShowAddURLForm(true)}
						className="bg-blue-500 py-3 px-6 font-bold text-sm text-white rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/2"
					>
						Add URL
					</button>
				</div>

				<div className="h-5"></div>
				{isLoading && 'Loading...'}
				{shortURLs && <URLTable items={shortURLs} onCopy={onURLCopy} />}
			</main>
			<ToastContainer />
		</div>
	)
}

export default Dashboard

interface ProfileListProps {
	logout: () => unknown
}

const ProfileList = ({ logout }: ProfileListProps) => {
	return (
		<div className="absolute right-0">
			<div className="bg-dark-2 border border-white/5 rounded-2xl w-56">
				<button
					onClick={logout}
					className="flex w-full box-border bg-dark-2 py-4 px-7 rounded-2xl text-white hover:bg-neutral-950"
				>
					<SignOut color="white" size={28} className="mr-5" />
					Log out
				</button>
			</div>
		</div>
	)
}
