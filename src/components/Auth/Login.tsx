import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import usePostHooks from '../Hooks/usePostHooks'

interface AuthResponse {
	accessToken: string
	refreshToken: string
}

function Login() {
	const url = import.meta.env.VITE_API_URL
	const { response, loading, error, postData } = usePostHooks<AuthResponse>()
	const { t } = useTranslation()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await postData(
			`${url}/users/login`,
			{ email, password },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}

	useEffect(() => {
		if (response) {
			localStorage.setItem('accessToken', response.accessToken)
			localStorage.setItem('refreshToken', response.refreshToken)
			navigate('/')
		}
	}, [response, navigate])

	if (loading) {
		return (
			<div className='fixed w-full h-screen z-50 bg-[#fff]'>
				<div className='flex justify-start mt-[50px] items-center h-screen flex-col'>
					<div className='animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16 mb-4'></div>
					<p className='text-lg text-gray-700'>Loading data...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='fixed w-full h-screen bg-[#fff] z-50 px-[20px]'>
				<div className='flex justify-center items-center h-[200px]'>
					<div className='bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-md'>
						{error}
					</div>
				</div>
			</div>
		)
	}

	return (
		<section className='min-h-screen w-full flex items-center justify-center bg-[#d2c2de] font-[Roboto] px-4 max-[600px]:p-0'>
			<div className='w-full max-w-4xl rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden max-[600px]:rounded-none max-[600px]:h-screen'>
				<div className='bg-[#461773] text-white p-10 flex flex-col justify-center'>
					<h2 className='text-4xl font-extrabold mb-4 leading-snug'>
						{t('login.welcome_title')}
					</h2>
					<p className='text-base text-gray-200 opacity-90'>
						{t('login.welcome_description')}
					</p>
				</div>

				<div className='p-10'>
					<CardHeader className='p-0 mb-6'>
						<CardTitle className='text-2xl font-semibold text-center text-[#461773]'>
							{t('login.title')}
						</CardTitle>
					</CardHeader>

					<form onSubmit={handleLogin} className='grid grid-cols-1 gap-4'>
						<div className='flex flex-col gap-1'>
							<Label htmlFor='email'>{t('login.email')}</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder={t('login.email_placeholder')}
								className='bg-white/60 border border-white/30'
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<Label htmlFor='password'>{t('login.password')}</Label>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder={t('login.password_placeholder')}
								className='bg-white/60 border border-white/30'
							/>
						</div>

						<Button
							type='submit'
							className='w-full bg-[#461773] hover:bg-[#5a1e85] transition-colors mt-2 cursor-pointer'
						>
							{t('login.button')}
						</Button>
					</form>

					<div className='mt-6 text-center text-sm'>
						{t('login.no_account')}{' '}
						<Link to='/register' className='text-[#461773] underline'>
							{t('login.register')}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login
