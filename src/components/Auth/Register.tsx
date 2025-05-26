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
		<section className='min-h-screen w-full flex items-center justify-center bg-[#d2c2de] p-4 max-[500px]:p-0 font-[Roboto]'>
			<Card className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl max-[500px]:rounded-none'>
				<div className='bg-[#461773] text-white p-8 flex flex-col justify-center'>
					<h2 className='text-3xl font-bold mb-4'>
						{t('register.welcome_title')}
					</h2>
					<p className='text-sm text-gray-200'>
						{t('register.welcome_description')}
					</p>
				</div>

				<CardContent className='p-8'>
					<CardHeader className='p-0 mb-4'>
						<CardTitle className='text-xl text-[#461773] text-center'>
							{t('register.title')}
						</CardTitle>
					</CardHeader>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstName'>{t('register.first_name')}</Label>
							<Input
								id='firstName'
								placeholder={t('register.first_name_placeholder')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='lastName'>{t('register.last_name')}</Label>
							<Input
								id='lastName'
								placeholder={t('register.last_name_placeholder')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>{t('register.email')}</Label>
							<Input
								id='email'
								type='email'
								placeholder={t('register.email_placeholder')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>{t('register.password')}</Label>
							<Input
								id='password'
								type='password'
								placeholder={t('register.password_placeholder')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phone'>{t('register.phone')}</Label>
							<Input
								id='phone'
								type='tel'
								placeholder={t('register.phone_placeholder')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='image'>{t('register.image')}</Label>
							<Input
								id='image'
								type='text'
								placeholder={t('register.first_name_image')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='role'>{t('register.role')}</Label>
							<Select>
								<SelectTrigger id='role'>
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
							className='w-full bg-[#461773] hover:bg-[#5a1e85] transition-colors'
						>
							{t('register.button')}
						</Button>
					</form>
					<p className='mt-4 text-sm'>
						{t('register.already_account')}{' '}
						<span className='text-[#461773] underline cursor-pointer'>
							{t('register.login')}
						</span>
					</p>
				</CardContent>
			</Card>
		</section>
	)
}

export default Register
