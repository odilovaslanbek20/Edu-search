import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useRef } from 'react'
import usePostHooks from '../Hooks/usePostHooks'
import { useNavigate } from 'react-router-dom'

function Otp() {
	const url = import.meta.env.VITE_API_URL
	const { response, loading, error, postData } = usePostHooks()
	const {
		response: response1,
		loading: loading1,
		error: error1,
		postData: postData1,
	} = usePostHooks()

	const [otpDigits, setOtpDigits] = useState(Array(5).fill(''))
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])
	const navigate = useNavigate()

	const handleChange = (index: number, value: string) => {
		if (!/^[0-9]?$/.test(value)) return
		const newOtp = [...otpDigits]
		newOtp[index] = value
		setOtpDigits(newOtp)

		if (value && index < 4) {
			inputsRef.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}

	const email = localStorage.getItem('email') || ''
	const otp = otpDigits.join('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await postData(
			`${url}/users/verify-otp`,
			{ email, otp },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}

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

	if (response) {
		navigate('/login')
	}

	console.log(response1);

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
		<section className='min-h-screen flex items-center justify-center max-[1024px]:items-start max-[1024px]:pt-[50px] px-4 bg-gradient-to-br from-[#ECE9F0] to-[#ffffff] max-[500px]:p-0'>
			<Card className='w-full max-w-sm shadow-2xl border-0 bg-white rounded-xl max-[500px]:bg-transparent max-[500px]:shadow-none'>
				<CardHeader>
					<CardTitle className='text-center text-2xl font-bold text-[#4B0082]'>
						Enter OTP Code
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='flex flex-col gap-3'>
							<Label
								htmlFor='otp'
								className='text-sm text-gray-600 text-center'
							>
								Please enter the 5-digit verification code
							</Label>

							<div className='flex justify-center gap-3 flex-wrap'>
								{otpDigits.map((digit, index) => (
									<Input
										key={index}
										type='text'
										inputMode='numeric'
										maxLength={1}
										value={digit}
										onChange={e => handleChange(index, e.target.value)}
										onKeyDown={e => handleKeyDown(index, e)}
										ref={el => {
											inputsRef.current[index] = el
										}}
										className='w-12 h-12 rounded-full text-center text-xl font-bold border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all'
									/>
								))}
							</div>
						</div>

						<Button
							type='submit'
							className='w-full bg-[#4B0082] hover:bg-[#5d0ab7] text-white transition-colors font-semibold py-2 rounded-md'
						>
							Verify Code
						</Button>

						<p className='text-center text-sm text-gray-600'>
							Didn’t get the code?{' '}
							<span
								onClick={sendOtp}
								className='text-[#4B0082] font-medium cursor-pointer hover:underline'
							>
								Resend
							</span>
						</p>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}

export default Otp
