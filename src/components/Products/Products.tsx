import useGetHooks from '../Hooks/useGetHooks'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'

// shadcn/ui Button komponentini o'zingizning loyihangizdagi yo'l bilan import qiling
import { Button } from '@/components/ui/button'

function Products() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks(`${url}/centers`)

	type Major = {
		id: number
		name: string
		image?: string
		fieldId?: number
		subjectId?: number | null
		majoritems?: object
	}

	type User = {
		id: number
		firstName: string
		lastName: string
		email?: string
		image?: string
		phone?: string
		role?: string
		isActive?: boolean
	}

	type Region = {
		id: number
		name: string
		regionId?: number
		seoId?: number
	}

	type Center = {
		id: number
		name: string
		phone?: string
		region?: Region
		majors?: Major[]
		user?: User
		image?: string
	}

	const [likedCenters, setLikedCenters] = useState<{ [key: number]: boolean }>({})

	const toggleLike = (id: number) => {
		setLikedCenters(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	if (isLoading) {
		return (
			<div className='fixed w-full h-screen z-50 bg-white'>
				<div className='flex flex-col items-center justify-center h-screen'>
					<div className='animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16 mb-4'></div>
					<p className='text-lg text-gray-700'>Loading data...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='fixed w-full h-screen bg-white z-50 px-5'>
				<div className='flex justify-center items-center h-[200px]'>
					<div className='bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-md'>
						Markazlar haqida malumot topilmadi...
					</div>
				</div>
			</div>
		)
	}

	console.log(data.data);
	

	return (
		<section className='max-w-7xl mx-auto px-6 py-10 min-h-screen'>
			<h1 className='text-4xl font-bold mb-12 text-center text-[#461773]'>
				O'quv markazlar ro'yxati
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
				{data && data?.data?.length > 0 ? (
					data.data.map((center: Center) => (
						<div
							key={center.id}
							className='relative bg-white border border-blue-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col'
						>
							<Button
								variant='ghost'
								className='absolute top-4 right-4 p-0 text-2xl'
								type='button'
								onClick={() => toggleLike(center.id)}
								aria-label='Like center'
							>
								{likedCenters[center.id] ? (
									<AiFillHeart className='text-red-500' />
								) : (
									<AiOutlineHeart className='text-gray-400 hover:text-red-500 transition-colors duration-300' />
								)}
							</Button>

							<img
								src={center?.image}
								alt={center?.name}
								className='w-full h-48 object-cover rounded-t-lg mb-4'
							/>
							<h2 className='text-2xl font-semibold mb-3 text-[#461773]'>
								{center.name}
							</h2>
							<p className='text-gray-600 mb-1'>
								<span className='font-semibold'>Hudud:</span>{' '}
								{center.region?.name || "Noma'lum"}
							</p>
							<p className='text-gray-600 mb-1'>
								<span className='font-semibold'>Telefon:</span>{' '}
								{center.phone || "Ko'rsatilmagan"}
							</p>
							<p className='text-gray-600 font-medium mt-auto'>
								Mas'ul:{' '}
								{center.user
									? `${center.user.firstName} ${center.user.lastName}`
									: "Noma'lum"}
							</p>
						</div>
					))
				) : (
					<p className='text-center text-gray-500 col-span-full'>
						Markazlar topilmadi.
					</p>
				)}
			</div>
		</section>
	)
}

export default Products
