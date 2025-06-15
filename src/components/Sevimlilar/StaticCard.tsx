import { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

interface Props {
  id: number
  name: string
  image: string
  location: string
  phone: string
}

const StaticCard = ({ id, name, image, location, phone }: Props) => {
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((centerX - x) / centerX) * 10

    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg)')
  }

	console.log(id, name, image);
	

  return (
    <Card
      className='relative border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg cursor-pointer'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.2s ease',
      }}
    >
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-3 right-3 bg-[#461773] hover:bg-[#5f2099] text-white hover:text-pink-400 border border-[#fff] shadow-md hover:shadow-lg rounded-full p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 cursor-pointer'
      >
        <AiOutlineHeart className='text-xl' />
      </Button>

      <img
        src={image}
        alt={name}
        className='w-full h-[200px] object-cover mt-[-25px]'
      />

      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-[#461773] line-clamp-1'>
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-1 text-sm mt-[-15px] text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <span className='text-[#461773] font-semibold'>📍 Hudud:</span>
          <span>{location}</span>
        </div>

        <a href={`tel:${phone}`} className='flex items-center gap-2'>
          <span className='text-[#461773] font-semibold'>📞 Telefon:</span>
          <span>{phone}</span>
        </a>

        <div className='flex items-center gap-2'>
          <span className='text-[#461773] font-semibold'>👤 Mas'ul:</span>
          <span>{name}</span>
        </div>

        <div className='mt-4'>
          <Link
            to={`/center/${id}`}
            className='inline-block text-white bg-[#461773] hover:bg-[#5f2099] px-4 py-2 rounded-md text-sm font-medium transition'
          >
            Batafsil
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default StaticCard
