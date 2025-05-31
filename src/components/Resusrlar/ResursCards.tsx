import { FaBook } from 'react-icons/fa'

const ResourceCard = () => {
	return (
		<>
			<div className='flex items-center justify-center my-6 w-full px-4'>
				<div className='w-full max-w-sm bg-gradient-to-br from-white to-gray-50 border border-double border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4'>
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
		</>
	)
}

export default ResourceCard
