import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

function Register() {
	const { t } = useTranslation()
	// const url = import.meta.env.VITE_API_URL
	// const { response, loading, error, postData } = usePostHooks()

	return (
		<>
			<section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#d2c2de] to-[#f3e8ff] p-6 max-[500px]:p-0 font-[Roboto]'>
				<Card className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl rounded-lg max-[500px]:rounded-none'>
					<div className='bg-gradient-to-b from-[#461773] to-[#6b3da1] text-white p-10 flex flex-col justify-center'>
						<h2 className='text-4xl font-extrabold mb-6 leading-snug'>
							{t('register.welcome_title')}
						</h2>
						<p className='text-base text-gray-200 max-w-xs'>
							{t('register.welcome_description')}
						</p>
					</div>

					<CardContent className='p-10 max-[500px]:p-[15px]'>
						<CardHeader className='p-0 mb-6'>
							<CardTitle className='text-2xl text-[#461773] text-center font-semibold'>
								{t('register.title')}
							</CardTitle>
						</CardHeader>
						<form className='space-y-6'>
							<div className='space-y-3'>
								<Label
									htmlFor='firstName'
									className='font-medium text-gray-700'
								>
									{t('register.first_name')}
								</Label>
								<Input
									id='firstName'
									placeholder={t('register.first_name_placeholder')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='lastName' className='font-medium text-gray-700'>
									{t('register.last_name')}
								</Label>
								<Input
									id='lastName'
									placeholder={t('register.last_name_placeholder')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='email' className='font-medium text-gray-700'>
									{t('register.email')}
								</Label>
								<Input
									id='email'
									type='email'
									placeholder={t('register.email_placeholder')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='password' className='font-medium text-gray-700'>
									{t('register.password')}
								</Label>
								<Input
									id='password'
									type='password'
									placeholder={t('register.password_placeholder')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='phone' className='font-medium text-gray-700'>
									{t('register.phone')}
								</Label>
								<Input
									id='phone'
									type='tel'
									placeholder={t('register.phone_placeholder')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='image' className='font-medium text-gray-700'>
									{t('register.image')}
								</Label>
								<Input
									id='image'
									type='text'
									placeholder={t('register.first_name_image')}
									className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
								/>
							</div>

							<div className='space-y-3'>
								<Label htmlFor='role' className='font-medium text-gray-700'>
									{t('register.role')}
								</Label>
								<Select>
									<SelectTrigger
										id='role'
										className='border border-gray-300 focus:ring-2 focus:ring-[#461773] focus:border-[#461773] transition'
									>
										<SelectValue placeholder={t('register.select_role')} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='CEO'>{t('register.ceo')}</SelectItem>
										<SelectItem value='USER'>{t('register.user')}</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Button
								type='submit'
								className='w-full py-3 bg-[#461773] hover:bg-[#5a1e85] transition-colors rounded-md text-white font-semibold text-lg'
							>
								{t('register.button')}
							</Button>
						</form>

						<p className='mt-6 text-center text-sm text-gray-600'>
							{t('register.already_account')}{' '}
							<span className='text-[#461773] underline cursor-pointer hover:text-[#5a1e85]'>
								{t('register.login')}
							</span>
						</p>
					</CardContent>
				</Card>
			</section>
		</>
	)
}

export default Register
