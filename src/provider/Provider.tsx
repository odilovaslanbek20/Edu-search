import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'react-auth-kit'
import { store } from './AuthProvider'

const queryClient = new QueryClient()

type Props = {
	children: ReactNode
}

function Provider({ children }: Props) {
	return (
		<>
			<AuthProvider store={store}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>{children}</BrowserRouter>
				</QueryClientProvider>
			</AuthProvider>
		</>
	)
}

export default Provider
