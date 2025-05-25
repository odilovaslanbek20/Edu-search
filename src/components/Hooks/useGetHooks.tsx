import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetHooks = (url: string) => {
  return useQuery({
		queryKey: [url],
		queryFn: async () => {
			const res = await axios(url)
			return res.data
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	})
}

export default useGetHooks