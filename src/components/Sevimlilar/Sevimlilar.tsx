import { useState } from 'react'
import { IoHeartDislikeOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import useGetHooks from '../Hooks/useGetHooks'
import { useTranslation } from 'react-i18next'

interface Center {
  id: number;
  name: string;
  image: string;
  address: string;
  phone: string;
  responsible: string;
}

function Sevimlilar() {
  const { t } = useTranslation()
  const url = import.meta.env.VITE_API_URL
  const [transform, setTransform] = useState<{ [key: number]: string }>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((centerX - x) / centerX) * 10
    setTransform(prev => ({ ...prev, [id]: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }))
  }

  const handleMouseLeave = (id: number) => {
    setTransform(prev => ({ ...prev, [id]: 'perspective(600px) rotateX(0deg) rotateY(0deg)' }))
  }

  const {data: centers, isLoading, error} = useGetHooks<Center[]>(`${url}/centers/like`)

  console.log('center', centers);
  

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Xatolik yuz berdi. Ma'lumotlar yuklanmadi.</p>
  }

  return (
    <div className='w-[90%] m-auto my-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {centers?.map((center) => (
        <Card
          key={center?.id}
          className='relative border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg cursor-pointer'
          onMouseMove={(e) => handleMouseMove(e, center.id)}
          onMouseLeave={() => handleMouseLeave(center.id)}
          style={{
            transform: transform[center.id],
            transition: 'transform 0.2s ease',
          }}
        >
          <Button
            variant='ghost'
            size='icon'
            className='absolute top-3 right-3 bg-[#461773] hover:bg-[#5f2099] text-white hover:text-pink-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 cursor-pointer'
          >
            <IoHeartDislikeOutline className='text-xl' />
          </Button>

          <img
            src={`${url}/image/${center?.image}`}
            alt={center?.name}
            className='w-full h-[200px] object-cover mt-[-25px]'
          />

          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-[#461773] line-clamp-1'>
              {center?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-1 text-sm mt-[-15px] text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <span className='text-[#461773] font-semibold'>📍 Hudud:</span>
              <span>{center?.address}</span>
            </div>

            <a href={`tel:${center?.phone}`} className='flex items-center gap-2'>
              <span className='text-[#461773] font-semibold'>📞 Telefon:</span>
              <span>{center?.phone}</span>
            </a>

            <div className='flex items-center gap-2'>
              <span className='text-[#461773] font-semibold'>👤 Mas'ul:</span>
              <span>{center?.responsible || 'Nomaʼlum'}</span>
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
  )
}

export default Sevimlilar