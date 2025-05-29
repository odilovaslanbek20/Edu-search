import Header from '@/components/Header/Header'
import Profile from '@/components/Header/Profile'

function ProfilePage() {
	return (
		<>
		 <Header/>
		 <main className="pt-[50px]">
			<Profile/>
		 </main>
		</>
	)
}

export default ProfilePage