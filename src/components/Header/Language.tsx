import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageModal = () => {
	const { i18n } = useTranslation()
	const [open, setOpen] = useState(false)

	const languages = [
		{ code: 'uz', label: 'UZ', flag: 'uz.svg' },
		{ code: 'ru', label: 'RU', flag: 'ru.svg' },
		{ code: 'en', label: 'EN', flag: 'gb.svg' },
	]
	
	const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0]

	const handleLanguageSelect = (code: string) => {
		i18n.changeLanguage(code)
		localStorage.setItem('i18nextLng', code)
		setOpen(false)
	}

	return (
		<div className='relative inline-block text-left'>
			<div
				className='flex items-center gap-2 cursor-pointer select-none'
				onClick={() => setOpen(!open)}
			>
				<img
					className='w-[30px] max-[500px]:w-[20px] rounded-full'
					src={currentLang.flag}
					alt='language'
				/>
				<p className='font-medium text-sm text-[#333]'>{currentLang.label}</p>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -5 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -5 }}
						transition={{ duration: 0.2 }}
						className='absolute right-0 z-20 mt-2 w-[100px] rounded-xl bg-white shadow-xl ring-1 ring-black/10'
					>
						<div className='py-1'>
							{languages.map(lang => (
								<button
									key={lang.code}
									onClick={() => handleLanguageSelect(lang.code)}
									className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-100 rounded-[9px] transition ${
										i18n.language === lang.code
											? 'bg-gray-100 font-semibold'
											: ''
									}`}
								>
									<img
										src={lang.flag}
										alt={lang.label}
										className='w-5 rounded-full'
									/>
									{lang.label}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default LanguageModal
