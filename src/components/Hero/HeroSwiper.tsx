import { Autoplay, EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './swiper/css/css.css'
import './swiper/css/effect-cards.css'
import useGetHooks from '../Hooks/useGetHooks'
import { Skeleton } from '@/components/ui/skeleton'

type Center = {
	data: {
		id: number
		name: string
		image: string
	}[]
}

export default function HeroSwiper() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks<Center>(`${url}/centers`)

	if (isLoading) {
		return (
			<div className='flex gap-6'>
					<div
						className='w-full h-[250px] bg-white rounded-xl shadow-md p-4 flex flex-col justify-between'
					>
						<Skeleton className='h-[240px] w-full rounded-lg' />{' '}
						<div className='space-y-3 mt-4'>
							<Skeleton className='h-4 w-3/4' /> 
							<Skeleton className='h-4 w-1/2' /> 
						</div>
					</div>
			</div>
		)
	}

	if (error) return <p>Error: {error.message}</p>

	const center = data?.data

	return (
		<Swiper
			effect='cards'
			grabCursor={true}
			modules={[EffectCards, Autoplay]}
			className='mySwiper'
			loop={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
		>
			{center?.map(data => (
				<SwiperSlide className='group flex-col' key={data?.id}>
					<img
						className='h-full bg-contain'
						src={`${url}/image/${data?.image}`}
						alt={data?.name}
					/>
					<div className='opacity-0 group-hover:opacity-100 transition-all duration-500 fixed w-full h-full bg-[#000]/50'></div>
					<p className='font-["Playwrite_HU"] absolute opacity-0 group-hover:opacity-100 transition-all duration-500 text-center px-[20px]'>
						{data?.name}
					</p>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
