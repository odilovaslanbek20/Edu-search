import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import { PiGraduationCap } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'
import { FaStickyNote } from 'react-icons/fa'
import useGetHooks from '../Hooks/useGetHooks'

export default function UserCard() {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')
  const {data, isLoading, error} = useGetHooks(`${url}/reseption`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		}
	})

	console.log(data);
	console.log(isLoading);
	console.log(error);
	

	return (
		<section className='w-[90%] m-auto my-20'>
			<div className='max-w-xs rounded-2xl border border-[#e9d8fd] bg-[#f9f3ff] p-4 shadow-md space-y-3 text-sm text-gray-800'>
				<img
					src='https://images.unsplash.com/photo-1607082349566-187342175e2c?auto=format&fit=crop&w=800&q=80'
					alt='Cover'
					className='w-full h-36 object-cover rounded-xl'
				/>
				<h2 className='text-xl font-bold text-purple-700'>Aslanbek</h2>
				<p className='flex items-center gap-2'>
					<FaMapMarkerAlt className='text-red-600' />
					<span className='font-semibold'>Manzil:</span> skjckjsnk scxs,
					Toshkent
				</p>
				<p className='flex items-center gap-2'>
					<LuCalendarDays className='text-gray-700' />
					<span className='font-semibold'>Tashrif sanasi:</span> 22 June 2025 at
					19:00
				</p>
				<p className='flex items-center gap-2'>
					<PiGraduationCap className='text-gray-700' />
					<span className='font-semibold'>Yo'nalish:</span> optional
				</p>
				<p className='flex items-center gap-2 font-semibold text-yellow-600'>
					<FaStickyNote />
					PENDING
				</p>
				<button className='flex items-center text-red-600 gap-1 text-sm mt-1 hover:underline'>
					<FaTrash />
					O'chirish
				</button>
			</div>
		</section>
	)
}
