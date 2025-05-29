import { useEffect } from 'react'
import usePostHooks from '../Hooks/usePostHooks'

interface AuthResponse {
	accessToken: string
}

function RefreshToken() {
	const refreshToken = localStorage.getItem('refreshToken')
	const url = import.meta.env.VITE_API_URL
	const { response, loading, error, postData } = usePostHooks<AuthResponse>()

	const refresh = async () => {
		if (!refreshToken) {
			console.error('Refresh token mavjud emas')
			return
		}

		await postData(`${url}/users/refreshToken`, { refreshToken })
	}

	useEffect(() => {
		refresh() 

		const interval = setInterval(() => {
			refresh() 
		}, 600000)

		return () => clearInterval(interval) 
	}, [])

	useEffect(() => {
		if (response) {
			localStorage.setItem('accessToken', response.accessToken)
		}
	}, [response])
	console.log(loading);
	console.log(error);

	return null 
}

export default RefreshToken
