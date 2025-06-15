import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '@/components/ui/skeleton'
import { useDelete } from '../Hooks/useDeleteHooks'
import { useTranslation } from 'react-i18next'
import EditModal from './EditModal'

interface User {
	id: number
	firstName: string
	lastName: string
	email: string
	phone?: string
	role?: string
	avatar?: string
	image?: string
}

export default function Profile() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')

	const { data, isLoading, error } = useGetHooks<{ data: User }>(
		`${url}/users/mydata`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		}
	)

	const { deleteItem, loading, error: error1 } = useDelete()
	const user = data?.data

	const deleteUser = async () => {
		await deleteItem(`${url}/users/${user?.id}`)
		localStorage.clear()
		navigate('/')
		window.location.reload()
	}

	if (isLoading || loading) {
		return (
			<div className='max-w-3xl mx-auto mt-12 px-4 animate-pulse'>
				<div className='flex items-center gap-4 mb-6'>
					<Skeleton className='w-20 h-20 rounded-full' />
					<div className='flex-1 space-y-2'>
						<Skeleton className='w-2/3 h-6' />
						<Skeleton className='w-1/2 h-4' />
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{[...Array(6)].map((_, idx) => (
						<Skeleton key={idx} className='w-full h-6' />
					))}
				</div>
			</div>
		)
	}

	if (error || error1) {
		return (
			<div className='text-center text-destructive mt-10 text-sm'>
				{t('profile.not_found') || 'Foydalanuvchi topilmadi.'}
			</div>
		)
	}

	if (!user) return null

	return (
		<div className='max-w-3xl mb-[30px] mx-auto mt-12 px-4 space-y-8'>
			<div className='flex items-center gap-6'>
				<img
					src={`https://findcourse.net.uz/api/image/${user?.image}`}
					alt={`${user.firstName} ${user.lastName}`}
					className='w-20 h-20 rounded-full object-cover border-4 border-[#461773] shadow-md'
				/>
				<div>
					<h1 className='text-2xl font-bold text-[#461773]'>
						{user.firstName} {user.lastName}
					</h1>
					<p className='text-muted-foreground text-sm'>{user.email}</p>
				</div>
			</div>

			<div className='bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 shadow-sm'>
				<Info label={t('profile.firstname') || 'Ism'} value={user.firstName} />
				<Info label={t('profile.lastname') || 'Familiya'} value={user.lastName} />
				<Info label={t('profile.email') || 'Email'} value={user.email} />
				<Info label={t('profile.phone') || 'Telefon'} value={user.phone || "Noma'lum"} />
				<Info label={t('profile.role') || 'Role'} value={user.role || 'User'} />
			</div>

			<div className='flex flex-col sm:flex-row justify-end gap-3'>
				<Button className='cursor-pointer' variant='outline' onClick={() => navigate('/')}>
					← {t('profile.back')}
				</Button>
					<EditModal/>
				<Button
					variant='destructive'
					onClick={deleteUser}
					className='hover:opacity-90 cursor-pointer'
				>
					{t('profile.delete')}
				</Button>
			</div>
		</div>
	)
}

function Info({ label, value }: { label: string; value?: string }) {
	return (
		<div className='flex flex-col'>
			<span className='text-sm text-muted-foreground'>{label}</span>
			<span className='text-base font-medium text-foreground'>{value}</span>
		</div>
	)
}
