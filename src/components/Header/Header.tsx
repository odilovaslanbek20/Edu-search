import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { GoHeart } from 'react-icons/go'
import { useEffect, useState } from 'react'
import LanguageModal from './Language'
import { FiMenu, FiX } from 'react-icons/fi'
import { MdQueue } from 'react-icons/md'
import CeoDropdown from './CeoPanel'
import useGetHooks from '../Hooks/useGetHooks'
import Admen from '../Profile/User'

type User = {
	id: number
	name: string
	email: string
	role: string
}

function Header() {
	const url = import.meta.env.VITE_API_URL
	const { t } = useTranslation()
	const [menuOpen, setMenuOpen] = useState(false)
	const token = localStorage.getItem('accessToken')
	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem('myData')
		return stored ? JSON.parse(stored) : null
	})

	const { data, isLoading, error, refetch } = useGetHooks<{ data: User }>(
		`${url}/users/mydata`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		},
		{
			enabled: !!token,
		}
	)

	console.log(isLoading)
	console.log(error)

	useEffect(() => {
		if (data?.data) {
			localStorage.setItem('myData', JSON.stringify(data.data))
			setUser(data.data)
		}
	}, [data])

	useEffect(() => {
		if (token) {
			refetch()
		} else {
			setUser(null)
			localStorage.removeItem('myData')
		}
	}, [token, refetch])

	const ceoUser = user?.role

	const toggleMenu = () => setMenuOpen(!menuOpen)

	return (
		<header className='w-full py-[15px] bg-white fixed top-0 left-0 border-b border-gray-200 z-50'>
			<div className='w-[95%] m-auto flex items-center justify-between'>
				<Link to='/'>
					<img
						className='w-[160px] max-[500px]:w-[130px]'
						src='/logo-iS1ZmJmJ.png'
						alt='web logo'
					/>
				</Link>

				<nav className='flex items-center gap-5 max-[1330px]:hidden'>
					{[
						{ to: '/', label: t('home') },
						{ to: '#', label: t('about') },
						{ to: '#', label: t('reuses') },
					].map((item, index) => (
						<Link
							key={index}
							to={item.to}
							className='text-gray-600 hover:text-[#461773] font-medium relative group transition-colors duration-300'
						>
							{item.label}
							<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#461773] transition-all duration-300 group-hover:w-full'></span>
						</Link>
					))}

					<Link
						to='#'
						className='text-gray-600 hover:text-[#461773] font-medium flex items-center gap-2 relative group transition-colors duration-300'
					>
						<GoHeart className='text-lg' />
						{t('like')}
						<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#461773] transition-all duration-300 group-hover:w-full'></span>
					</Link>

					{token && (
						<>
							<Link
								to='#'
								className='text-gray-600 hover:text-[#461773] font-medium flex items-center gap-2 relative group transition-colors duration-300'
							>
								<MdQueue />
								{t('queue')}
								<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#461773] transition-all duration-300 group-hover:w-full'></span>
							</Link>

							{data && ceoUser === 'CEO' ? (
								<>
									<CeoDropdown />
								</>
							) : (
								''
							)}
						</>
					)}
				</nav>

				<div className='flex items-center gap-[15px] '>
					<LanguageModal />

					{!token ? (
						<>
							<Link to='/login'>
								<p className='text-gray-600 hover:text-[#fff] hover:bg-[#461773] border border-[#461773] rounded-lg transition-all duration-500 px-4 py-[7px] font-medium max-[880px]:hidden'>
									{t('signIn')}
								</p>
							</Link>

							<Link to='/register'>
								<p className='text-white bg-[#461773] px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer max-[880px]:hidden'>
									{t('signUp')}
								</p>
							</Link>
						</>
					) : (
						<>
							<Admen />
						</>
					)}

					<div
						onClick={toggleMenu}
						className={`min-[1330px]:hidden flex items-center justify-center text-gray-600 bg-transparent transition-all duration-300 rounded-lg cursor-pointer
    ${menuOpen ? 'hidden' : 'block'} 
    min-[750px]:border min-[750px]:border-[#461773] min-[750px]:px-[10px] min-[750px]:py-[7px]`}
					>
						<FiMenu className='text-[25px]' />
					</div>
				</div>
			</div>

			<div
				className={`fixed inset-0 bg-[#000]/50 z-40 transition-opacity duration-500 ${
					menuOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
			></div>

			<div
				className={`min-[1330px]:hidden fixed top-0 pb-[30px] ${
					menuOpen ? 'max-[1330px]:left-0' : 'max-[1330px]:left-[-100%]'
				} w-[280px] h-full bg-white shadow-lg z-50 p-6 flex flex-col justify-between transition-all duration-500`}
			>
				<div className='flex flex-col gap-5'>
					<div className='flex items-center justify-between'>
						<Link to='/'>
							<img
								className='w-[130px]'
								src='/logo-iS1ZmJmJ.png'
								alt='web logo'
							/>
						</Link>
						<div className='cursor-pointer'>
							<FiX onClick={toggleMenu} className='text-[25px]' />
						</div>
					</div>

					<Link to='/' className='text-[18px] font-semibold text-[#461773]'>
						{t('home')}
					</Link>
					<Link to='#' className='text-[18px] font-semibold text-gray-600'>
						{t('about')}
					</Link>
					<Link to='#' className='text-[18px] font-semibold text-gray-600'>
						{t('reuses')}
					</Link>
					<Link
						to='#'
						className='text-[18px] font-semibold text-gray-600 flex items-center gap-2'
					>
						<GoHeart className='text-lg' />
						{t('like')}
					</Link>

					{token ? (
						<>
							<Link
								to='#'
								className='text-gray-600 hover:text-[#461773] font-medium flex items-center gap-2 relative group transition-colors duration-300'
							>
								<MdQueue />
								{t('queue')}
							</Link>

							{data && ceoUser === 'CEO' ? <CeoDropdown /> : null}
						</>
					) : (
						<>
							<hr />
							<Link
								to='/login'
								className='text-gray-600 border border-[#461773] px-4 py-[7px] rounded-lg transition-all hidden max-[880px]:block'
							>
								{t('signIn')}
							</Link>
							<Link
								to='/register'
								className='text-white bg-[#461773] px-4 py-[9px] rounded-lg transition-all hidden max-[880px]:block'
							>
								{t('signUp')}
							</Link>
						</>
					)}
				</div>

				<div className='mt-6 bg-yellow-100 text-yellow-800 p-2 text-center text-sm rounded-md'>
					{isLoading && <p>Ma'lumotlar yuklanmoqda...</p>}
					{error && (
						<p>Xatolik yuz berdi: {error?.message || "Noma'lum xatolik"}</p>
					)}
					{!isLoading && !error && user && (
						<p>
							Foydalanuvchi roli: <strong>{user?.role}</strong>
						</p>
					)}
					{!token && <p>Tizimga kiritilmagan</p>}
				</div>
			</div>
		</header>
	)
}

export default Header
