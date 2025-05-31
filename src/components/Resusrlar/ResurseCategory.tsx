import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '../ui/skeleton'

interface ResursCategory {
		id: number
		name: string
		image: string
}

function ResursCategory() {
	const url = import.meta.env.VITE_API_URL
	const {data, isLoading, error} = useGetHooks<{data: ResursCategory[]}>(`${url}/categories`)

	if (isLoading) {
		const skeletonArray = Array(4).fill(null)

		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-[100px]'>
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

	console.log(data);
	console.log(error);
	

	return (
		<>	
		 <section>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-[100px]'>
				{data?.data?.map((item) => (
					<div
						key={item?.id}
						className='flex flex-col space-y-3 border border-gray-200 p-4 rounded-lg shadow-sm'
					>
						<img
							src={`${url}/image/${item?.image}`}
							alt='resurs'
							className='h-[125px] w-full rounded-xl object-cover'
						/>
						<div className='space-y-2'>
							<h3 className='text-lg font-semibold'>{item?.name}</h3>
						</div>
					</div>
				))}
				</div>
		 </section>
		</>
	)
}

export default ResursCategory