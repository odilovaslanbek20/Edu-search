import AddFinials from '@/components/Ceo/AddFilials'
import CeoCreateEdu from '@/components/Ceo/CeoCreateEdu'
import Header from '@/components/Header/Header'


function CeoCreate() {
	return (
		<>
			<Header />
			<main className='flex items-center justify-center max-[768px]:flex-col'>
				<CeoCreateEdu />
			  <AddFinials/>
			</main>
		</>
	)
}

export default CeoCreate
