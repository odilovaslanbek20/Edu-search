import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import usePutData from '../Hooks/usePutData'
import useGetHooks from '../Hooks/useGetHooks'

type User = {
	id: number
	firstName: string
	lastName: string
	email: string
	phone?: string
	role?: string
}

function EditModal() {
	const token = localStorage.getItem("accessToken")
	const url = import.meta.env.VITE_API_URL

	const { putData, response, loading, error } = usePutData<{ data: User }>()
	const {
		data,
		isLoading: loading1,
		error: error1,
	} = useGetHooks<User>(`${url}/users/mydata`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
	})

	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
	})

	useEffect(() => {
		if (data) {
			setFormData({
				firstName: data.firstName || '',
				lastName: data.lastName || '',
				phone: data.phone || '',
			})
		}
	}, [data, open])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async () => {
		if (!token) return console.error('Token topilmadi')

		try {
			await putData(`${url}/users/${data?.data?.id}`, formData, token)
			console.log('Yuborilgan:', formData)
			setOpen(false)
		} catch (error) {
			console.error('Xatolik yuz berdi:', error)
		}
	}

	console.log(response)
	console.log(loading || loading1)
	console.log(error || error1)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='hover:bg-muted'>
					Tahrirlash
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Profilni tahrirlash</DialogTitle>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='firstName'>Ism</Label>
						<Input
							id='firstName'
							name='firstName'
							placeholder='Ismingizni kiriting'
							value={formData.firstName}
							onChange={handleChange}
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='lastName'>Familiya</Label>
						<Input
							id='lastName'
							name='lastName'
							placeholder='Familiyangizni kiriting'
							value={formData.lastName}
							onChange={handleChange}
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='phone'>Telefon</Label>
						<Input
							id='phone'
							name='phone'
							type='tel'
							placeholder='+998 90 123 45 67'
							value={formData.phone}
							onChange={handleChange}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						onClick={handleSubmit}
						disabled={loading}
						className='bg-[#461773] hover:bg-[#5c1c90] transition'
					>
						{loading ? 'Saqlanmoqda...' : 'Saqlash'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditModal
