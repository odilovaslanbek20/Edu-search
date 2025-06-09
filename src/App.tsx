import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home/Home'
import RegisterPage from './pages/Auth/Register'
import LoginPage from './pages/Auth/Login'
import OtpPage from './pages/Auth/Auth'
import ProductsDetailsPage from './pages/Products/Details'
import ProfilePage from './pages/Profile/Profile'
import Footer from './components/Footer/Footer'
import CeoCreate from './pages/Ceo/CeoCreate'
import ElonPage from './pages/Elon/Elon'
import NotFaundPage from './pages/NotFaund/NotFaundPage'
import ResurslarPage from './pages/Resurslar/Resurslar'
import RefreshToken from './components/Auth/RefreshToken'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	fetch('http://34.9.169.36:4000/api-docs/centers').then(res =>
		console.log('Fetch_data', res)
	).catch(error => 
    console.log(error)
  )

	return (
		<>
			<ToastContainer />
			<RefreshToken />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/otp' element={<OtpPage />} />
				<Route path='/center/:id' element={<ProductsDetailsPage />} />
				<Route path='/ceo' element={<CeoCreate />} />
				<Route path='/elon' element={<ElonPage />} />
				<Route path='/resurs' element={<ResurslarPage />} />

				<Route path='/profile' element={<ProfilePage />} />

				<Route path='*' element={<NotFaundPage />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
