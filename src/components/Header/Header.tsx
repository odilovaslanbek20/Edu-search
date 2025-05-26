import { Link } from 'react-router-dom'

function Header() {
	return (
		<>
			<header className='w-full py-[20px] bg-[#fff] fixed top-0 left-0 border-b '>
				<div className='w-[90%] m-auto'>
					<Link to='/'>
						<img
							className='w-[180px]'
							src='/logo-iS1ZmJmJ.png'
							alt='web desktop logo'
						/>
					</Link>
				</div>
			</header>
		</>
	)
}

export default Header
