import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '../ui/skeleton'

interface User {
	firstName: string
	lastName: string
	email: string
	image?: string
}

export default function Admen() {
	const url = import.meta.env.VITE_API_URL
	const { t } = useTranslation()
	const token = localStorage.getItem('accessToken')
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading, error } = useGetHooks<{ data: User }>(
		`${url}/users/mydata`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		}
	)

	const user = data?.data as User

	if (isLoading) {
		return (
			<>
				<Skeleton className='h-[40px] w-[180px] rounded-[50px] max-[768px]:w-[40px]' />
			</>
		)
	}
	console.log(error)

	return (
		<div className='flex justify-end w-full'>
			<DropdownMenu onOpenChange={open => setIsOpen(open)}>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='flex items-center max-[500px]:w-[30px] max-[500px]:h-[30px] gap-[8px] p-0 rounded-[50px] pr-[7px] max-[768px]:p-0'
					>
						<Avatar className='w-10 h-10 max-[500px]:w-[30px] max-[500px]:h-[30px] border border-transparent shadow-none ml-[-1.5px] max-[768px]:m-0'>
							<AvatarImage src={`${url}/image/${user?.image}`} alt='User avatar' />
							<AvatarFallback className='uppercase text-sm tracking-wide bg-[#D9D9D9] text-black'>
								{user?.firstName?.[0]}
								{user?.lastName?.[0]}
							</AvatarFallback>
						</Avatar>
						<div className='hidden md:flex flex-col items-start'>
							<span className='text-sm font-semibold text-[#333] dark:text-[#F4F4F4]'>
								{user?.firstName} {user?.lastName}
							</span>
							<span className='text-xs text-[#666] dark:text-[#AAA] truncate max-w-[160px] line-clamp-1'>
								{user?.email}
							</span>
						</div>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className={`w-64 mt-2 bg-[#EEF0F4] dark:bg-[#171B23] text-[#333] dark:text-[#F4F4F4] rounded-2xl border-none transition-all duration-200 ${
						isOpen ? 'shadow-lg' : 'shadow-none'
					}`}
					align='end'
				>
					<DropdownMenuLabel className='px-5 py-4'>
						<div className='flex flex-col gap-1'>
							<p className='text-base font-bold'>
								{user?.firstName} {user?.lastName}
							</p>
							<p className='text-xs text-[#666] dark:text-[#AAA]'>
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>

					<DropdownMenuSeparator className='bg-[#CCC] dark:bg-[#333]' />

					<DropdownMenuItem
						onClick={() => navigate('/profile')}
						className='gap-2 px-5 py-3 hover:bg-[#E0E3EB] dark:hover:bg-[#2C313D] transition rounded-xl'
					>
						<Pencil className='w-4 h-4' />
						{t('editProfile')}
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => {
							localStorage.clear()
							window.location.reload()
						}}
						className='gap-2 px-5 py-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition rounded-xl'
					>
						<LogOut className='w-4 h-4' />
						{t('logout')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
