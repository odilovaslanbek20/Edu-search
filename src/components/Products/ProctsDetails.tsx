import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Star,
	Phone,
	MapPin,
	Pencil,
	Trash2,
	GraduationCap,
	Clock,
} from 'lucide-react'
import React, { useState } from 'react'
import useGetHooks from '../Hooks/useGetHooks'
import { useParams } from 'react-router-dom'
import usePostHooks from '../Hooks/usePostHooks'
import { toast } from 'react-toastify'
import { useDelete } from '../Hooks/useDeleteHooks'
import { FaStar } from 'react-icons/fa'
import usePutData from '../Hooks/usePutData'
import { HiArrowLeft } from 'react-icons/hi2'

interface User {
	id: string
	firstName: string
	lastName: string
	role: string
	image?: string
}

interface Region {
	id: string
	name: string
}

interface Major {
	id: string
	name: string
}

interface Filial {
	id: string
	name: string
	image?: string
	region?: Region
	phone: string
	address: string
}

interface Comment {
	comments: string
	id: string
	user?: User
	createdAt: string
	star: number
	text: string
}

interface Center {
	id: string
	name: string
	image?: string
	region?: Region
	phone: string
	address: string
	user?: User
	majors?: Major[]
	filials?: Filial[]
	comments?: Comment[]
}

interface myData {
	id: number
}

interface FormData {
	text: string
	star: number
}

