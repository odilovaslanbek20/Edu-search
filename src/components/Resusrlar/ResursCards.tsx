import { useState } from 'react'
import { FaBook } from 'react-icons/fa'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '../ui/skeleton'
import usePostHooks from '../Hooks/usePostHooks'

interface ResursCategory {
	id: number
	name: string
	image: string
	status: string
}

interface Upload {
	data: string
}

const ResourceCard = () => {
	const [isOpen, setIsOpen] = useState(false)
	const url = import.meta.env.VITE_API_URL
	const [category, setCategory] = useState('')
	const [name, setName] = useState('')
	const [tavsiv, setTavsif] = useState('')
	const [mediya, setMediya] = useState('')
	const [file, setFile] = useState<File | null>(null)
	const { data, isLoading, error } = useGetHooks<{ data: ResursCategory[] }>(
		`${url}/categories`
	)
	const { response, loading, error: error1, postData } = usePostHooks()
	const {
		response: response1,
		loading: loading1,
		error: error2,
		postData: postData1,
	} = usePostHooks<Upload>()

	if (isLoading || loading || loading1) {
		const skeletonArray = Array(6).fill(null)

		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6 my-[50px]'>
				{skeletonArray.map((_, i) => (
					<div
						key={i}
						className='flex flex-col space-y-3 border border-gray-200 p-4 rounded-xl shadow-md animate-pulse'
					>
						<Skeleton className='h-[100px] w-full rounded-lg' />
						<Skeleton className='h-4 w-3/4' />
					</div>
				))}
			</div>
		)
	}

	if (error || error1 || error2)
		return <p className='text-center py-10 text-red-500'>Xatolik yuz berdi</p>

	console.log(response)
	console.log('respons1', response1)
	console.log(data)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const token = localStorage.getItem('accessToken')

		if (!token) {
			alert('Token topilm topilmadi!')
			return
		}

		const formData = new FormData()
		if (file) {
			formData.append('image', file)
		}

		const img = await postData1(`${url}/upload`, formData)

		if (img && 'data' in img) {
			const resourceData = {
				categoryId: category,
				name: name,
				description: tavsiv,
				media: mediya,
				image: `https://findcourse.net.uz/api/image/${img.data}`,
			}

			await postData(`${url}/resources`, resourceData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			setIsOpen(false)
			window.location.reload()
		}
	}

	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className='flex items-center justify-center my-6 w-full px-4'
			>
				<div className='w-full max-w-sm bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer'>
					<div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full'>
						<FaBook className='text-blue-600 text-lg' />
					</div>
					<div className='text-sm'>
						<h3 className='font-semibold text-gray-800'>Resurs Yaratish</h3>
						<p className='text-gray-500 text-xs'>
							Yangi darslik, link yoki material qo‘shish
						</p>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl animate-fade-in'>
						<h2 className='text-lg font-bold mb-4 text-gray-800 dark:text-white'>
							Yangi resurs qo‘shish
						</h2>

						<form onSubmit={handleSubmit} className='space-y-4'>
							<select
								onChange={e => setCategory(e.target.value)}
								className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								<option disabled selected>
									Kategoriya tanlang
								</option>
								{data?.data?.map(item => (
									<option key={item?.id} value={item?.id}>
										{item?.name}
									</option>
								))}
							</select>

							<input
								onChange={e => setName(e.target.value)}
								type='text'
								placeholder='Resurs nomi'
								className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							<textarea
								onChange={e => setTavsif(e.target.value)}
								placeholder='Tavsif'
								className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							<input
								onChange={e => setMediya(e.target.value)}
								type='text'
								placeholder='Media havola (.pdf, .link)'
								className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>

							<input
								onChange={e => {
									if (e.target.files && e.target.files.length > 0) {
										setFile(e.target.files[0])
									}
								}}
								type='file'
								className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200'
							/>

							<div className='flex justify-between mt-4'>
								<button
									type='button'
									onClick={() => setIsOpen(false)}
									className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition'
								>
									Yopish
								</button>
								<button
									type='submit'
									className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
								>
									Saqlash
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default ResourceCard
