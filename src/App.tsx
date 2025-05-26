import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import Header from './components/Header/Header'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</>
	)
}

export default App
