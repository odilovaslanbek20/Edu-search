// CeoCreateEdu.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

function CeoCreateEdu() {
	return (
		<section className="flex justify-center py-10 bg-[#f9f9fc] dark:bg-[#1a1a1a]">
			<Card className="w-full max-w-2xl shadow-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-[#121212]">
				<CardContent>
					<h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">O‘quv markazi yaratish</h2>
					
					<div className="grid gap-5">
						<div className="grid gap-2">
							<Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Markaz nomi</Label>
							<Input id="name" placeholder="Masalan, 'World Education'" />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="location" className="text-gray-700 dark:text-gray-200">Manzil</Label>
							<Input id="location" placeholder="Shahar, ko‘cha va h.k." />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">Telefon raqami</Label>
							<Input id="phone" placeholder="+998..." />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="description" className="text-gray-700 dark:text-gray-200">Izoh</Label>
							<Textarea id="description" placeholder="Markaz haqida qisqacha yozing..." />
						</div>

						<div className="pt-4">
							<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Yaratish</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

export default CeoCreateEdu;
