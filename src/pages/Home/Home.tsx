import RefreshToken from '@/components/Auth/RefreshToken'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Products from '@/components/Products/Products'

function HomePage() {
	return (
		<>
		  <RefreshToken/>
		  <Header />
			<main className='pt-[60px]'>
				<Hero />
				<Products/>
			</main>
		</>
	)
}

export default HomePage
