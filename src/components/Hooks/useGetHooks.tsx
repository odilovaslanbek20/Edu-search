import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function useGetHooks<T>(url: string) {
	return useQuery({
		queryKey: [url],
		queryFn: async (): Promise<T> => {
			const res = await axios.get<T>(url)
			return res.data
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false, 
	})
}

export default useGetHooks
