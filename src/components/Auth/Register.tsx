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
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Register() {
	const { t } = useTranslation()

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

					<form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='firstName'>{t('register.first_name')}</Label>
							<Input
								id='firstName'
								placeholder={t('register.first_name_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='lastName'>{t('register.last_name')}</Label>
							<Input
								id='lastName'
								placeholder={t('register.last_name_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='email'>{t('register.email')}</Label>
							<Input
								id='email'
								type='email'
								placeholder={t('register.email_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='password'>{t('register.password')}</Label>
							<Input
								id='password'
								type='password'
								placeholder={t('register.password_placeholder')}
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>
						<div className='flex flex-col gap-1 col-span-1'>
							<Label htmlFor='phone'>{t('register.phone')}</Label>
							<Input
								id='phone'
								type='tel'
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
								className='bg-white/60 border border-white/30 w-full'
							/>
						</div>
						<div className='flex flex-col gap-1 col-span-1 sm:col-span-2'>
							<Label htmlFor='role'>{t('register.role')}</Label>
							<Select>
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
