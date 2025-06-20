import { useState } from 'react'
import useGetHooks from '../Hooks/useGetHooks'
import { AiOutlineHeart } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDelete } from '../Hooks/useDeleteHooks'
import { toast } from 'react-toastify'
import BtnLoading from '../Btn/BtnLoading'
import usePostHooks from '../Hooks/usePostHooks'
import { BiSearch } from 'react-icons/bi'
import { IoHeartDislikeOutline } from "react-icons/io5";

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
	seoId: number
	id: number
	name: string
	phone?: string
	region?: Region
	majors?: Major[]
	user?: User
	image?: string
}

type UserIDResponse = {
	data: {
		id: number
	}
}

function Products() {
	const { t } = useTranslation()
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<{ data: Center[] }>(
		`${url}/centers`
	)

	const [searchTerm, setSearchTerm] = useState('')

	if (isLoading) {
		const skeletonArray = Array(10).fill(null)
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-[100px] mb-[40px]'>
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

	if (error) {
		return (
			<div className='fixed w-full h-screen bg-white z-50 px-5'>
				<div className='flex justify-center items-center h-full'>
					<Alert variant='destructive'>
						<AlertDescription>
							Markazlar haqida ma'lumot topilmadi...
						</AlertDescription>
					</Alert>
				</div>
			</div>
		)
	}

	const centerData: Center[] | undefined = data?.data

	const filteredCenters = centerData?.filter(center =>
		center?.name?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<section className='max-w-7xl mx-auto px-6 py-10 min-h-screen'>
			<h1 className='text-4xl font-bold mb-12 max-[1024px]:mb-[30px] text-center text-[#461773]'>
				{t('heroTitle')}
			</h1>

			<form className='w-full flex justify-center my-6'>
				<div className='relative w-[90%] sm:w-[60%]'>
					<input
						type='text'
						placeholder='Qidiruv orqali markaz toping...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='
							w-full pl-10 pr-4 py-2
							rounded-full border border-gray-300
							shadow-sm focus:outline-none focus:ring-2 focus:ring-[#461773] focus:border-transparent
							text-sm sm:text-base
							placeholder-gray-400
						'
					/>
					<BiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
				</div>
			</form>

			{filteredCenters?.length === 0 ? (
				<p className='text-center text-gray-500 mt-6'>
					"{searchTerm}" bo‘yicha hech qanday markaz topilmadi.
				</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredCenters?.map(center => (
						<CardWith3DEffect key={center.id} center={center} t={t} url={url} />
					))}
				</div>
			)}
		</section>
	)
}

function CardWith3DEffect({
	center,
	t,
	url,
}: {
	center: Center
	t: (key: string) => string
	url: string
}) {
	const token = localStorage.getItem('accessToken')
	const [transform, setTransform] = useState('')
	const [liked, setLiked] = useState(false)

	const {
		data: myData,
		isLoading: myDataLoading,
		error: myDataError,
	} = useGetHooks<UserIDResponse>(`${url}/users/mydata`)

	const {
		deleteItem,
		loading: centerDeleteLoading,
		error: centerDeleteError,
	} = useDelete()

	const {
		deleteItem: deleteLike,
		loading: unlikeLoading,
		error: unlikeError,
	} = useDelete()

	const {
		postData,
		loading: likeLoading,
		error: likeError,
	} = usePostHooks()

	console.log(myDataLoading);
	
	if (myDataError || centerDeleteError || likeError || unlikeError) {
		return (
			<div className='fixed w-full h-screen bg-white z-50 px-5'>
				<div className='flex justify-center items-center h-full'>
					<Alert variant='destructive'>
						<AlertDescription>
							Markazlar haqida ma'lumot topilmadi...
						</AlertDescription>
					</Alert>
				</div>
			</div>
		)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (window.innerWidth < 1024) return
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = ((y - centerY) / centerY) * 10
		const rotateY = ((centerX - x) / centerX) * 10

		setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
	}

	const handleMouseLeave = () => {
		setTransform('perspective(600px) rotateX(0deg) rotateY(0deg)')
	}

	const handleDelete = async (e: React.FormEvent) => {
		e.preventDefault()

		await deleteItem(`${url}/centers/${center?.id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
		toast.success("O'chirildi...")
		setTimeout(() => {
			window.location.reload()
		}, 3500)
	}

	const handleLike = async (e: React.FormEvent) => {
		e.preventDefault()
		if (liked) return

		try {
			await postData(
				`${url}/liked`,
				{ centerId: center?.id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			toast.success('Like qoʻshildi!')
			setLiked(true)
		} catch (err) {
			console.error(err)
			toast.error('Like qoʻshilmadi.')
		}
	}

	const handleUnlike = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await deleteLike(`${url}/liked/${center?.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			toast.success('Unlike qilindi!')
			setLiked(false)
			setTimeout(() => {
				window.location.reload()
			}, 3500);
		} catch (err) {
			console.error(err)
			toast.error('Unlike qilishda xatolik yuz berdi.')
		}
	}

	return (
		<Card
			className='relative border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg'
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ transform, transition: 'transform 0.2s ease' }}
		>
			<div className='absolute top-3 right-3 flex gap-2'>
				{myData?.data?.id === center?.user?.id && (
					<>
						<Button variant='ghost' size='icon' className='bg-[#461773] hover:bg-[#5f2099] text-white hover:text-yellow-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 cursor-pointer focus:ring-yellow-400 focus:ring-offset-1'>
							<FaEdit className='text-xl' />
						</Button>

						<Button
							onClick={handleDelete}
							variant='ghost'
							size='icon'
							className='bg-[#461773] hover:bg-[#5f2099] text-white hover:text-red-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-400 focus:ring-offset-1'
						>
							{centerDeleteLoading ? <BtnLoading /> : <FaTrash className='text-xl' />}
						</Button>
					</>
				)}

				{liked ? (
					<Button
						onClick={handleUnlike}
						variant='ghost'
						size='icon'
						className='bg-[#461773] hover:bg-[#5f2099] text-white hover:text-red-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-400 focus:ring-offset-1'
					>
						{unlikeLoading ? <BtnLoading /> : <IoHeartDislikeOutline className='text-xl text-pink-400' />}
					</Button>
				) : (
					<Button
						onClick={handleLike}
						variant='ghost'
						size='icon'
						disabled={likeLoading}
						className='bg-[#461773] hover:bg-[#5f2099] text-white hover:text-pink-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 cursor-pointer focus:ring-pink-400 focus:ring-offset-1'
					>
						{likeLoading ? <BtnLoading /> : <AiOutlineHeart className='text-xl' />}
					</Button>
				)}
			</div>

			{center?.image && (
				<img
					src={`${url}/image/${center?.image}`}
					alt={center?.name}
					className='w-full h-[200px] object-cover mt-[-25px]'
				/>
			)}

			<CardHeader>
				<CardTitle className='text-2xl font-semibold text-[#461773] line-clamp-1'>
					{center?.name}
				</CardTitle>
			</CardHeader>

			<CardContent className='space-y-1 text-sm mt-[-15px] text-muted-foreground'>
				<div className='flex items-center gap-2'>
					<span className='text-[#461773] font-semibold'>📍 Hudud:</span>
					<span>{center?.region?.name || "Noma'lum"}</span>
				</div>

				<a href={`tel:${center.phone}`} className='flex items-center gap-2'>
					<span className='text-[#461773] font-semibold'>📞 Telefon:</span>
					<span>{center?.phone}</span>
				</a>

				<div className='flex items-center gap-2'>
					<span className='text-[#461773] font-semibold'>👤 Mas'ul:</span>
					<span>{`${center?.user?.firstName} ${center?.user?.lastName}`}</span>
				</div>

				<div className='mt-4'>
					<Link
						to={`/center/${center?.id}`}
						className='inline-block text-white bg-[#461773] hover:bg-[#5f2099] px-4 py-2 rounded-md text-sm font-medium transition'
					>
						{t('learnMore')}
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}


export default Products
