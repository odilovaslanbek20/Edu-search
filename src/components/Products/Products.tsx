import useGetHooks from '../Hooks/useGetHooks'
import { AiOutlineHeart } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Products() {
	const { t } = useTranslation()
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<Center[]>(`${url}/centers`)

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
		id: number
		name: string
		phone?: string
		region?: Region
		majors?: Major[]
		user?: User
		image?: string
	}

	if (isLoading) {
		const skeletonArray = Array(10).fill(null)

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

	const centerData = data?.data

	return (
		<section className='max-w-7xl mx-auto px-6 py-10 min-h-screen'>
			<h1 className='text-4xl font-bold mb-12 max-[1024px]:mb-[30px] text-center text-[#461773]'>
				{t('heroTitle')}
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{centerData?.map((center: Center) => (
					<Card
						key={center?.id}
						className='relative border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg'
					>
						<Button
							variant='ghost'
							size='icon'
							className='
    absolute top-3 right-3
    bg-[#461773] hover:bg-[#5f2099]
    text-white hover:text-pink-400
		border border-[#fff]
    shadow-md hover:shadow-lg
    rounded-full
    p-2
    transition
    duration-300
    ease-in-out
    focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1
    cursor-pointer
  '
						>
							<AiOutlineHeart className='text-xl' />
						</Button>

						{center?.image && (
							<img
								src={center?.image}
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

							<a
								href={`tel:${center?.phone}`}
								className='flex items-center gap-2'
							>
								<span className='text-[#461773] font-semibold'>
									📞 Telefon:
								</span>
								<span>{center?.phone || "Ko'rsatilmagan"}</span>
							</a>

							<div className='flex items-center gap-2'>
								<span className='text-[#461773] font-semibold'>👤 Mas'ul:</span>
								<span>
									{center?.user
										? `${center?.user?.firstName} ${center?.user?.lastName}`
										: "Noma'lum"}
								</span>
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
				))}
			</div>
		</section>
	)
}

export default Products
