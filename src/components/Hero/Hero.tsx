import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroSwiper from "./HeroSwiper"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Hero() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	return (
		<section className="w-full relative py-24 max-[500px]:py-12 overflow-x-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="w-[90%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
				<div className="space-y-5 text-center lg:text-left max-[500px]:space-y-4">
					<h1 className="text-4xl md:text-5xl max-[500px]:text-2xl font-extrabold leading-[120%] tracking-tight text-[#4A1D96] dark:text-white">
						{t("hero.title")}
					</h1>
					<p className="text-base md:text-lg max-[500px]:text-sm text-gray-600 dark:text-gray-300 max-[500px]:px-1">
						{t("hero.subtitle")}
					</p>
					<div className="flex justify-center lg:justify-start">
						<Button
							asChild
							size="lg"
							className="rounded-xl px-8 text-sm max-[500px]:text-xs bg-[#4A1D96] hover:bg-[#3b137c] text-white dark:bg-purple-700 dark:hover:bg-purple-600 transition duration-300"
						>
							<div className='cursor-pointer' onClick={() => navigate('/elon')}>{t("hero.button")}</div>
						</Button>
					</div>
				</div>

				<Card className="border-none shadow-none bg-transparent max-[500px]:mt-[-10px]">
					<CardContent className="p-0">
						<HeroSwiper />
					</CardContent>
				</Card>
			</div>
		</section>
	)
}

export default Hero
