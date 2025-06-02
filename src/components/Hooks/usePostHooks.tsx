import { useState } from 'react'
import axios from 'axios'

export default function usePostHooks<T = unknown>() {
	const [response, setResponse] = useState<T | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<null | string>(null)
	const [status, setStatus] = useState<string>("")

	const postData = async (
		url: string,
		data: object,
		options?: { headers?: Record<string, string> }
	) => {
		setLoading(true)
		setError(null)
		try {
			const res = await axios.post<T>(url, data, options)
			setResponse(res.data)
			setStatus(res.status.toString())
			return res.data 
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('Nomaʼlum xatolik')
			}
		} finally {
			setLoading(false)
		}
	}
	
	

	return { response, loading, error, status, postData }
}
