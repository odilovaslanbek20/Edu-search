import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import useGetHooks from '../Hooks/useGetHooks'
import { useState } from 'react'
import usePostHooks from '../Hooks/usePostHooks'
import { toast } from 'react-toastify'

interface Subject {
	name: string
	id: string
	centerId: string
}

interface Flials {
	centerId: number
	id: number
	name: string
}

export default function CourseModal({
	open,
	onOpenChange,
	id,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	id: number
}) {
	const url = import.meta.env.VITE_API_URL
	const token = localStorage.getItem('accessToken')

	const { data, isLoading, error } = useGetHooks<{ data: Flials[] }>(
		`${url}/filials`
	)
	const {
		data: data1,
		isLoading: loading1,
		error: error1,
	} = useGetHooks<{ data: Subject[] }>(`${url}/subject`)

	const { postData, loading: postLoading, error: postError } = usePostHooks()

	const [selectedFilialId, setSelectedFilialId] = useState<string | null>(null)
	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
		null
	)
	const [selectedDate, setSelectedDate] = useState<string>('')
	const [selectedTime, setSelectedTime] = useState<string | null>(null)

	function getCombinedDateTime(
		date: string,
		time: string | null
	): string | null {
		if (!date || !time) return null
		return `${date}T${time}`
	}

	const registrationData = {
		filialId: selectedFilialId,
		centerId: id,
		visitDate: getCombinedDateTime(selectedDate, selectedTime),
		majorId: selectedSubjectId,
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await postData(`${url}/reseption`, registrationData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			toast.success('Muvaffaqiyatli ro‘yxatdan o‘tdi!')
      setTimeout(() => {
        window.location.reload()
      }, 3500);
		} catch (error) {
			console.error(error)
			toast.error('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
		}
	}

	console.log(loading1 || isLoading)
	console.log(error || error1 || postError)

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle className='text-lg font-bold'>
						Darsga yozilish
					</DialogTitle>
					<p className='text-sm text-muted-foreground'>
						O‘zingizga qulay sana va vaqtni tanlang
					</p>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium mb-1'>
							Filialni tanlang
						</label>
						<Select onValueChange={setSelectedFilialId}>
							<SelectTrigger>
								<SelectValue placeholder='Filialni tanlang' />
							</SelectTrigger>
							<SelectContent>
								{data?.data
									?.filter(subject => subject?.centerId == id)
									.map(subject => (
										<SelectItem key={subject?.id} value={String(subject?.id)}>
											{subject?.name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>
							Yo‘nalishni tanlang
						</label>
						<Select onValueChange={setSelectedSubjectId}>
							<SelectTrigger>
								<SelectValue placeholder='Yo‘nalishni tanlang' />
							</SelectTrigger>
							<SelectContent>
								{data1?.data?.map(filial => (
									<SelectItem key={filial.id} value={String(filial.id)}>
										{filial.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='flex gap-4'>
						<div className='w-1/2'>
							<label className='block text-sm font-medium mb-1'>Sana</label>
							<Input
								type='date'
								value={selectedDate}
								onChange={e => setSelectedDate(e.target.value)}
							/>
						</div>
						<div className='w-1/2'>
							<label className='block text-sm font-medium mb-1'>Vaqt</label>
							<Select onValueChange={setSelectedTime}>
								<SelectTrigger>
									<SelectValue placeholder='Select time' />
								</SelectTrigger>
								<SelectContent>
									{[
										'09:00',
										'10:00',
										'11:00',
										'13:00',
										'14:00',
										'15:00',
										'16:00',
										'17:00',
									].map(time => (
										<SelectItem key={time} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='flex justify-end gap-2 pt-2'>
						<Button
							onClick={() =>
								console.log('Yuboriladigan maʼlumot:', registrationData)
							}
						>
							{postLoading ? 'Yuklanmoqda...' : 'Confirm Registration'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
