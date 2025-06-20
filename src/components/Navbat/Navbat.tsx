import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import { PiGraduationCap } from 'react-icons/pi'
import { LuCalendarDays } from 'react-icons/lu'
import { FaStickyNote } from 'react-icons/fa'
import useGetHooks from '../Hooks/useGetHooks'
import { useDelete } from '../Hooks/useDeleteHooks'
import { toast } from 'react-toastify'

interface Center {
	id: number
	name: string
	phone: string
	regionId: number
	address: string
	image: string
}

interface Filial {
	id: number
	name: string
	phone: string
	regionId: number
	centerId: number
	address: string
}

interface Major {
	id: number
	name: string
	image: string
	fieldId: number | null
	subjectId: number
}

interface Reception {
	id: number
	status: string
	visitDate: string
	center: Center
	centerId: number
	filial: Filial
	filialId: number
	major: Major
	majorId: number
	createdAt: string
	updatedAt: string
	userId: number
}

interface UserData {
	receptions: Reception[]
}

export default function UserCard() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<{ data: UserData }>(
		`${url}/users/mydata`
	)
	const { deleteItem, loading, error: deleteError } = useDelete()

	const handleDelete = async (id: number) => {
		try {
			await deleteItem(`${url}/reseption/${id}`)
			toast.success("Ma'lumot muvaffaqiyatli o'chirildi")
			setTimeout(() => {
				window.location.reload()
			}, 3500)
		} catch (error) {
			console.error(error)
			toast.error("O'chirishda xatolik yuz berdi")
		}
	}

	if (isLoading) {
		return <p className='text-center mt-10'>Yuklanmoqda...</p>
	}

	if (error || deleteError) {
		return <p className='text-center mt-10 text-red-600'>Xatolik yuz berdi</p>
	}

	const receptions = data?.data?.receptions || []

	if (receptions?.length === 0) {
		return (
			<section className='w-full text-center my-20'>
				<p className='text-lg text-gray-700 font-semibold'>
					Siz darsga yozilmagansiz.
				</p>
			</section>
		)
	}

	return (
		<section className='w-[90%] m-auto my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{receptions.map(item => (
				<div
					key={item?.id}
					className='max-w-xs rounded-2xl border border-[#e9d8fd] bg-[#f9f3ff] p-4 shadow-md space-y-3 text-sm text-gray-800'
				>
					<img
						src={`${url}/image/${item?.center?.image}`}
						alt='Cover'
						className='w-full h-36 object-cover rounded-xl'
					/>
					<h2 className='text-xl font-bold text-purple-700'>
						{item?.center?.name}
					</h2>

					<p className='flex items-center gap-2'>
						<FaMapMarkerAlt className='text-red-600' />
						<span className='font-semibold'>Manzil:</span>{' '}
						{item?.center?.address}
					</p>

					<p className='flex items-center gap-2'>
						<LuCalendarDays className='text-gray-700' />
						<span className='font-semibold'>Tashrif sanasi:</span>{' '}
						{new Date(item.visitDate).toLocaleString('uz-UZ', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</p>

					<p className='flex items-center gap-2'>
						<PiGraduationCap className='text-gray-700' />
						<span className='font-semibold'>Yo'nalish:</span>{' '}
						{item?.major?.name}
					</p>

					<p className='flex items-center gap-2 font-semibold text-yellow-600'>
						<FaStickyNote />
						{item.status}
					</p>

					<button
						onClick={() => handleDelete(item?.id)}
						className='flex items-center text-red-600 gap-1 text-sm mt-1 hover:underline'
					>
						{loading ? (
							"O'chirilmoqda"
						) : (
							<>
								<FaTrash className='inline-block mr-1' />
								O'chirish
							</>
						)}
					</button>
				</div>
			))}
		</section>
	)
}
