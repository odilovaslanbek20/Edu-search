import { useState } from 'react'
import axios from 'axios'

function usePutData<T = unknown>() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [response, setResponse] = useState<T | null>(null)

	const putData = async (url: string, data: unknown, token?: string) => {
		setLoading(true)
		setError(null)

		try {
			const res = await axios.patch(url, data, {
				headers: {
					'Content-Type': 'application/json',
					...(token && { Authorization: `Bearer ${token}` }),
				},
			})
			setResponse(res.data)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message)
			} else {
				setError('Unknown error')
			}
		} finally {
			setLoading(false)
		}
	}

	return { putData, loading, error, response }
}

export default usePutData
