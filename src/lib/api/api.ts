import ky from 'ky'

export type ApiClient = ReturnType<typeof Client>
export type ApiResponse<K> = { ok: false; error: string } | { ok: true; data: K }
export type ApiResponseEmpty = ApiResponse<Map<string, never>>
export type ApiResponseGetURLsRaw = ApiResponse<{
	urls: {
		url: string
		shortID: string
		views: number
		createdAt: string
	}[]
}>
export type ApiResponseGetURLs = ApiResponse<{
	urls: {
		url: string
		shortID: string
		views: number
		createdAt: Date
	}[]
}>

export type ApiResponseLoggedIn = ApiResponse<{ isLoggedIn: boolean }>

export interface LoginOptions {
	username: string
	password: string
}

export interface SignUpOptions {
	username: string
	email: string
	password: string
}

export const Client = (baseApiURL: string) => {
	const c = ky.create({
		prefixUrl: baseApiURL,
		throwHttpErrors: false,
		credentials: 'include',
	})

	const getLoggedIn = () => {
		return c.get('users/logged_in').json() as Promise<ApiResponseLoggedIn>
	}

	const login = (o: LoginOptions) => {
		return c.post('users/login', { json: o }).json() as Promise<ApiResponseEmpty>
	}

	const signUp = (o: SignUpOptions) => {
		return c.post('users/add', { json: o }).json() as Promise<ApiResponseEmpty>
	}

	const logout = () => {
		return c.post('users/logout').json() as Promise<ApiResponseEmpty>
	}

	const getURLs = async (): Promise<ApiResponseGetURLs> => {
		const rawRes = (await c.get('u').json()) as ApiResponseGetURLsRaw
		if (rawRes.ok) {
			const res: ApiResponseGetURLs = {
				ok: true,
				data: {
					urls: rawRes.data.urls.map(u => ({ ...u, createdAt: new Date(u.createdAt) })),
				},
			}
			return res
		}
		return rawRes
	}

	const addURL = (url: string) => {
		return c.post('u/add', { json: { url } }).json() as Promise<ApiResponseEmpty>
	}

	const fullURLFromShortID = (shortID: string) => {
		return baseApiURL + 'u/' + shortID
	}

	return { getLoggedIn, login, signUp, logout, getURLs, addURL, fullURLFromShortID }
}
