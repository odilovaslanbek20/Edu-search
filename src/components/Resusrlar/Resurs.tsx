import { useState } from 'react'
import useGetHooks from '../Hooks/useGetHooks'
import { FaDownload } from 'react-icons/fa6'
import { Skeleton } from '../ui/skeleton'

type Resource = {
	id: number
	name: string
	image: string
	description: string
	media: string
}

function Resurs() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<{ data: Resource[] }>(
		`${url}/resources`
	)

	if (isLoading) {
		const skeletonArray = Array(10).fill(null)

		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-[50px]'>
				{skeletonArray.map((_, i) => (
					<div
						key={i}
						className='flex flex-col space-y-3 border border-gray-200 p-4 rounded-lg shadow-sm'
					>
						<Skeleton className='h-[125px] w-full rounded-xl' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[80%]' />
							<Skeleton className='h-4 w-[60%]' />
						</div>
					</div>
				))}
			</div>
		)
	}
	if (error)
		return (
			<div className='text-center py-10 text-red-600'>
				Error: {error.message}
			</div>
		)

	return (
		<section className='max-w-7xl mx-auto my-10 px-4'>
			<h2 className='text-3xl font-bold mb-8 text-center text-gray-800'>
				Resurslar
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{data?.data.map(item => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</section>
	)
}

function Card({ item }: { item: Resource }) {
	const [transform, setTransform] = useState('')

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = ((y - centerY) / centerY) * 15
		const rotateY = ((centerX - x) / centerX) * 15

		setTransform(
			`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
		)
	}

	const handleMouseLeave = () => {
		setTransform('perspective(600px) rotateX(0deg) rotateY(0deg)')
	}

	return (
		<div
			className='bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col'
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transform,
				transition: 'transform 0.2s ease',
			}}
		>
			<img
				src={item.image}
				alt={item.name}
				className='w-full h-48 object-cover'
			/>
			<div className='p-5 flex flex-col flex-grow'>
				<h3 className='text-xl font-semibold mb-2 text-gray-900'>
					{item.name}
				</h3>
				<p className='text-gray-600 text-sm flex-grow'>
					{item.description.length > 100
						? item.description.slice(0, 100) + '...'
						: item.description}
				</p>
				<a
					href={item.media}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1D96] px-5 py-2 text-white font-semibold text-sm hover:bg-[#3b137c] transition-colors '
					download
				>
					<FaDownload className='text-white text-lg' />
					Yuklab olish
				</a>
			</div>
		</div>
	)
}

export default Resurs
