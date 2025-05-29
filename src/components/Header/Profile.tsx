import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from "@/components/ui/skeleton" 

interface User {
	firstName: string
	lastName: string
	email: string
	phone?: string
	role?: string
	avatar?: string
}

export default function Profile() {
	const navigate = useNavigate()
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')

	const { data, isLoading, error } = useGetHooks<{ data: User }>(`${url}/users/mydata`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
	})

	const user = data?.data

	if (isLoading) {
		return (
			<div className="max-w-2xl mx-auto mt-12 px-6 space-y-8 animate-pulse">
				<div className="flex flex-col items-center space-y-4">
					<Skeleton className="w-28 h-28 rounded-full" />
					<Skeleton className="w-1/2 h-8" />
					<Skeleton className="w-2/3 h-4" />
				</div>
				<div className="rounded-lg border p-8 space-y-4">
					{[...Array(5)].map((_, idx) => (
						<Skeleton key={idx} className="w-full h-6" />
					))}
				</div>
			</div>
		)
	}

	if (error)
		return (
			<div className='text-sm text-destructive text-center mt-10'>
				Foydalanuvchi topilmadi.
			</div>
		)

	if (!user) return null

	return (
		<div className='max-w-2xl mx-auto mt-12 px-6 space-y-8'>
			<div className='flex flex-col items-center space-y-4'>
				<img
					src={user.avatar || '/default-avatar.png'}
					alt={`${user.firstName} ${user.lastName}`}
					className='w-28 h-28 rounded-full object-cover ring-2 ring-primary'
				/>
				<h1 className='text-4xl font-semibold text-[#461773]'>
					Profil Ma'lumotlari
				</h1>
				<p className='text-sm text-muted-foreground max-w-md text-center'>
					Bu yerda sizning hisob ma'lumotlaringiz ko‘rsatilgan
				</p>
			</div>

			<div className='rounded-lg border border-border bg-card p-8 shadow-sm space-y-6'>
				<InfoRow label='Ism' value={user.firstName} />
				<InfoRow label='Familiya' value={user.lastName} />
				<InfoRow label='Email' value={user.email} />
				<InfoRow label='Telefon' value={user.phone || "Noma'lum"} />
				<InfoRow label='Role' value={user.role || 'User'} />
			</div>

			<div className='flex justify-between items-center space-x-4'>
				<Button variant='outline' onClick={() => navigate('/')}>
					← Orqaga
				</Button>
				<Button
					className='bg-[#461773]'
					onClick={() => navigate('/profile/edit')}
				>
					Profilni tahrirlash
				</Button>
				<Button
					variant='destructive'
					onClick={() => console.log("Accountni o'chirish")}
				>
					Accountni o'chirish
				</Button>
			</div>
		</div>
	)
}

function InfoRow({ label, value }: { label: string; value?: string }) {
	return (
		<div className='flex justify-between border-b border-border py-3 last:border-none'>
			<span className='text-sm font-medium text-muted-foreground'>{label}</span>
			<span className='text-sm font-semibold text-foreground'>{value}</span>
		</div>
	)
}
