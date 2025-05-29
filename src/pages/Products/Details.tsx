import Header from '@/components/Header/Header'
import ProductsDetails from '@/components/Products/ProctsDetails'

function ProductsDetailsPage() {
	return (
		<>
		 <Header/>
		 <main className='pt-[30px]'>
			<ProductsDetails/>
		 </main>
		</>
	)
}

export default ProductsDetailsPage