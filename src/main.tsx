import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'
import Provider from './provider/Provider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider>
			<App />
		</Provider>
	</StrictMode>
)
