import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import RegisterPage from './pages/Auth/Register'
import LoginPage from './pages/Auth/Login'
import OtpPage from './pages/Auth/Auth'
import ProductsDetailsPage from './pages/Products/Details'
import ProfilePage from './pages/Profile/Profile'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/otp' element={<OtpPage />} />
				<Route path='/center/:id' element={<ProductsDetailsPage />} />
			</Routes>
		</>
	)
}

export default App