const ProductDetails = () => {
	const url = import.meta.env.VITE_API_URL
	const { id } = useParams<{ id: string }>()
	const token = localStorage.getItem('accessToken')
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [text, setText] = useState<string>('')
	const [comments, setComment] = useState<string>('')
	const [rating, setRating] = useState<number>(0)
	const [editId, setEditId] = useState<string | null>(null)

	const { data, isLoading, error } = useGetHooks<{ data: Center }>(
		`${url}/centers/${id}`
	)
	const {
		data: myData,
		isLoading: myDataLoading,
		error: myDataError,
	} = useGetHooks<{ data: myData }>(`${url}/users/mydata`)
	const {
		data: dataComments,
		isLoading: loadingComments,
		error: errorComments,
	} = useGetHooks(`${url}/comments`)

	const {
		response,
		loading: postLoading,
		error: postError,
		postData,
	} = usePostHooks()

	const { deleteItem, loading: deleteLoading, error: deleteError } = useDelete()

	const {
		putData,
		loading: editLoading,
		error: editError,
		response: editRes,
	} = usePutData()

	console.log(data || myData || dataComments || response || editRes)
	console.log(
		isLoading ||
			myDataLoading ||
			loadingComments ||
			postLoading ||
			deleteLoading ||
			editLoading
	)
	console.log(
		error ||
			myDataError ||
			errorComments ||
			postError ||
			deleteError ||
			editError
	)

	const center = data?.data
	const myId = myData?.data?.id

	console.log('myID', myId)

	const comment = async (e: React.FormEvent) => {
		e.preventDefault()
		const centerID = center?.id

		if (text === '' || rating === 0 || centerID === undefined) {
			toast.error('Malumot toldirilmagan...')
			return
		}

		const formData = {
			text: text,
			star: rating,
			centerId: centerID,
		}

		await postData(`${url}/comments`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
		toast.success('Ajoyib')
		setTimeout(() => {
			window.location.reload()
		}, 3500)
	}

	const handleEdit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!editId) return toast.error('Komment ID topilmadi')

		const formData: FormData = {
			text: comments,
			star: rating,
		}

		await putData(`${url}/comments/${editId}`, formData, token ?? undefined)

		if (editRes) {
			toast.error('Xatolik yuz berdi')
		} else {
			toast.success('Komment muvaffaqiyatli tahrirlandi!')
			setIsEdit(false)
			setTimeout(() => window.location.reload(), 3500)
		}
	}

	const onDelete = async (id: string) => {
		await deleteItem(`${url}/comments/${id}`)
		toast.success('Ajoyib')
		setTimeout(() => {
			window.location.reload()
		}, 3500)
	}

	return (
		<>
			{isEdit && (
				<div className='fixed z-10 w-full h-screen'>
					<div className='absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center'>
						<div className='bg-white rounded-xl shadow-xl p-6 max-w-md w-full'>
							<h2 className='text-xl font-semibold mb-4 text-center'>
								Kommentni tahrirlash
							</h2>
							<form onSubmit={handleEdit}>
								<textarea
									value={comments}
									onChange={e => setComment(e.target.value)}
									placeholder='Komment yozing...'
									className='w-full p-3 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>

								<div className='flex justify-center mt-4 mb-4'>
									{[1, 2, 3, 4, 5].map(star => (
										<FaStar
											key={star}
											size={30}
											onClick={() => setRating(star)}
											className={`cursor-pointer transition-colors ${
												star <= rating ? 'text-yellow-400' : 'text-gray-300'
											}`}
										/>
									))}
								</div>

								<button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'>
									Saqlash
								</button>
							</form>
						</div>
					</div>
				</div>
			)}

			<section className='mt-10 max-w-6xl mx-auto px-4 py-6'>
				<button
					onClick={() => window.history.back()}
					className='inline-flex items-center gap-2 text-[#461773] hover:text-[#5f2099] cursor-pointer text-sm font-medium transition-all duration-300'
				>
					<HiArrowLeft className='w-5 h-5' />
					Back
				</button>
				<Card className='flex flex-col md:flex-row gap-4 overflow-hidden min-h-[500px]'>
					<div className='w-full md:w-1/2 flex flex-col'>
						<img
							src={`https://findcourse.net.uz/api/image/${center?.image}`}
							alt={center?.name}
							className='w-full h-64 object-cover rounded-md'
						/>
						<CardContent className='p-4 space-y-4'>
							<h3 className='text-base md:text-lg font-semibold'>
								Bizning filiallar
							</h3>

							<div>
								<div className='flex items-center gap-2 font-medium text-sm md:text-base'>
									<GraduationCap className='w-4 h-4' />
									Mavjud kurslar
								</div>
								{center?.majors?.map(major => (
									<Badge variant='outline' className='mt-2 text-xs md:text-sm'>
										{major?.name}
									</Badge>
								))}
							</div>

							<Button className='bg-purple-800 text-white hover:bg-purple-900 w-full'>
								<Clock className='w-4 h-4 mr-2' /> Darsga yozilish
							</Button>
						</CardContent>
					</div>

					<div className='w-full md:w-1/2 p-4 flex flex-col justify-between'>
						<div className='space-y-3'>
							<div className='flex justify-between items-start'>
								<div>
									<h1 className='text-xl md:text-2xl font-bold'>
										{center?.name}
									</h1>
									<div className='flex items-center text-sm text-muted-foreground mt-1'>
										<MapPin className='w-4 h-4 mr-1' />
										{center?.address}
									</div>
									<div className='flex items-center text-sm text-muted-foreground mt-1'>
										<Phone className='w-4 h-4 mr-1' />
										{center?.phone}
									</div>
								</div>
								<div className='flex items-center gap-1 bg-purple-100 text-purple-900 px-2 py-1 rounded-full text-sm self-start'>
									<Star className='w-4 h-4 fill-current text-yellow-500' />
									3.5
								</div>
							</div>

							<form onSubmit={comment}>
								<div className='mb-2.5'>
									<label
										htmlFor='comment'
										className='block mb-1 font-medium text-sm md:text-base'
									>
										Sharhlar (2)
									</label>
									<Textarea
										onChange={e => setText(e.target.value)}
										placeholder='Bu markaz haqida fikrlaringizni bildiring...'
									/>
								</div>

								<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
									<div className='flex items-center text-sm gap-2'>
										<span className='whitespace-nowrap'>Reyting:</span>
										{[1, 2, 3, 4, 5].map(num => (
											<Star
												key={num}
												className={`w-5 h-5 cursor-pointer transition-colors ${
													num <= rating
														? 'text-yellow-500 fill-yellow-500'
														: 'text-gray-300'
												}`}
												onClick={() => setRating(num)}
											/>
										))}
									</div>
									<Button
										disabled={postLoading}
										className='bg-purple-300 text-purple-900 hover:bg-purple-400 w-full sm:w-auto'
									>
										{postLoading ? 'Yuklanmoqda...' : 'Sharh qoldirish'}
									</Button>
								</div>
							</form>
						</div>

						<div className='space-y-4 pt-4 mt-4 overflow-auto max-h-[250px]'>
							{center?.comments?.map(comment => {
								const isId = comment?.user?.id === myId
								return (
									<div
										key={comment?.id}
										className='bg-muted p-3 rounded-lg relative'
									>
										<div className='flex items-start gap-3 max-[900px]:flex-col'>
											<Avatar className='w-8 h-8'>
												<AvatarImage
													src={`https://findcourse.net.uz/api/image/${comment?.user?.image}`}
												/>
												<AvatarFallback>OA</AvatarFallback>
											</Avatar>
											<div className='text-sm'>
												<p className='font-semibold'>
													{comment?.user?.firstName} {comment?.user?.lastName}
													<span className='text-yellow-500'>
														{Array(comment?.star).fill('⭐️').join('')}
													</span>
												</p>
												<p>{comment?.text}</p>
											</div>
										</div>
										<div className='absolute right-2 top-2 flex gap-2 text-muted-foreground text-xs'>
											<span>
												{new Date(comment?.createdAt).toLocaleDateString()}
											</span>
											{isId && (
												<div className='flex gap-2'>
													<Pencil
														onClick={() => {
															setIsEdit(true)
															setEditId(comment?.id)
															setComment(comment?.text)
														}}
														className='w-4 h-4 cursor-pointer'
													/>

													<Trash2
														onClick={() => onDelete(comment?.id)}
														className='w-4 h-4 cursor-pointer'
													/>
												</div>
											)}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</Card>
			</section>
		</>
	)
}

export default ProductDetails
