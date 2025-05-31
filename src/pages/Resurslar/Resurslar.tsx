import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Resurs from '@/components/Resusrlar/Resurs'
import ResursCategory from '@/components/Resusrlar/ResurseCategory'
import SearchResurse from '@/components/Resusrlar/SearchResurse'

function ResurslarPage() {
	return (
		<>
			<Header />
			<main className=' pt-[50px]'>
				<Hero />
				<SearchResurse/>
				<ResursCategory/>
				<Resurs />
			</main>
		</>
	)
}

export default ResurslarPage
