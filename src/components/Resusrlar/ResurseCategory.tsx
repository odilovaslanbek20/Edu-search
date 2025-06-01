import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '../ui/skeleton'
import { MdReplyAll } from 'react-icons/md'
import { GrResources } from 'react-icons/gr'

interface ResursCategory {
	id: number
	name: string
	image: string
}

interface Resource {
	id: number
	title: string
	categoryId: number
}

interface ResursCategoryProps {
	onSelectCategory: (id: number | null) => void
	selectedId: number | null
}

function ResursCategory({ onSelectCategory, selectedId }: ResursCategoryProps) {
	const url = import.meta.env.VITE_API_URL

	const {
		data: categoryData,
		isLoading: categoryLoading,
		error: categoryError,
	} = useGetHooks<{ data: ResursCategory[] }>(`${url}/categories`)

	const {
		data: resourceData,
		isLoading: resourceLoading,
		error: resourceError,
	} = useGetHooks<{ data: Resource[] }>(`${url}/resources`)

	const staticCategories = [
		{
			id: null,
			name: 'Barcha Resurslar',
			icon: <MdReplyAll className='text-[#461773] text-[40px]' />,
		},
		{
			id: 0,
			name: 'Mening Resurslarim',
			icon: <GrResources className='text-[#461773] text-[35px]' />,
		},
	]

	console.log(resourceData)

	if (categoryLoading || resourceLoading) {
		const skeletonArray = Array(6).fill(null)

		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6 mt-[100px]'>
				{skeletonArray?.map((_, i) => (
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

	if (categoryError || resourceError)
		return <p className='text-center py-10 text-red-500'>Xatolik yuz berdi</p>

	return (
		<section className='w-[90%] m-auto my-[30px] max-[410px]:w-full'>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-[30px] max-[461px]:gap-[10px]'>
				{staticCategories?.map(item => (
					<div
						key={item.id}
						onClick={() => onSelectCategory(item?.id)}
						className={`cursor-pointer w-full flex flex-col items-center text-center space-y-3 max-[461px]:space-y-1 border p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white ${
							selectedId === item?.id
								? 'border-violet-600 ring-2 ring-violet-300'
								: ''
						}`}
					>
						<div className='w-full h-[100px] flex items-center justify-center bg-gray-100 rounded-lg'>
							{item?.icon}
						</div>
						<h3 className='text-base font-medium text-gray-800 max-[461px]:text-[14px]'>
							{item?.name}
						</h3>
					</div>
				))}

				{categoryData?.data.map(item => (
					<div
						key={item.id}
						onClick={() => onSelectCategory(item?.id)}
						className={`cursor-pointer w-full flex flex-col items-center text-center space-y-3 max-[461px]:space-y-1 border p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white ${
							selectedId === item?.id
								? 'border-violet-600 ring-2 ring-violet-300'
								: ''
						}`}
					>
						<img
							src={`${url}/image/${item?.image}`}
							alt={item?.name}
							className='h-[100px] w-full rounded-lg object-cover'
						/>
						<h3 className='text-base font-medium text-gray-800 max-[461px]:text-[14px]'>
							{item?.name}
						</h3>
					</div>
				))}
			</div>
		</section>
	)
}

export default ResursCategory
