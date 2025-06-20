import useGetHooks from '../Hooks/useGetHooks'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useTranslation } from 'react-i18next'

interface MyCenter {
	id: number
	name: string
	phone: string
	address: string
	image: string
	createdAt: string
}

function MyCenter() {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')
	const { t } = useTranslation()

	const { data, isLoading } = useGetHooks<{ data: MyCenter[] }>(
		`${url}/users/mycenters`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	)

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
				<Skeleton className='h-48 w-full rounded-xl' />
				<Skeleton className='h-48 w-full rounded-xl' />
				<Skeleton className='h-48 w-full rounded-xl' />
			</div>
		)
	}

	// Agar markazlar yo'q bo‘lsa
	if (!data?.data || data.data.length === 0) {
		return (
			<div className='p-4'>
				<Alert>
					<AlertTitle>{t('Eslatma')}</AlertTitle>
					<AlertDescription>
						{t('Siz hali hech qanday markaz yaratmagansiz.')}
					</AlertDescription>
				</Alert>
			</div>
		)
	}

	// Agar markazlar mavjud bo‘lsa
	return (
		<section className='w-[90%] m-auto'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-10'>
				{data.data.map(center => (
					<Card
						key={center?.id}
						className='shadow-lg hover:shadow-xl transition duration-300'
					>
						<img
							src={`${url}/image/${center?.image}`}
							alt={center?.name}
							className='w-full h-48 object-cover rounded-t-xl'
						/>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								{center?.name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>{t('Telefon')}:</strong> {center?.phone}
							</p>
							<p>
								<strong>{t('Manzil')}:</strong> {center?.address}
							</p>
							<p>
								<strong>{t("Ro'yxatdan o'tgan sana")}:</strong>{' '}
								{new Date(center?.createdAt).toLocaleDateString()}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}

export default MyCenter
