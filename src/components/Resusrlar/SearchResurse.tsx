import { Input } from '../ui/input'

function SearchResurse() {
	return (
		<section className='w-full px-4 sm:px-6 md:px-8 my-8'>
			<div className='max-w-2xl mx-auto'>
				<h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
					Resurslarni qidirish
				</h2>
				<div className='relative'>
					<Input
						type='text'
						placeholder='Masalan: PDF, video, maqola...'
						className='w-full rounded-full border border-gray-300 shadow-md px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#4A1D96] focus:border-transparent transition-all duration-300'
					/>
				</div>
			</div>
		</section>
	)
}

export default SearchResurse
