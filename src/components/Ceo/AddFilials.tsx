import { useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { UploadCloud } from 'lucide-react'
import usePostHooks from '../Hooks/usePostHooks'
import useGetHooks from '../Hooks/useGetHooks'

interface Center {
	id: number
	name: string
}

interface Region {
	id: number
	name: string
}

interface UploadResponse {
	data: string
}

export default function AddFinials() {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')
	const inputRef = useRef<HTMLInputElement>(null)
	const { postData, loading, error } = usePostHooks()

	const {
		data,
		isLoading,
		error: centerError,
	} = useGetHooks<{ data: Center[] }>(`${url}/users/mycenters`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})

	const {
		data: regionData,
		isLoading: regionsLoading,
		error: regionsError,
	} = useGetHooks<{ data: Region }>(`${url}/regions/1`)

	const {
		postData: uploadData,
		loading: uploadLoad,
		error: uploadError,
	} = usePostHooks()

	const centers = data?.data
	const region = regionData?.data

	const [name, setName] = useState('Chilonzor')
	const [phone, setPhone] = useState('')
	const [centerId, setCenterId] = useState<string | null>(null)
	const [regionId, setRegionId] = useState<string | null>(null)
	const [address, setAddress] = useState('')
	const [image, setImage] = useState<File | null>(null)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImage(file)
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const imageFormData = new FormData()
		if (image) {
			imageFormData.append('image', image)
		}

		const photo = (await uploadData(`${url}/upload`, imageFormData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})) as UploadResponse

		if (photo && 'data' in photo) {
			const formData = {
				name,
				phone,
				centerId,
				regionId,
				address,
				image: `${photo?.data}`,
			}

			console.log(formData)

			await postData(`${url}/filials`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
		}
	}

	console.log(isLoading || regionsLoading || uploadLoad)
	console.log(error || centerError || regionsError || uploadError)

	return (
		<section className='w-full mx-auto py-20 px-6'>
			<h2 className='text-3xl font-bold text-center text-purple-700 mb-8'>
				Filial qo‘shish
			</h2>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<Label>Markazni tanlang</Label>
					<Select onValueChange={value => setCenterId(value)}>
						<SelectTrigger className='mt-2'>
							<SelectValue placeholder='Markaz tanlang' />
						</SelectTrigger>
						<SelectContent>
							{centers?.map(center => (
								<SelectItem key={center?.id} value={String(center?.id)}>
									{center?.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor='branchName'>Filial nomi</Label>
					<Input
						name='branchName'
						placeholder='Masalan: Yunusobod filiali'
						className='mt-2'
						onChange={e => setName(e.target.value)}
					/>
				</div>

				<div>
					<Label htmlFor='phone'>Telefon raqami</Label>
					<Input
						name='phone'
						placeholder='+998 90 123 45 67'
						className='mt-2'
						onChange={e => setPhone(e.target.value)}
					/>
				</div>

				<div>
					<Label>Hudud</Label>
					<Select onValueChange={value => setRegionId(value)}>
						<SelectTrigger className='mt-2'>
							<SelectValue placeholder='Hududni tanlang' />
						</SelectTrigger>
						<SelectContent>
							{region && (
								<SelectItem value={String(region?.id)}>
									{region?.name}
								</SelectItem>
							)}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor='address'>Manzil</Label>
					<Textarea
						name='address'
						placeholder='Toʻliq manzilni kiriting'
						className='mt-2'
						onChange={e => setAddress(e.target.value)}
					/>
				</div>

				<div>
					<Label htmlFor='image'>Filial rasmi</Label>
					<div
						onClick={() => inputRef.current?.click()}
						className='cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 mt-2 rounded-md p-6 text-center text-sm text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800'
					>
						<div className='flex flex-col items-center justify-center gap-2'>
							<UploadCloud className='w-6 h-6 text-gray-500' />
							<p>Yuklash uchun bosing yoki faylni tanlang</p>
							<p className='text-xs text-gray-400'>PNG, JPG, 5MB gacha</p>
							{image && (
								<p className='text-xs text-green-600 mt-1'>
									Tanlangan fayl: {image?.name}
								</p>
							)}
						</div>
						<Input
							type='file'
							name='image'
							ref={inputRef}
							className='hidden'
							accept='image/*'
							onChange={handleImageChange}
						/>
					</div>
				</div>

				<Button
					disabled={loading}
					type='submit'
					className='w-full bg-purple-400 hover:bg-purple-500 text-white font-medium'
				>
					{loading ? 'Yuklanmoqda...' : 'Saqlash'}
				</Button>
			</form>
		</section>
	)
}
