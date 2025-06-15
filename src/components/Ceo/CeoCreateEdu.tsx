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
// import usePostHooks from '../Hooks/usePostHooks'
import useGetHooks from '../Hooks/useGetHooks'

interface data {
	id: string
	name: string
}

interface fields {
	id: string
	name: string
}

export default function CreateCenterForm() {
	const url = import.meta.env.VITE_API_URL

	//  const {postData, loading, error} = usePostHooks()
	const { data, isLoading, error } = useGetHooks<{ data: data }>(
		`${url}/regions/${1}`
	)

	const { data: fieldsData } = useGetHooks<{ data: fields[] }>(`${url}/fields`)

	console.log('subject data', data)
	console.log('subject data', fieldsData)
	console.log(isLoading)
	console.log(error)

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    console.log("Tanlangan fayl:", file.name);
  }
};

	return (
		<section className='max-w-xl mx-auto py-20 px-6'>
			<h2 className='text-3xl font-bold text-center text-purple-700 mb-8'>
				O‘quv Markaz Yaratish
			</h2>

			<div className='space-y-6'>
				<div>
					<Label htmlFor='name'>Markaz nomi</Label>
					<Input id='name' placeholder='Enter center name' className='mt-2' />
				</div>

				<div>
					<Label htmlFor='region'>Hudud</Label>
					<Select>
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
					/>
				</div>

				<div>
					<Label htmlFor='image'>
						Markaz rasmi <span className='text-red-500'>*</span>
					</Label>
					<div className='border-2 border-dashed border-gray-300 dark:border-gray-600 mt-2 rounded-md p-6 text-center text-sm text-gray-500'>
						<div className='flex flex-col items-center justify-center gap-2'>
							<UploadCloud className='w-6 h-6 text-gray-500' />
							<p>Yuklash uchun bosing yoki faylni sudrab keling</p>
							<p className='text-xs text-gray-400'>PNG, JPG 5MB gacha</p>
							<Input type='file' id='image' className='hidden' onChange={handleImageChange}/>
						</div>
					</div>
				</div>

				<div>
					<Label htmlFor='phone'>Telefon raqami</Label>
					<Input id='phone' placeholder='+998' className='mt-2' />
				</div>

				<div>
					<Label>Yo'nalishlar (kamida bittasini tanlang)</Label>
					{fieldsData?.data?.map((dataF, index) => {
						const checkboxId = `optional-${index}`
						return (
							<div
								key={checkboxId}
								className='flex items-center space-x-2 mt-2'
							>
								<Checkbox id={checkboxId} />
								<Label htmlFor={checkboxId} className='text-sm'>
									{dataF?.name}
								</Label>
							</div>
						)
					})}
				</div>

				<Button
					type='submit'
					className='w-full bg-purple-400 hover:bg-purple-500 text-white font-medium'
				>
					Markaz qo'shish
				</Button>
			</div>
		</section>
	)
}
