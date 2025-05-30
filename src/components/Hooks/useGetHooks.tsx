import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type RequestOptions = {
  headers?: Record<string, string>
}

function useGetHooks<T>(
	url: string,
	options?: RequestOptions,
	queryOptions?: { enabled?: boolean }
) {
	return useQuery({
		queryKey: [url],
		queryFn: async (): Promise<T> => {
			const res = await axios.get<T>(url, {
				headers: options?.headers,
			})
			return res.data
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: queryOptions?.enabled ?? true, 
	})
}


export default useGetHooks
