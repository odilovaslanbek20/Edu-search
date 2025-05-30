import { useState } from 'react'
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
import { useTranslation } from 'react-i18next'

type ApiResponse<T> = {
  data: T
}


type User = {
	id: number
	firstName: string
	lastName: string
	phone?: string
}

function EditModal() {
	const { t } = useTranslation()
	const token = localStorage.getItem("accessToken")
	const url = import.meta.env.VITE_API_URL

	const { putData, response, loading, error } = usePutData()
	const {
		data,
		isLoading: loading1,
		error: error1,
	} = useGetHooks<ApiResponse<User>>(`${url}/users/mydata`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
	})

	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		firstName: data?.data?.firstName,
		lastName: data?.data?.lastName,
		phone: data?.data?.phone,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const id = data?.data?.id

	const handleSubmit = async () => {
		if (!token) {
			console.error('Token topilmadi')
			return
		}
		if (!id) {
			console.error('Foydalanuvchi id topilmadi')
			return
		}

		try {
			await putData(`${url}/users/${id}`, formData, token)
			setOpen(false)
			window.location.reload()
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
				<Button variant='outline' className='bg-[#461773] text-[#fff] hover:bg-[#461773]/80 cursor-pointer hover:text-[#fff] border-none'>
					📝 {t('profile.edit')}
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>{t("profile.edit")}</DialogTitle>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='firstName'>{t("profile.firstname")}</Label>
						<Input
							id='firstName'
							name='firstName'
							placeholder={data?.data?.firstName}
							value={formData?.firstName}
							onChange={handleChange}
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='lastName'>{t("profile.lastname")}</Label>
						<Input
							id='lastName'
							name='lastName'
							placeholder={data?.data?.lastName}
							value={formData?.lastName}
							onChange={handleChange}
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='phone'>{t("profile.phone")}</Label>
						<Input
							id='phone'
							name='phone'
							type='tel'
							placeholder={data?.data?.phone}
							value={formData?.phone}
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
						{loading ? `${t("profile.loading")}` : `${t("profile.saqlash")}`}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditModal
