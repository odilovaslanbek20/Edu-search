import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Products from '@/components/Products/Products'

function HomePage() {
	return (
		<>
		  <Header />
			<main className='pt-[60px]'>
				<Hero />
				<Products/>
			</main>
		</>
	)
}

export default HomePage
