import { useParams } from 'react-router-dom'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Tiplar
type User = {
	id: string
	firstName: string
	lastName: string
	role: string
	image?: string
}

type Region = {
	id: string
	name: string
}

type Major = {
	id: string
	name: string
}

type Filial = {
	id: string
	name: string
	image?: string
	region?: Region
	phone: string
	address: string
}

type Comment = {
	id: string
	user?: User
	createdAt: string
	star: number
	text: string
}

type Center = {
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

function ProductsDetails() {
	const { id } = useParams<{ id: string }>()
	const url = import.meta.env.VITE_API_URL as string
const { data, isLoading, error } = useGetHooks<{ data: Center }>(`${url}/centers/${id}`)

	if (isLoading) {
		return (
			<div className='max-w-4xl mx-auto p-6'>
				<Skeleton className='h-[300px] w-full mb-6 rounded-xl' />
				<Skeleton className='h-6 w-[60%] mb-2' />
				<Skeleton className='h-4 w-[40%] mb-2' />
				<Skeleton className='h-4 w-[50%] mb-2' />
			</div>
		)
	}

	if (error || !data?.data) {
		return (
			<div className='max-w-3xl mx-auto p-6'>
				<Alert variant='destructive'>
					<AlertDescription>
						Markaz topilmadi yoki xatolik yuz berdi.
					</AlertDescription>
				</Alert>
			</div>
		)
	}

	const center = data.data

	return (
		<section className='max-w-5xl mx-auto p-6 mt-10 space-y-10'>
			<Card className='shadow-md border border-gray-200'>
				{center?.image && (
					<img
						src={center.image}
						alt={center.name}
						className='w-full h-[300px] object-cover rounded-t-md'
					/>
				)}

				<CardHeader>
					<CardTitle className='text-3xl font-bold text-[#461773]'>
						{center.name}
					</CardTitle>
				</CardHeader>

				<CardContent className='space-y-2 text-gray-700'>
					<div>
						<strong className='text-[#461773]'>📍 Hudud:</strong>{' '}
						{center.region?.name || "Noma'lum"}
					</div>
					<div>
						<strong className='text-[#461773]'>📞 Telefon:</strong>{' '}
						{center.phone || "Ko'rsatilmagan"}
					</div>
					<div>
						<strong className='text-[#461773]'>🏠 Manzil:</strong>{' '}
						{center.address || "Yo'q"}
					</div>

					<div>
						<strong className='text-[#461773]'>👤 Mas'ul shaxs:</strong>{' '}
						{center.user
							? `${center.user.firstName} ${center.user.lastName} (${center.user.role})`
							: "Noma'lum"}
					</div>
				</CardContent>
			</Card>

			{center.majors && center.majors.length > 0 && (
				<Card className='border border-gray-200 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-2xl text-[#461773]'>📚 Yo‘nalishlar</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='list-disc list-inside space-y-1 text-gray-800'>
							{center.majors.map((major) => (
								<li key={major.id}>{major.name}</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{center.filials && center.filials.length > 0 && (
				<Card className='border border-gray-200 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-2xl text-[#461773]'>🏢 Filiallar</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{center.filials.map((filial) => (
							<div key={filial.id} className='flex items-center space-x-4'>
								{filial.image && (
									<img
										src={`${url}/uploads/${filial.image}`}
										alt={filial.name}
										className='w-20 h-20 object-cover rounded-md'
									/>
								)}
								<div>
									<h4 className='font-semibold text-lg'>{filial.name}</h4>
									<p className='text-gray-600'>
										📍 {filial.region?.name || "Noma'lum"}
									</p>
									<p className='text-gray-600'>📞 {filial.phone}</p>
									<p className='text-gray-600'>🏠 {filial.address}</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			)}

			{center.comments && center.comments.length > 0 && (
				<Card className='border border-gray-200 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-2xl text-[#461773]'>💬 Foydalanuvchi fikrlari</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						{center.comments.map((comment) => (
							<div key={comment.id} className='border p-4 rounded-md shadow-sm'>
								<div className='flex items-center space-x-3 mb-2'>
									{comment.user?.image && (
										<img
											src={`${url}/uploads/${comment.user.image}`}
											alt={`${comment.user.firstName} ${comment.user.lastName}`}
											className='w-12 h-12 rounded-full object-cover'
										/>
									)}
									<div>
										<p className='font-semibold'>
											{comment.user
												? `${comment.user.firstName} ${comment.user.lastName}`
												: 'Anonim'}
										</p>
										<p className='text-sm text-gray-500'>
											{new Date(comment.createdAt).toLocaleDateString()}
										</p>
									</div>
									<div className='ml-auto text-yellow-500 font-bold'>
										{'⭐'.repeat(comment.star)}
										{comment.star < 5 ? '☆'.repeat(5 - comment.star) : ''}
									</div>
								</div>
								<p className='text-gray-700'>{comment.text}</p>
							</div>
						))}
					</CardContent>
				</Card>
			)}
		</section>
	)
}

export default ProductsDetails
