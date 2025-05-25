import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

type Props = {
	children: ReactNode
}

function Provider({children}: Props) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
			  <BrowserRouter>
				  {children}
				</BrowserRouter>
			</QueryClientProvider>
		</>
	)
}

export default Provider
