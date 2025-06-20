'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { UploadCloud } from 'lucide-react'
import usePostHooks from '../Hooks/usePostHooks'
import useGetHooks from '../Hooks/useGetHooks'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface data {
	id: string
	name: string
}

interface fields {
	id: string
	name: string
}

interface uploadImage {
	data: string
}

export default function CreateCenterForm() {
	const token = localStorage.getItem('accessToken')
	const url = import.meta.env.VITE_API_URL
	const inputRef = useRef<HTMLInputElement>(null)
	const [photo, setImage] = useState<File | null>(null)
	const [name, setName] = useState<string>('')
	const [regionId, setRegionId] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [majorsIds, setMajorsIds] = useState<string[]>([])

	const { postData, loading, error } = usePostHooks<{ data: uploadImage }>()
	const {
		data,
		isLoading,
		error: regionsError,
	} = useGetHooks<{ data: data }>(`${url}/regions/${1}`)

	const { data: fieldsData } = useGetHooks<{ data: fields[] }>(`${url}/fields`)

	console.log('subject data', data)
	console.log('subject data', fieldsData)
	console.log(loading || isLoading)
	console.log(error || regionsError)

	const handleCenter = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!photo) {
			toast.error('Image hali tanlanmagan...')
			return
		}
		const uploadData = {
			image: photo,
		}

		const image = await postData(`${url}/upload`, uploadData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		if (image && 'data' in image) {
			const formData = {
				name: name,
				regionId: regionId,
				address: address,
				image: `${image?.data}`,
				majorsId: majorsIds,
				phone: phone,
			}
			await postData(`${url}/centers`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImage(file)
		}
	}

	const handleMajorCheckbox = (id: string) => {
		setMajorsIds(prev =>
			prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
		)
	}

	return (
		<section className='w-full mx-auto py-20 px-6'>
			<h2 className='text-3xl font-bold text-center text-purple-700 mb-8'>
				O‘quv Markaz Yaratish
			</h2>

			<form onSubmit={handleCenter}>
				<div className='space-y-6'>
					<div>
						<Label htmlFor='name'>Markaz nomi</Label>
						<Input
							id='name'
							placeholder='Enter center name'
							className='mt-2'
							onChange={e => setName(e.target.value)}
						/>
					</div>

					<div>
						<Label htmlFor='region'>Hudud</Label>
						<Select onValueChange={value => setRegionId(value)}>
							<SelectTrigger className='mt-2'>
								<SelectValue placeholder='Select Region' />
							</SelectTrigger>
							<SelectContent>
								{data?.data && (
									<SelectItem value={String(data?.data?.id)}>
										{data?.data?.name}
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor='address'>Manzil</Label>
						<Input
							id='address'
							placeholder='Manzilni kiriting'
							className='mt-2'
							onChange={e => setAddress(e.target.value)}
						/>
					</div>

					<div>
						<Label htmlFor='image'>
							Markaz rasmi <span className='text-red-500'>*</span>
						</Label>
						<div
							onClick={() => inputRef.current?.click()}
							className='cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 mt-2 rounded-md p-6 text-center text-sm text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800'
						>
							<div className='flex flex-col items-center justify-center gap-2'>
								<UploadCloud className='w-6 h-6 text-gray-500' />
								<p>Yuklash uchun bosing yoki faylni tanlang</p>
								<p className='text-xs text-gray-400'>PNG, JPG, 5MB gacha</p>
								{photo && (
									<p className='text-xs text-green-600 mt-1'>
										Tanlangan fayl: {photo.name}
									</p>
								)}
							</div>

							<Input
								type='file'
								id='image'
								ref={inputRef}
								className='hidden'
								accept='image/*'
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor='phone'>Telefon raqami</Label>
						<Input
							onChange={e => setPhone(e.target.value)}
							id='phone'
							placeholder='+998'
							className='mt-2'
						/>
					</div>

					<div>
						<Label>Yo'nalishlar (kamida bittasini tanlang)</Label>
						{fieldsData?.data?.map(field => (
							<div key={field.id} className='flex items-center space-x-2 mt-2'>
								<Checkbox
									id={field.id}
									checked={majorsIds.includes(field.id)}
									onCheckedChange={() => handleMajorCheckbox(field.id)}
								/>
								<Label htmlFor={field.id} className='text-sm'>
									{field.name}
								</Label>
							</div>
						))}
					</div>

					<Button
						type='submit'
						className='w-full bg-purple-400 hover:bg-purple-500 text-white font-medium'
					>
						Markaz qo'shish
					</Button>
				</div>
			</form>
		</section>
	)
}
