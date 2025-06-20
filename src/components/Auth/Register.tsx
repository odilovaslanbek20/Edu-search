import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import usePostHooks from '../Hooks/usePostHooks'
import { toast } from 'react-toastify'

interface Upload {
	data: string
}

function Register() {
	const url = import.meta.env.VITE_API_URL
	const { response, loading, error, postData } = usePostHooks()
	const {
		response: response1,
		loading: loading1,
		error: error1,
		postData: postData1,
	} = usePostHooks()
	const { t } = useTranslation()
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [role, setRole] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)
	const navigate = useNavigate()

	const { postData: uploadData } = usePostHooks<Upload>()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			let uploadedImagePath = ''

			if (image) {
				const imageFormData = new FormData()
				imageFormData.append('image', image)

				const photo = await uploadData(`${url}/upload`, imageFormData)

				if (photo?.data) {
					uploadedImagePath = photo.data
				}
			}

			const formData = new FormData()
			formData.append('firstName', firstName)
			formData.append('lastName', lastName)
			formData.append('email', email)
			formData.append('phone', phone)
			formData.append('password', password)
			formData.append('role', role)

			if (uploadedImagePath) {
				formData.append('image', uploadedImagePath)
			}

			await postData(`${url}/users/register`, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			localStorage.setItem('email', email)
			toast.success("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi")
		} catch (error) {
			console.error(error)
			toast.error('Xatolik yuz berdi')
		}
	}

	useEffect(() => {
		if (response) {
			const sendOtp = async () => {
				await postData1(
					`${url}/users/send-otp`,
					{ email },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
			}

			sendOtp()
		}
		localStorage.setItem('email', email)
	}, [email, postData1, response, url])

	if (response1) {
		navigate('/otp')
	}

	console.log(response || response1)

	if (loading || loading1) {
		return (
			<div className='fixed w-full h-screen z-50 bg-[#fff]'>
				<div className='flex justify-start mt-[50px] items-center h-screen flex-col'>
					<div className='animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16 mb-4'></div>
					<p className='text-lg text-gray-700'>Loading data...</p>
				</div>
			</div>
		)
	}

	if (error || error1) {
		return (
			<div className='fixed w-full h-screen bg-[#fff] z-50 px-[20px]'>
				<div className='flex justify-center items-center h-[200px]'>
					<div className='bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-md'>
						{error || error1}
					</div>
				</div>
			</div>
		)
	}

	return (
		<section className='min-h-screen w-full flex items-center justify-center bg-[#d2c2de] font-[Roboto] px-4 overflow-x-hidden max-[768px]:p-0'>
			<div className='w-full max-w-4xl rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden max-[768px]:rounded-none max-[768px]:h-screen max-[640px]:h-full'>
				<div className='bg-[#461773] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center text-center md:text-left'>
					<h2 className='text-3xl sm:text-4xl font-extrabold mb-4 leading-snug'>
						{t('register.welcome_title')}
					</h2>
					<p className='text-sm sm:text-base text-gray-200 opacity-90'>
						{t('register.welcome_description')}
					</p>
				</div>

				<div className='p-6 sm:p-8 md:p-10'>
					<CardHeader className='p-0 mb-6'>
						<CardTitle className='text-xl sm:text-2xl font-semibold text-center text-[#461773]'>
							{t('register.title')}
						</CardTitle>
					</CardHeader>

					<form
						onSubmit={handleSubmit}
						className='grid grid-cols-1 sm:grid-cols-2 gap-4'
					>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='firstName'>{t('register.first_name')}</Label>
							<Input
								id='firstName'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								placeholder={t('register.first_name_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='lastName'>{t('register.last_name')}</Label>
							<Input
								id='lastName'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								placeholder={t('register.last_name_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='email'>{t('register.email')}</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder={t('register.email_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='password'>{t('register.password')}</Label>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder={t('register.password_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='phone'>{t('register.phone')}</Label>
							<Input
								id='phone'
								type='tel'
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder={t('register.phone_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='image'>{t('register.image')}</Label>
							<Input
								id='image'
								type='file'
								accept='image/*'
								onChange={e => {
									if (e.target.files && e.target.files[0]) {
										setImage(e.target.files[0])
									}
								}}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>

						<div className='flex flex-col gap-1 col-span-1 sm:col-span-2'>
							<Label htmlFor='role'>{t('register.role')}</Label>
							<Select onValueChange={setRole}>
								<SelectTrigger
									id='role'
									className='bg-white/60 border border-white/30 w-full'
								>
									<SelectValue placeholder={t('register.select_role')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='CEO'>{t('register.ceo')}</SelectItem>
									<SelectItem value='USER'>{t('register.user')}</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='col-span-1 sm:col-span-2'>
							<Button
								type='submit'
								className='w-full bg-[#461773] hover:bg-[#5a1e85] transition-colors cursor-pointer'
							>
								{t('register.button')}
							</Button>
						</div>
					</form>

					<Link to='/login' className='mt-6 block text-center text-sm'>
						{t('register.already_account')}{' '}
						<span className='text-[#461773] underline cursor-pointer'>
							{t('register.login')}
						</span>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Register
