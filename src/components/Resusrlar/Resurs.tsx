import { useState } from 'react'
import useGetHooks from '../Hooks/useGetHooks'
import { FaDownload } from 'react-icons/fa6'
import { Skeleton } from '../ui/skeleton'
import { Input } from '../ui/input'
import { FaSearch } from 'react-icons/fa'
import ResursCategory from './ResurseCategory'
import ResourceCards from './ResursCards'

type Resource = {
	categoryId: number
	id: number
	name: string
	image: string
	description: string
	media: string
}

interface MyData {
	id: number
	resources: Resource[]
}

function Resurs() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<{ data: Resource[] }>(
		`${url}/resources`
	)

	const {
		data: myData,
		isLoading: myDataLoading,
		error: myDataError,
	} = useGetHooks<{ data: MyData }>(`${url}/users/mydata`)

	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null) 

	const [searchTerm, setSearchTerm] = useState('')

	if (isLoading || myDataLoading) {
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
	if (error || myDataError)
		return (
			<div className='text-center py-10 text-red-600'>
				Error: {error?.message || myDataError?.message}
			</div>
		)

		const filteredData: Resource[] =
		selectedCategoryId === 0
			? myData?.data?.resources.filter(item =>
					item.name.toLowerCase().includes(searchTerm.toLowerCase())
				) || []
			: data?.data
					.filter(item =>
						item.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.filter(item =>
						selectedCategoryId === null || item.categoryId === selectedCategoryId
					) || []
	


		console.log(myData);
		

	return (
		<section className='max-w-7xl mx-auto my-10 px-4'>
			<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
				Resurslar
			</h2>

			

			<ResursCategory onSelectCategory={setSelectedCategoryId} selectedId={selectedCategoryId} />

			<ResourceCards/>

			<div className='max-w-md mx-auto mb-10'>
				<div className='relative'>
					<FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
					<Input
						type='text'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						placeholder='PDF, maqola, video...'
						className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-300 text-base'
					/>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
				{filteredData.length > 0 ? (
					filteredData.map(item => <Card key={item.id} item={item} />)
				) : (
					<p className='text-center col-span-full text-gray-500'>
						Mos resurs topilmadi.
					</p>
				)}
			</div>
		</section>
	)
}

function Card({ item }: { item: Resource }) {
	const [transform, setTransform] = useState('')

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (window.innerWidth < 1024) return 
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
		<section>
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
					src={item?.image}
					alt={item?.name}
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
						href={item?.media}
						download
						target='_blank'
						className='mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1D96] px-5 py-2 text-white font-semibold text-sm hover:bg-[#3b137c] transition-colors '
					>
						<FaDownload className='text-white text-lg' />
						Yuklab olish
					</a>
				</div>
			</div>
		</section>
	)
}

export default Resurs
