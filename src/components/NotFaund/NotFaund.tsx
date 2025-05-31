import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pt-[100px] flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-6xl font-bold text-[#461773]">404</h1>
          <p className="text-2xl text-gray-800 mt-4">Sahifa topilmadi</p>
          <p className="text-gray-500 mt-2 mb-6">
            Kechirasiz, siz izlagan sahifa mavjud emas yoki o‘chirilgan.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#461773] text-white px-6 py-3 rounded-xl hover:bg-[#461773]/90 transition"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>

        <div className="flex justify-center">
          <img
            src="/NotFaund.jpg" 
            alt="Not Found"
            className="max-w-full w-[300px] md:w-[400px]"
          />
        </div>
      </div>
    </div>
  )
}
